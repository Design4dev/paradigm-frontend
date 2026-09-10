"use client";

import { Button } from "@/components/ui/Button";

/** Shared Back/Continue footer so every booking step keeps identical button placement/sizing (spec §29). */
export function BookingStepFooter({
  onBack,
  onNext,
  nextLabel = "Continue →",
  nextDisabled = false,
  nextLoading = false,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  nextLoading?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
      {onBack ? (
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Back
        </Button>
      ) : (
        <span aria-hidden="true" />
      )}
      <Button type="button" variant="primary" size="lg" onClick={onNext} disabled={nextDisabled || nextLoading}>
        {nextLoading ? "Please wait…" : nextLabel}
      </Button>
    </div>
  );
}
