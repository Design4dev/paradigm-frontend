"use client";

import { Dialog } from "@/components/ui/Modal";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/ui/Icons";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/features/vehicles/types/vehicle.types";
import Image from "next/image";

interface GalleryLightboxProps {
  images: VehicleImage[];
  vehicleName: string;
  index: number;
  onIndexChange: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  titleId: string;
}

/**
 * Full-screen gallery viewer shared by the hero gallery's "expand" control
 * and the secondary Gallery section's "View Full Gallery" action
 * (page-03-vdp.md §9 / §15) — one implementation instead of two.
 */
export function GalleryLightbox({
  images,
  vehicleName,
  index,
  onIndexChange,
  isOpen,
  onClose,
  returnFocusRef,
  titleId,
}: GalleryLightboxProps) {
  const goTo = (next: number) => onIndexChange(((next % images.length) + images.length) % images.length);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const active = images[index];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      labelledBy={titleId}
      variant="fullscreen"
      returnFocusRef={returnFocusRef}
      panelClassName="bg-primary-black"
    >
      <div className="flex h-full flex-col" onKeyDown={handleKeyDown}>
        <div className="flex items-center justify-between gap-4 p-4">
          <h2 id={titleId} className="text-label-m truncate text-primary-white/80">
            {vehicleName} — Photo {index + 1} of {images.length}
          </h2>
          <IconButton aria-label="Close gallery" variant="inverted" onClick={onClose}>
            <CloseIcon className="h-6 w-6" />
          </IconButton>
        </div>

        <div className="relative min-h-0 flex-1">
          {active && (
            <Image
              key={active.url}
              src={active.url}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous image"
                className="focus-ring absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-primary-white/10 p-3 text-primary-white transition-colors hover:bg-primary-white/20"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next image"
                className="focus-ring absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-primary-white/10 p-3 text-primary-white transition-colors hover:bg-primary-white/20"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div role="tablist" aria-label="Select gallery image" className="flex gap-2 overflow-x-auto p-4">
            {images.map((image, i) => (
              <button
                key={image.url + i}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "focus-ring relative h-14 w-20 shrink-0 overflow-hidden rounded-[var(--radius-control)] border-2 transition-colors",
                  i === index ? "border-primary-red" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={image.url} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}
