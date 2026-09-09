"use client";

import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { TradeInStep } from "@/features/tradein/types/tradein.types";

const STEPS: { id: TradeInStep; index: number; label: string; shortLabel: string }[] = [
  { id: "vehicle", index: 1, label: "Vehicle Information", shortLabel: "Vehicle" },
  { id: "condition", index: 2, label: "Vehicle Condition", shortLabel: "Condition" },
  { id: "photos", index: 3, label: "Photos (Optional)", shortLabel: "Photos" },
  { id: "contact", index: 4, label: "Contact Information", shortLabel: "Contact" },
  { id: "review", index: 5, label: "Appraisal Result", shortLabel: "Result" },
];

/**
 * 5-step guided progress (§9) — same circle/connector pattern as the Payment
 * Calculator's CalculatorStepper (approved reference visual match), extended
 * to 5 steps. Only completed steps (plus the current one) are reachable by
 * click; the current step is always shown.
 */
export function TradeInStepper({
  currentStep,
  furthestIndex,
  onStepClick,
}: {
  currentStep: TradeInStep;
  furthestIndex: number;
  onStepClick: (step: TradeInStep) => void;
}) {
  const currentIndex = STEPS.find((step) => step.id === currentStep)?.index ?? 1;

  return (
    <ol className="flex items-start overflow-x-auto pb-1">
      {STEPS.map((step, i) => {
        const status = step.index < currentIndex ? "completed" : step.index === currentIndex ? "active" : "upcoming";
        const reachable = step.index <= furthestIndex && step.index !== currentIndex;

        return (
          <li key={step.id} className={cn("flex shrink-0 items-center", i < STEPS.length - 1 && "grow")}>
            <button
              type="button"
              disabled={!reachable}
              onClick={() => onStepClick(step.id)}
              aria-current={status === "active" ? "step" : undefined}
              className={cn(
                "focus-ring flex shrink-0 flex-col items-center gap-1.5 rounded-[var(--radius-control)] text-center lg:flex-row lg:gap-2.5 lg:text-left",
                reachable ? "cursor-pointer" : "cursor-default"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-label-m transition-colors duration-[var(--duration-micro)] lg:h-9 lg:w-9",
                  status === "active" && "bg-primary-red text-primary-white",
                  status === "completed" && "bg-primary-black text-primary-white",
                  status === "upcoming" && "border border-border bg-surface text-dark-neutral/40"
                )}
              >
                {status === "completed" ? <CheckIcon className="h-4 w-4" /> : step.index}
              </span>
              <span
                className={cn(
                  "text-caption-s shrink-0 whitespace-nowrap leading-snug lg:text-label-m",
                  status === "upcoming" ? "text-dark-neutral/45" : "text-primary-black"
                )}
              >
                <span className="hidden lg:inline">{step.label}</span>
                <span className="lg:hidden">{step.shortLabel}</span>
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={cn("mx-2 hidden h-px flex-1 lg:mx-3 lg:block", step.index < currentIndex ? "bg-primary-black/25" : "bg-border")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
