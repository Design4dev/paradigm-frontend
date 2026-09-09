"use client";

import { PAYMENT_FREQUENCY_OPTIONS } from "@/features/finance/config/calculator.config";
import type { PaymentFrequency } from "@/features/finance/types/calculator.types";
import { cn } from "@/lib/utils";

/** Payment frequency control (§15) — same segmented-control pattern as LoanTermSelector. */
export function PaymentFrequencySelector({
  value,
  onChange,
  error,
}: {
  value: PaymentFrequency;
  onChange: (frequency: PaymentFrequency) => void;
  error?: string;
}) {
  const errorId = error ? "payment-frequency-error" : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-label-m text-primary-black">Payment Frequency</span>
      <div
        role="radiogroup"
        aria-label="Payment frequency"
        aria-describedby={errorId}
        className={cn(
          "inline-flex w-full overflow-hidden rounded-[var(--radius-control)] border",
          error ? "border-primary-red" : "border-border"
        )}
      >
        {PAYMENT_FREQUENCY_OPTIONS.map((option, index) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "focus-ring text-label-m h-11 flex-1 transition-colors duration-[var(--duration-micro)]",
                index > 0 && "border-l border-border",
                active ? "bg-primary-red text-primary-white" : "bg-surface text-primary-black hover:bg-soft-gray"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-caption-s text-primary-red">
          {error}
        </p>
      )}
    </div>
  );
}
