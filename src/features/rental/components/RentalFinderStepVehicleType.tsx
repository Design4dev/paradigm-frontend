"use client";

import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { RENTAL_FLEET_VEHICLES } from "@/features/rental/config/booking.config";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Step 1 — Vehicle Type. Visual selectable cards, not a dropdown: one tap,
 * no typing. Options are the real, verified rental fleet catalog
 * (`RENTAL_FLEET_VEHICLES`) — same categories and, now, the same real
 * photography as "Our Rental Fleet"/the native booking flow's own Vehicle
 * step, replacing the generic vehicle glyph this step used before real
 * fleet photos were available.
 */
export function RentalFinderStepVehicleType({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (type: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m text-primary-black">What type of vehicle do you need?</h2>
        <p className="text-body-m mt-1 text-dark-neutral/70">Choose the category that best fits your needs.</p>
      </div>

      <div role="radiogroup" aria-label="Rental vehicle type" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {RENTAL_FLEET_VEHICLES.map((option) => {
          const selected = value === option.name;
          return (
            <button
              key={option.slug}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.name)}
              className={cn(
                "focus-ring relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border text-center transition-colors duration-[var(--duration-micro)]",
                selected ? "border-primary-red bg-primary-red/5" : "border-border bg-surface hover:border-primary-black/30"
              )}
            >
              <div className="relative aspect-[4/3] w-full bg-soft-gray">
                <Image src={option.image.url} alt={option.image.alt} fill sizes="(min-width: 1024px) 180px, 45vw" className="object-cover" />
                {selected && (
                  <span
                    aria-hidden="true"
                    className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-red text-primary-white shadow-sm"
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                )}
              </div>
              <span className={cn("text-label-m px-2 py-2.5", selected ? "text-primary-black" : "text-dark-neutral/80")}>{option.name}</span>
            </button>
          );
        })}
      </div>

      <Button type="button" variant="primary" size="lg" className="w-fit" disabled={!value} onClick={onNext}>
        Next Step →
      </Button>
    </div>
  );
}
