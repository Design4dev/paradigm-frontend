"use client";

import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { RentalFinderStep } from "@/features/rental/types/rental.types";

const STEPS: { id: RentalFinderStep; index: number; label: string; shortLabel: string }[] = [
  { id: "vehicle-type", index: 1, label: "Vehicle Type", shortLabel: "Vehicle" },
  { id: "use-case", index: 2, label: "What You Need", shortLabel: "Need" },
  { id: "results", index: 3, label: "Recommendation", shortLabel: "Result" },
];

/** Same circle/connector stepper pattern as TradeInStepper/CalculatorStepper — reused, not reinvented. */
export function RentalFinderStepper({
  currentStep,
  furthestIndex,
  onStepClick,
}: {
  currentStep: RentalFinderStep;
  furthestIndex: number;
  onStepClick: (step: RentalFinderStep) => void;
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
                  "text-label-m flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-[var(--duration-micro)] lg:h-9 lg:w-9",
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
