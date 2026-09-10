"use client";

import { Button } from "@/components/ui/Button";
import { RENTAL_USE_CASE_OPTIONS } from "@/features/rental/config/rental.config";
import type { RentalUseCase } from "@/features/rental/types/rental.types";
import { cn } from "@/lib/utils";

/**
 * First guided question, kept low-friction (one tap, no required text entry)
 * per the "reduce cognitive load" Find Your Fleet principle (design.md §7).
 * The answer only steers copy/urgency framing downstream — never a hidden score.
 */
export function RentalFinderStepUseCase({
  useCase,
  onChange,
  onBack,
  onNext,
}: {
  useCase: RentalUseCase | null;
  onChange: (value: RentalUseCase) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m text-primary-black">What do you need a rental for?</h2>
        <p className="text-body-m mt-1 text-dark-neutral/70">This helps us point you at the right fleet options.</p>
      </div>

      <div role="radiogroup" aria-label="Rental use case" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {RENTAL_USE_CASE_OPTIONS.map((option) => {
          const selected = useCase === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option)}
              className={cn(
                "focus-ring text-label-m rounded-[var(--radius-control)] border px-4 py-3.5 text-left transition-colors duration-[var(--duration-micro)]",
                selected
                  ? "border-primary-red bg-primary-red/5 text-primary-black"
                  : "border-border bg-surface text-dark-neutral/80 hover:border-primary-black/30"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button type="button" variant="primary" size="lg" disabled={!useCase} onClick={onNext}>
          Next Step →
        </Button>
      </div>
    </div>
  );
}
