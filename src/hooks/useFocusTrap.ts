"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface FocusTrapOptions {
  active: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  /** Element to return focus to once the trap deactivates. Defaults to whatever was focused when it activated. */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Shared modal/drawer accessibility behavior (design.md §5, Modal / Drawer):
 * Escape closes; Tab/Shift+Tab cycle within the container; focus moves into
 * the container on open and returns to the trigger on close.
 */
export function useFocusTrap({ active, containerRef, onClose, returnFocusRef }: FocusTrapOptions) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const container = containerRef.current;

    const focusFirst = () => {
      const focusable = container?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusable?.[0] ?? container)?.focus();
    };
    // Defer so the element has finished mounting/animating in.
    const raf = requestAnimationFrame(focusFirst);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !container) return;

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    // Snapshot now so the cleanup uses the ref's value at activation time,
    // not whatever it points to (or has been unmounted to) by close time.
    const explicitReturnTarget = returnFocusRef?.current;

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown, true);
      const returnTarget = explicitReturnTarget ?? previouslyFocused.current;
      returnTarget?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
