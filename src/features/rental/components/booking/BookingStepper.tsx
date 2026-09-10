"use client";

import { CheckIcon } from "@/components/ui/Icons";
import { BOOKING_STEPPER } from "@/features/rental/config/booking.config";
import type { BookingStepId, BookingStepperPosition } from "@/features/rental/types/booking.types";
import { cn } from "@/lib/utils";

/**
 * Progress indicator for the booking process (spec §18) — shared by
 * `/rentals/book` (steps 1-4, live navigation) and `/rentals/confirmation`
 * (step 5, always shown as the completed/active end state; not clickable —
 * Confirmation is a one-way destination reached only after a real success).
 * Two presentations, not one shrunk into the other (§38): a compact
 * "Step X of 5" bar on mobile, the full circle-and-connector stepper from
 * `sm:` up.
 */
export function BookingStepper({
  current,
  furthestStepIndex,
  onStepClick,
}: {
  current: BookingStepperPosition;
  furthestStepIndex: number;
  onStepClick?: (step: BookingStepId) => void;
}) {
  const currentMeta = BOOKING_STEPPER.find((s) => s.id === current) ?? BOOKING_STEPPER[0];

  return (
    <div>
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <span className="text-caption-s font-semibold text-dark-neutral/60">
            Step {currentMeta.index} of {BOOKING_STEPPER.length}
          </span>
          <span className="text-caption-s text-dark-neutral/60">{currentMeta.label}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary-red transition-[width] duration-[var(--duration-panel)] ease-[var(--ease-out-standard)]"
            style={{ width: `${(currentMeta.index / BOOKING_STEPPER.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="hidden items-start overflow-x-auto pb-1 sm:flex">
        {BOOKING_STEPPER.map((step, i) => {
          const status = step.index < currentMeta.index ? "completed" : step.index === currentMeta.index ? "active" : "upcoming";
          const reachable = Boolean(onStepClick) && step.id !== "confirmation" && step.index <= furthestStepIndex && step.index !== currentMeta.index;

          return (
            <li key={step.id} className={cn("flex shrink-0 items-center", i < BOOKING_STEPPER.length - 1 && "grow")}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && onStepClick?.(step.id as BookingStepId)}
                aria-current={status === "active" ? "step" : undefined}
                title={step.label}
                className={cn(
                  "focus-ring flex shrink-0 flex-col items-center gap-1 rounded-[var(--radius-control)]",
                  reachable ? "cursor-pointer" : "cursor-default"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-caption-s flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-[var(--duration-micro)]",
                    status === "active" && "bg-primary-red text-primary-white",
                    status === "completed" && "bg-primary-black text-primary-white",
                    status === "upcoming" && "border border-border bg-surface text-dark-neutral/40"
                  )}
                >
                  {status === "completed" ? <CheckIcon className="h-3.5 w-3.5" /> : step.index}
                </span>
                <span className={cn("text-caption-s hidden whitespace-nowrap lg:block", status === "upcoming" ? "text-dark-neutral/45" : "text-primary-black")}>
                  {step.label}
                </span>
              </button>
              {i < BOOKING_STEPPER.length - 1 && (
                <span aria-hidden="true" className={cn("mx-1.5 h-px flex-1", step.index < currentMeta.index ? "bg-primary-black/25" : "bg-border")} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
