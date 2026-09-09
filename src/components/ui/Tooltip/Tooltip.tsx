"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState, type Ref } from "react";
import { createPortal } from "react-dom";

const GAP = 8;

export interface UseTooltipResult {
  /** Spread directly onto the trigger element (`<button {...triggerProps}>` / `<a {...triggerProps}>`). */
  triggerProps: {
    ref: (node: HTMLElement | null) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
  /** Render this once, anywhere in the tree — it portals to `document.body`. */
  tooltip: React.ReactNode;
}

/**
 * Hover/focus tooltip for icon-only controls, as a hook rather than a
 * cloneElement-wrapping component: the trigger's ref must merge with
 * whatever ref the caller already owns (e.g. `IconButton`'s own
 * `forwardRef`), and doing that merge by cloning the caller's element trips
 * the `react-hooks/refs` rule (`cloneElement(children, { ref })` reads as an
 * unsafe render-time ref access). Spreading `triggerProps` onto an element
 * you already author yourself avoids that entirely.
 *
 * The bubble renders through a portal positioned from the trigger's live
 * `getBoundingClientRect()`, so it escapes any `overflow-hidden`/clipped
 * ancestor (the header's collapsing utility bar, modal panels, the mobile
 * filter drawer) instead of getting cut off by a plain CSS sibling bubble.
 *
 * The bubble is `aria-hidden`: its text always duplicates the trigger's own
 * `aria-label`, so exposing it a second time to assistive tech would just
 * double-announce the same label.
 */
export function useTooltip(label: string, side: "top" | "bottom" = "top"): UseTooltipResult {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const nodeRef = useRef<HTMLElement | null>(null);

  const updatePosition = useCallback(() => {
    const el = nodeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({
      top: side === "top" ? rect.top - GAP : rect.bottom + GAP,
      left: rect.left + rect.width / 2,
    });
  }, [side]);

  const show = useCallback(() => {
    updatePosition();
    setEverOpened(true);
    setOpen(true);
  }, [updatePosition]);
  const hide = useCallback(() => setOpen(false), []);

  // Keep the bubble tracking its trigger while visible (scroll/resize) —
  // hover rarely outlives a scroll, but a keyboard-focused tooltip can.
  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  const setNode = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  const tooltip =
    everOpened && typeof document !== "undefined"
      ? createPortal(
          <span
            style={{
              top: coords.top,
              left: coords.left,
              transform: side === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0)",
            }}
            className={cn(
              "pointer-events-none fixed z-[var(--z-popover)] transition-opacity duration-[var(--duration-micro)] ease-[var(--ease-out-standard)]",
              open ? "opacity-100 delay-150" : "opacity-0"
            )}
          >
            <span
              role="tooltip"
              aria-hidden="true"
              className="text-caption-s relative block rounded-[var(--radius-control)] bg-primary-black px-2.5 py-1.5 font-medium whitespace-nowrap text-primary-white shadow-md"
            >
              {label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-primary-black",
                  side === "top" ? "top-full -mt-[3px]" : "bottom-full -mb-[3px]"
                )}
              />
            </span>
          </span>,
          document.body
        )
      : null;

  return {
    triggerProps: { ref: setNode, onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide },
    tooltip,
  };
}

/** Merges an internal ref-callback with a caller-supplied ref (function or object) onto the same node. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}
