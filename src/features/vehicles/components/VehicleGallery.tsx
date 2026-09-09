"use client";

import { ChevronLeftIcon, ChevronRightIcon, ImageOffIcon, PauseIcon, PlayIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "@/features/vehicles/components/GalleryLightbox";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { VehicleImage } from "@/features/vehicles/types/vehicle.types";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type ImageStatus = "loading" | "loaded" | "failed";

const AUTOPLAY_MS = 5000;

/**
 * Primary VDP gallery (page-03-vdp.md §9). Desktop uses a vertical
 * thumbnail rail beside the main image (matching the reference); tablet and
 * mobile use a horizontal strip below it. The image counter is always the
 * real image count (never padded to look bigger — §31), and the 360°
 * control only renders when `has360Tour` is actually true for this vehicle.
 *
 * Auto-plays through the images (item #9) — pauses on hover/focus, on any
 * manual navigation (arrows/thumbnails/swipe/keyboard), while the lightbox
 * is open, once scrolled out of view, and entirely under
 * `prefers-reduced-motion`, so it never fights a visitor who's actually
 * looking at a specific photo.
 */
export function VehicleGallery({
  images,
  vehicleName,
  has360Tour = false,
}: {
  images: VehicleImage[];
  vehicleName: string;
  has360Tour?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const [statuses, setStatuses] = useState<ImageStatus[]>(() => images.map(() => "loading"));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [hovering, setHovering] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxTitleId = useId();
  const reducedMotion = useReducedMotion();
  const inView = useInView(containerRef);

  const setStatus = (index: number, status: ImageStatus) => {
    setStatuses((prev) => {
      const next = [...prev];
      next[index] = status;
      return next;
    });
  };

  const goTo = (index: number) => setSelected(((index % images.length) + images.length) % images.length);
  const goNext = () => goTo(selected + 1);
  const goPrev = () => goTo(selected - 1);

  /** Any deliberate visitor action pauses autoplay for good — it shouldn't fight someone who's actually browsing. */
  const interact = (action: () => void) => () => {
    setAutoplayEnabled(false);
    action();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      interact(goNext)();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      interact(goPrev)();
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      setAutoplayEnabled(false);
      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
  };

  const autoplayActive = autoplayEnabled && !reducedMotion && !hovering && !lightboxOpen && inView && images.length > 1;

  useEffect(() => {
    if (!autoplayActive) return;
    const interval = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayActive, selected]);

  const activeStatus = statuses[selected];

  const thumbnails = (orientation: "vertical" | "horizontal") => (
    <div
      role="tablist"
      aria-label="Select gallery image"
      className={
        orientation === "vertical"
          ? "flex max-h-[520px] flex-col gap-3 overflow-y-auto pr-0.5"
          : "flex gap-3 overflow-x-auto pb-1"
      }
    >
      {images.map((image, index) => (
        <button
          key={image.url + index}
          type="button"
          role="tab"
          aria-selected={index === selected}
          onClick={interact(() => goTo(index))}
          className={cn(
            "focus-ring relative shrink-0 overflow-hidden rounded-[var(--radius-control)] border-2 bg-soft-gray transition-colors",
            orientation === "vertical" ? "h-[76px] w-full" : "h-16 w-20",
            index === selected ? "border-primary-red" : "border-transparent hover:border-border"
          )}
        >
          <Image src={image.url} alt="" fill sizes="80px" className="object-contain p-1.5" />
        </button>
      ))}
    </div>
  );

  return (
    <div ref={containerRef}>
      <div className={cn(images.length > 1 && "lg:grid lg:grid-cols-[88px_1fr] lg:items-center lg:gap-3")}>
        {images.length > 1 && <div className="hidden lg:block">{thumbnails("vertical")}</div>}

        <div
          role="group"
          aria-label={`${vehicleName} gallery, image ${selected + 1} of ${images.length}`}
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
          className="focus-ring relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-soft-gray sm:aspect-[3/2] lg:aspect-[4/3]"
        >
          {activeStatus !== "failed" ? (
            <>
              {images.map((image, index) => (
                <Image
                  key={image.url + index}
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className={cn(
                    "object-contain p-4 transition-opacity duration-300 ease-[var(--ease-in-out-standard)] sm:p-6",
                    index === selected ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                  )}
                  onLoad={() => setStatus(index, "loaded")}
                  onError={() => setStatus(index, "failed")}
                />
              ))}
              {activeStatus === "loading" && <div className="absolute inset-0 animate-pulse bg-soft-gray" aria-hidden="true" />}

              <button
                ref={expandButtonRef}
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="View fullscreen gallery"
                className="focus-ring absolute inset-0 z-[1] cursor-zoom-in bg-transparent"
              />

              <span className="text-caption-s pointer-events-none absolute bottom-3 left-3 z-[2] rounded-full bg-primary-black/70 px-2.5 py-1 text-primary-white">
                {selected + 1} / {images.length}
              </span>
              {images.length > 1 && !reducedMotion && (
                <button
                  type="button"
                  onClick={() => setAutoplayEnabled((value) => !value)}
                  aria-label={autoplayActive ? "Pause automatic slideshow" : "Play automatic slideshow"}
                  aria-pressed={autoplayActive}
                  className="focus-ring absolute bottom-3 left-1/2 z-[2] flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-primary-black/70 text-primary-white transition-colors hover:bg-primary-black/85"
                >
                  {autoplayActive ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3.5 w-3.5" />}
                </button>
              )}
              {has360Tour && (
                <span className="text-caption-s pointer-events-none absolute bottom-3 right-3 z-[2] rounded-full bg-primary-white/90 px-2.5 py-1 font-semibold text-primary-black">
                  360°
                </span>
              )}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-dark-neutral/40">
              <ImageOffIcon className="h-10 w-10 opacity-40" />
              <span className="text-caption-s">Image unavailable</span>
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={interact(goPrev)}
                aria-label="Previous image"
                className="focus-ring absolute left-3 top-1/2 z-[2] hidden -translate-y-1/2 items-center justify-center rounded-full bg-primary-white/90 p-2 text-primary-black shadow transition-transform hover:scale-105 sm:flex"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={interact(goNext)}
                aria-label="Next image"
                className="focus-ring absolute right-3 top-1/2 z-[2] hidden -translate-y-1/2 items-center justify-center rounded-full bg-primary-white/90 p-2 text-primary-black shadow transition-transform hover:scale-105 sm:flex"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5 sm:hidden" aria-hidden="true">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full bg-primary-white transition-all",
                      index === selected ? "w-5 opacity-100" : "w-1.5 opacity-50"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {images.length > 1 && <div className="mt-3 lg:hidden">{thumbnails("horizontal")}</div>}

      <GalleryLightbox
        images={images}
        vehicleName={vehicleName}
        index={selected}
        onIndexChange={goTo}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        returnFocusRef={expandButtonRef}
        titleId={lightboxTitleId}
      />
    </div>
  );
}
