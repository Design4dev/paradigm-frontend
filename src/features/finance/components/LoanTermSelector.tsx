"use client";

import { LOAN_TERM_OPTIONS } from "@/features/finance/config/calculator.config";
import { cn } from "@/lib/utils";

/**
 * Loan term control (§14) — a segmented control (same pattern as the
 * Homepage's Buy/Rent/Service/Parts tabs: one rounded shell, `border-l`
 * dividers, only the end segments carry the outer radius) rather than a new
 * slider/select pattern, since the term set is small and fixed.
 */
export function LoanTermSelector({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (months: number) => void;
  error?: string;
}) {
  const errorId = error ? "loan-term-error" : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-label-m text-primary-black">Loan Term</span>
      <div
        role="radiogroup"
        aria-label="Loan term"
        aria-describedby={errorId}
        className={cn(
          "inline-flex w-full overflow-hidden rounded-[var(--radius-control)] border",
          error ? "border-primary-red" : "border-border"
        )}
      >
        {LOAN_TERM_OPTIONS.map((option, index) => {
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
      <p className="text-caption-s text-dark-neutral/70">The longer the loan, the smaller your payment.</p>
      {error && (
        <p id={errorId} role="alert" className="text-caption-s text-primary-red">
          {error}
        </p>
      )}
    </div>
  );
}
