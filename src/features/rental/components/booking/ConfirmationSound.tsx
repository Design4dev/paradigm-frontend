"use client";

import { playConfirmationChime, prefersReducedMotion } from "@/features/rental/lib/confirmationSound";
import { useEffect, useRef } from "react";

/**
 * Site-wide confirmation sound (booking confirmation refinement pass) —
 * mounted only on the real Confirmation view, only once a genuine
 * successful booking response is showing (`armed`). Renders nothing: the
 * sound plays automatically, once, in the background — no visible button,
 * text link, or replay control, so it never competes with or interrupts
 * the user's interaction. A mount-scoped ref guarantees at most one play
 * attempt per confirmation, never on a re-render of the same success
 * state (this component doesn't remount on its parent's re-renders, so
 * the ref survives). Never fires on a failed booking or a validation
 * error — `armed` is only ever true once `submission.status === "success"`.
 */
export function ConfirmationSound({ armed }: { armed: boolean }) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!armed || firedRef.current) return;
    firedRef.current = true;
    if (prefersReducedMotion()) return;
    void playConfirmationChime();
  }, [armed]);

  return null;
}
