"use client";

import { SpeakerIcon } from "@/components/ui/Icons";
import { playConfirmationChime, prefersReducedMotion } from "@/features/rental/lib/confirmationSound";
import { useEffect, useRef, useState } from "react";

/**
 * Site-wide confirmation sound (spec §20) — mounted only on the real
 * Confirmation view, only once a genuine successful booking response is
 * showing (`armed`). Attempts one best-effort autoplay on first mount
 * (skipped entirely under `prefers-reduced-motion`), and always renders an
 * accessible manual control regardless of whether that attempt succeeded —
 * the graceful fallback the spec calls for, rather than fragile autoplay-
 * success detection. Never fires on failed bookings, validation errors, or
 * a re-render of the same confirmation (the mount-scoped ref fires once).
 */
export function ConfirmationSoundControl({ armed }: { armed: boolean }) {
  const firedRef = useRef(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!armed || firedRef.current) return;
    firedRef.current = true;
    if (prefersReducedMotion()) return;
    void playConfirmationChime().then((ok) => {
      if (ok) setPlayed(true);
    });
  }, [armed]);

  if (!armed) return null;

  const handleClick = () => {
    void playConfirmationChime().then((ok) => {
      if (ok) setPlayed(true);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="focus-ring mx-auto inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-label-m text-dark-neutral/70 transition-colors duration-[var(--duration-micro)] hover:border-primary-red hover:text-primary-red"
    >
      <SpeakerIcon className="h-4 w-4" />
      {played ? "Play Confirmation Sound Again" : "Booking Confirmed — Play Sound"}
    </button>
  );
}
