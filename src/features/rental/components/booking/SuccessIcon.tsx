"use client";

import { CheckIcon } from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Confirmation success icon (booking confirmation refinement pass) — a
 * circle scale-in with the checkmark appearing inside it and a very subtle
 * expanding ring behind it, once, ~700ms total (see `styles/animations.css`
 * for the exact keyframes/timeline). Green is used only here, matching
 * "green only for the success state" — everything else in the flow stays
 * the site's black/white/red.
 *
 * Plays automatically because this component only ever mounts once, when
 * `BookingConfirmationView` first renders after a real success (its own
 * re-renders don't remount this, so the animation classes — applied
 * unconditionally at mount, not toggled by state — never restart).
 * `useReducedMotion()` gates all three animation classes at once: under
 * prefers-reduced-motion the icon renders directly in its final state
 * (solid circle, visible check, no ring), no animation at all.
 */
export function SuccessIcon() {
  const reducedMotion = useReducedMotion();

  return (
    <span className="relative flex h-20 w-20 shrink-0 items-center justify-center">
      {!reducedMotion && (
        <span aria-hidden="true" className="rental-success-ring absolute inset-0 rounded-full bg-green-600/25" />
      )}
      <span
        aria-hidden="true"
        className={cn(
          "relative flex h-20 w-20 items-center justify-center rounded-full bg-green-600/10 text-green-600",
          !reducedMotion && "rental-success-circle"
        )}
      >
        <CheckIcon className={cn("h-9 w-9", !reducedMotion && "rental-success-check")} />
      </span>
    </span>
  );
}
