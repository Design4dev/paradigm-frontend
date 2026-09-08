"use client";

import { useEffect } from "react";

// Module-level counter shared by every Dialog instance. Two overlays can
// legitimately be open at once (e.g. requesting a quote on a vehicle card
// shown inside the Search overlay opens QuickQuoteModal on top of it) — a
// naive "save my own original value, restore it on unmount" per-instance
// approach breaks if they don't close in strict last-opened-first-closed
// order: the first one to unmount would restore `overflow` to its own
// pre-lock value and unlock scroll while the other dialog is still open.
// Counting locks instead means the body only ever unlocks once nothing is
// holding it.
let lockCount = 0;
let previousOverflow = "";

/** Prevents background scroll while a modal/drawer/overlay is open. */
export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [active]);
}
