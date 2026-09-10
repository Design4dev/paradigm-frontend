"use client";

import { InfoIcon } from "@/components/ui/Icons";
import { BookingStepFooter } from "@/features/rental/components/booking/BookingStepFooter";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { getCoverageOptions } from "@/features/rental/services/rentalAvailability.service";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import { cn } from "@/lib/utils";

/** Step 02 — Coverage (spec §21). Same honest empty/integration-pending state as Add-ons — no verified coverage/pricing to show. */
export function StepCoverage({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const selectedCoverageId = useRentalBookingStore((s) => s.selectedCoverageId);
  const setCoverage = useRentalBookingStore((s) => s.setCoverage);
  const track = useTrackEvent();
  const options = getCoverageOptions();

  const handleSelect = (id: string) => {
    setCoverage(id);
    track({ name: "rental_coverage_selected", coverageId: id });
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m text-primary-black">Select Coverage</h2>
        <p className="text-body-m mt-1 text-dark-neutral/70">Optional protection for your rental.</p>
      </div>

      {options.length === 0 ? (
        <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-border bg-soft-gray p-4">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-dark-neutral/50" />
          <p className="text-body-m text-dark-neutral/70">
            Coverage options aren&apos;t available to select online yet — our rental team will walk you through coverage when they confirm your booking.
          </p>
        </div>
      ) : (
        <div role="radiogroup" aria-label="Coverage option" className="flex flex-col gap-2.5">
          {options.map((option) => {
            const selected = selectedCoverageId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleSelect(option.id)}
                className={cn(
                  "focus-ring text-label-m rounded-[var(--radius-control)] border px-4 py-3 text-left transition-colors duration-[var(--duration-micro)]",
                  selected ? "border-primary-red bg-primary-red/5 text-primary-black" : "border-border bg-surface text-dark-neutral/80 hover:border-primary-black/30"
                )}
              >
                {option.name}
                {option.description && <span className="text-caption-s mt-0.5 block text-dark-neutral/60">{option.description}</span>}
              </button>
            );
          })}
        </div>
      )}

      <BookingStepFooter onBack={onBack} onNext={onNext} />
    </div>
  );
}
