"use client";

import { isSupportedPhotoFile, simulateUpload } from "@/features/tradein/lib/uploadPhoto";
import type { PhotoCategory, TradeInPhoto } from "@/features/tradein/types/tradein.types";
import { useCallback, useEffect, useRef, useState } from "react";

let nextId = 0;

/**
 * Owns the trade-in photo grid's state and upload lifecycle (§14/§30) —
 * empty → uploading → uploaded/error → remove/retry. Kept as one hook
 * (rather than scattering `fetch`/state through the step component) so
 * TradeInStepPhotos stays a thin render of whatever this returns.
 */
export function useTradeInPhotos() {
  const [photos, setPhotos] = useState<TradeInPhoto[]>([]);
  // Files aren't serializable state — kept alongside by id for retry, never rendered directly.
  const filesRef = useRef(new Map<string, File>());
  // Mirrors `photos` so the unmount cleanup can revoke every outstanding
  // object URL without needing `photos` in its dependency array (which
  // would tear down and recreate the listener on every add/remove). Synced
  // in its own effect, not during render — refs are for effects/handlers.
  const photosRef = useRef<TradeInPhoto[]>([]);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    const files = filesRef.current;
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
      files.clear();
    };
  }, []);

  const runUpload = useCallback((id: string, file: File) => {
    simulateUpload(file).then(({ ok }) => {
      setPhotos((current) => current.map((photo) => (photo.id === id ? { ...photo, status: ok ? "uploaded" : "error" } : photo)));
    });
  }, []);

  const addFiles = useCallback(
    (category: PhotoCategory, fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const accepted = Array.from(fileList).filter(isSupportedPhotoFile);
      if (accepted.length === 0) return;

      const additions: TradeInPhoto[] = accepted.map((file) => {
        const id = `photo-${++nextId}`;
        filesRef.current.set(id, file);
        return { id, category, fileName: file.name, status: "uploading", previewUrl: URL.createObjectURL(file) };
      });

      setPhotos((current) => [...current, ...additions]);
      additions.forEach((photo) => runUpload(photo.id, filesRef.current.get(photo.id)!));
    },
    [runUpload]
  );

  const removePhoto = useCallback((id: string) => {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((photo) => photo.id !== id);
    });
    filesRef.current.delete(id);
  }, []);

  const retryPhoto = useCallback(
    (id: string) => {
      const file = filesRef.current.get(id);
      if (!file) return;
      setPhotos((current) => current.map((photo) => (photo.id === id ? { ...photo, status: "uploading" } : photo)));
      runUpload(id, file);
    },
    [runUpload]
  );

  return { photos, addFiles, removePhoto, retryPhoto };
}
