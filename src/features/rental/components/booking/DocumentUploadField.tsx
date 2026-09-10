"use client";

import { CloseIcon, ErrorIcon, UploadIcon } from "@/components/ui/Icons";
import { DOCUMENT_UPLOAD_ACCEPT, DOCUMENT_UPLOAD_MAX_BYTES } from "@/features/rental/services/rentalDocument.service";
import type { RentalDocumentSlot } from "@/features/rental/types/booking.types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useId, useRef, useState } from "react";

/**
 * Reusable click-to-upload / drag-drop field for the Information step's
 * document sections (spec §22E/§22F). No real upload backend is connected
 * (see `rentalDocument.service.ts`) — the selected file and its preview
 * stay entirely local; "Documents are collected for your rental team's
 * review, not yet auto-verified online" is the one honest claim made about
 * it, never a fake "uploaded"/"verified" state.
 */
export function DocumentUploadField({
  label,
  value,
  onChange,
  error,
  required = false,
}: {
  label: string;
  value: RentalDocumentSlot;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = (file: File | null) => {
    setLocalError(null);
    if (!file) {
      onChange(null);
      return;
    }
    if (file.size > DOCUMENT_UPLOAD_MAX_BYTES) {
      setLocalError("File is too large (max 10MB).");
      return;
    }
    onChange(file);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-label-m text-primary-black">
        {label}
        {required && <span className="text-primary-red"> *</span>}
      </label>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          handleFile(event.dataTransfer.files?.[0] ?? null);
        }}
        className={cn(
          "flex items-center gap-3 rounded-[var(--radius-control)] border border-dashed p-3 transition-colors duration-[var(--duration-micro)]",
          dragActive ? "border-primary-red bg-primary-red/5" : (error || localError) ? "border-primary-red" : "border-border bg-surface"
        )}
      >
        {value.previewUrl ? (
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[6px] bg-soft-gray">
            <Image src={value.previewUrl} alt={`${label} preview`} fill sizes="80px" className="object-cover" />
          </div>
        ) : value.fileName ? (
          <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-[6px] bg-soft-gray text-dark-neutral/50">
            <UploadIcon className="h-6 w-6" />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          {value.fileName ? (
            <p className="text-body-m truncate text-primary-black">{value.fileName}</p>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="focus-ring text-body-m text-left text-dark-neutral/60"
            >
              Click to upload or drag and drop
            </button>
          )}
          <p className="text-caption-s text-dark-neutral/50">Images or PDF, up to 10MB</p>
        </div>

        {value.fileName ? (
          <button
            type="button"
            onClick={() => handleFile(null)}
            aria-label={`Remove ${label}`}
            className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-dark-neutral/50 hover:bg-soft-gray hover:text-primary-black"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn("focus-ring shrink-0 rounded-[var(--radius-control)] border border-primary-black px-3 py-1.5 text-label-m text-primary-black hover:bg-primary-black hover:text-primary-white")}
          >
            Upload
          </button>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={DOCUMENT_UPLOAD_ACCEPT}
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        />
      </div>

      {(error || localError) && (
        <p className="flex items-center gap-1.5 text-caption-s text-primary-red">
          <ErrorIcon className="h-3.5 w-3.5 shrink-0" /> {error || localError}
        </p>
      )}
    </div>
  );
}
