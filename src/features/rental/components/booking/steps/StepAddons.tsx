"use client";

import { InfoIcon } from "@/components/ui/Icons";
import { BookingStepFooter } from "@/features/rental/components/booking/BookingStepFooter";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { getAddons } from "@/features/rental/services/rentalAvailability.service";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import { cn } from "@/lib/utils";

/**
 * Step 01 — Add-ons (spec §20). `getAddons()` returns an empty catalog —
 * no real add-ons/pricing were ever verified from the client's booking
 * engine (its own "Extras" stage content was never reached this project).
 * Rather than invent products (explicitly forbidden), this shows an honest
 * "not available online yet" notice and lets the visitor continue.
 */
export function StepAddons({ onNext }: { onNext: () => void }) {
  const selectedAddonIds = useRentalBookingStore((s) => s.selectedAddonIds);
  const toggleAddon = useRentalBookingStore((s) => s.toggleAddon);
  const track = useTrackEvent();
  const addons = getAddons();

  const handleToggle = (id: string) => {
    toggleAddon(id);
    track({ name: "rental_addon_selected", addonId: id });
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m text-primary-black">Select Add-ons</h2>
        <p className="text-body-m mt-1 text-dark-neutral/70">Optional extras for your rental.</p>
      </div>

      {addons.length === 0 ? (
        <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-border bg-soft-gray p-4">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-dark-neutral/50" />
          <p className="text-body-m text-dark-neutral/70">
            Add-ons aren&apos;t available to select online yet — our rental team will go over any add-ons you need when they confirm your booking.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {addons.map((addon) => {
            const selected = selectedAddonIds.includes(addon.id);
            return (
              <li key={addon.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  onClick={() => handleToggle(addon.id)}
                  className={cn(
                    "focus-ring text-label-m flex w-full items-center justify-between rounded-[var(--radius-control)] border px-4 py-3 text-left transition-colors duration-[var(--duration-micro)]",
                    selected ? "border-primary-red bg-primary-red/5 text-primary-black" : "border-border bg-surface text-dark-neutral/80 hover:border-primary-black/30"
                  )}
                >
                  <span>
                    {addon.name}
                    {addon.description && <span className="text-caption-s mt-0.5 block text-dark-neutral/60">{addon.description}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <BookingStepFooter onNext={onNext} />
    </div>
  );
}
