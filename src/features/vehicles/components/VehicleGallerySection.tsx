"use client";

import { GalleryLightbox } from "@/features/vehicles/components/GalleryLightbox";
import type { VehicleImage } from "@/features/vehicles/types/vehicle.types";
import Image from "next/image";
import { useId, useRef, useState } from "react";

/**
 * Secondary "Gallery" section (page-03-vdp.md §15) — a curated preview grid
 * that opens the same full lightbox as the hero gallery's expand control.
 * The hero gallery remains the primary browsing experience; this is a
 * lower-friction re-entry point further down the page.
 */
export function VehicleGallerySection({ images, vehicleName }: { images: VehicleImage[]; vehicleName: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const viewAllRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const open = (startIndex: number) => {
    setIndex(startIndex);
    setLightboxOpen(true);
  };

  return (
    <section aria-labelledby="gallery-heading">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="gallery-heading" className="text-heading-l">
          Gallery
        </h2>
        <button ref={viewAllRef} type="button" onClick={() => open(0)} className="focus-ring text-label-m rounded text-primary-red hover:underline">
          View Full Gallery →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image.url + i}
            type="button"
            onClick={() => open(i)}
            aria-label={`Open photo ${i + 1} of ${images.length} in the gallery`}
            className="focus-ring relative aspect-[4/3] overflow-hidden rounded-[var(--radius-control)] bg-soft-gray transition-opacity hover:opacity-90"
          >
            <Image src={image.url} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 45vw" className="object-contain p-2" />
          </button>
        ))}
      </div>

      <GalleryLightbox
        images={images}
        vehicleName={vehicleName}
        index={index}
        onIndexChange={setIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        returnFocusRef={viewAllRef}
        titleId={titleId}
      />
    </section>
  );
}
