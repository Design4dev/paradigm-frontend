"use client";

import { Button } from "@/components/ui/Button";
import { CloseIcon, ErrorIcon, RetryIcon, SpinnerIcon, UploadIcon } from "@/components/ui/Icons";
import { PHOTO_CATEGORIES } from "@/features/tradein/config/tradein.config";
import type { PhotoCategory, TradeInPhoto } from "@/features/tradein/types/tradein.types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useId, useRef } from "react";

function CategoryUploader({
  category,
  label,
  photos,
  onAddFiles,
  onRemove,
  onRetry,
}: {
  category: PhotoCategory;
  label: string;
  photos: TradeInPhoto[];
  onAddFiles: (category: PhotoCategory, files: FileList | null) => void;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-label-m text-primary-black">{label}</p>
      <div className="flex flex-wrap gap-2.5">
        {photos.map((photo) => (
          <div key={photo.id} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius-control)] border border-border bg-soft-gray">
            <Image src={photo.previewUrl} alt="" fill sizes="80px" className={cn("object-cover", photo.status !== "uploaded" && "opacity-50")} />

            {photo.status === "uploading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary-black/30">
                <SpinnerIcon tone="white" className="h-5 w-5" />
              </div>
            )}
            {photo.status === "error" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-primary-black/50">
                <ErrorIcon className="h-4 w-4 text-primary-white" />
                <button type="button" onClick={() => onRetry(photo.id)} aria-label={`Retry uploading ${photo.fileName}`} className="focus-ring rounded text-primary-white">
                  <RetryIcon className="h-4 w-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => onRemove(photo.id)}
              aria-label={`Remove ${photo.fileName}`}
              className="focus-ring absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-black/70 text-primary-white hover:bg-primary-black"
            >
              <CloseIcon className="h-3 w-3" />
            </button>
          </div>
        ))}

        <label
          htmlFor={inputId}
          className="focus-within:ring-primary-red flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-[var(--radius-control)] border-2 border-dashed border-border text-dark-neutral/50 transition-colors hover:border-primary-red hover:text-primary-red focus-within:ring-2"
        >
          <UploadIcon className="h-5 w-5" />
          <span className="text-caption-s">Add</span>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="sr-only"
            onChange={(event) => {
              onAddFiles(category, event.target.files);
              event.target.value = "";
            }}
          />
        </label>
      </div>
    </div>
  );
}

interface TradeInStepPhotosProps {
  photos: TradeInPhoto[];
  onAddFiles: (category: PhotoCategory, files: FileList | null) => void;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Step 3 — Photos (§14): optional, never blocks progression, even mid-upload. */
export function TradeInStepPhotos({ photos, onAddFiles, onRemove, onRetry, onBack, onNext }: TradeInStepPhotosProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m">Add Photos</h2>
        <p className="text-body-m mt-1 text-dark-neutral/60">
          Photos can help our team better understand the condition of your vehicle. This step is optional.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {PHOTO_CATEGORIES.map((category) => (
          <CategoryUploader
            key={category.id}
            category={category.id}
            label={category.label}
            photos={photos.filter((photo) => photo.category === category.id)}
            onAddFiles={onAddFiles}
            onRemove={onRemove}
            onRetry={onRetry}
          />
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onNext}>
          {photos.length > 0 ? "Next Step →" : "Skip This Step →"}
        </Button>
      </div>
    </div>
  );
}
