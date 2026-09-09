"use client";

import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { CalculatorStep } from "@/features/finance/types/calculator.types";

const STEPS: { id: CalculatorStep; label: string; shortLabel: string }[] = [
  { id: 1, label: "Vehicle & Payment Type", shortLabel: "Vehicle & Payment" },
  { id: 2, label: "Loan Details", shortLabel: "Details" },
  { id: 3, label: "Review", shortLabel: "Review" },
];

/**
 * 3-step visual progress (page-04-payment-calculator.md §8). UX layer only —
 * never alters the underlying calculation. Desktop/tablet lay the circle and
 * label side by side with a connecting rule; mobile stacks label under
 * circle in a compact row, matching the approved reference at each size.
 * Only completed steps (plus the current one) are reachable by click.
 */
export function CalculatorStepper({
  currentStep,
  furthestStep,
  onStepClick,
}: {
  currentStep: CalculatorStep;
  furthestStep: CalculatorStep;
  onStepClick: (step: CalculatorStep) => void;
}) {
  return (
    <ol className="flex items-start">
      {STEPS.map((step, index) => {
        const status = step.id < currentStep ? "completed" : step.id === currentStep ? "active" : "upcoming";
        const reachable = step.id <= furthestStep && step.id !== currentStep;

        return (
          <li key={step.id} className={cn("flex items-center", index < STEPS.length - 1 && "flex-1")}>
            <button
              type="button"
              disabled={!reachable}
              onClick={() => onStepClick(step.id)}
              aria-current={status === "active" ? "step" : undefined}
              className={cn(
                "focus-ring flex flex-col items-center gap-1.5 rounded-[var(--radius-control)] text-center sm:flex-row sm:gap-2.5 sm:text-left",
                reachable ? "cursor-pointer" : "cursor-default"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-label-m transition-colors duration-[var(--duration-micro)] sm:h-9 sm:w-9",
                  status === "active" && "bg-primary-red text-primary-white",
                  status === "completed" && "bg-primary-black text-primary-white",
                  status === "upcoming" && "border border-border bg-surface text-dark-neutral/40"
                )}
              >
                {status === "completed" ? <CheckIcon className="h-4 w-4" /> : step.id}
              </span>
              <span
                className={cn(
                  "text-caption-s max-w-[6rem] leading-snug sm:text-label-m sm:max-w-none",
                  status === "upcoming" ? "text-dark-neutral/45" : "text-primary-black"
                )}
              >
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.shortLabel}</span>
              </span>
            </button>
            {index < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={cn("mx-2 hidden h-px flex-1 sm:mx-3 sm:block", step.id < currentStep ? "bg-primary-black/25" : "bg-border")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
