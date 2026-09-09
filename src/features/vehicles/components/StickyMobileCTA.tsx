"use client";

import { Button } from "@/components/ui/Button";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import { useEffect, useState } from "react";

/**
 * Mobile sticky conversion bar (page-03-vdp.md §19) — hidden while the
 * primary CTA row (VehicleSummary's `#vdp-primary-cta`) is itself visible,
 * shown once the visitor scrolls past it. Respects reduced motion via a
 * plain opacity/translate transition that's subtle enough to leave as-is
 * either way.
 */
export function StickyMobileCTA({ vehicle }: { vehicle: Vehicle }) {
  const { openQuote } = useQuote();
  const [primaryCtaVisible, setPrimaryCtaVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("vdp-primary-cta");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setPrimaryCtaVisible(entry.isIntersecting), {
      rootMargin: "-56px 0px 0px 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={primaryCtaVisible}
      className={cn(
        "pb-safe fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-border bg-surface/95 px-4 pt-3 backdrop-blur transition-[transform,opacity] duration-[var(--duration-panel)] ease-[var(--ease-out-standard)] lg:hidden",
        primaryCtaVisible ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="flex items-center justify-between gap-3 pb-3">
        <div className="min-w-0">
          <p className="text-label-m truncate text-primary-black">{vehicle.priceLabel}</p>
          <p className="text-caption-s truncate text-dark-neutral/60">
            {vehicle.brand} {vehicle.model}
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          className="shrink-0"
          tabIndex={primaryCtaVisible ? -1 : undefined}
          onClick={(event) =>
            openQuote(
              {
                slug: vehicle.slug,
                name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
                stockNumber: vehicle.stockNumber,
                priceLabel: vehicle.priceLabel,
              },
              event.currentTarget
            )
          }
        >
          {vehicle.cta.label}
        </Button>
      </div>
    </div>
  );
}
