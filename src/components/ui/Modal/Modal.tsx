"use client";

import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type DialogVariant = "center" | "sheet-bottom" | "sheet-right" | "fullscreen";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy: string;
  variant?: DialogVariant;
  panelClassName?: string;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

const panelBaseByVariant: Record<DialogVariant, string> = {
  center:
    "mx-auto my-auto w-full max-w-lg rounded-[var(--radius-card)] bg-surface shadow-2xl max-h-[calc(100vh-2.5rem)] overflow-y-auto",
  "sheet-bottom":
    "mt-auto w-full rounded-t-[var(--radius-card)] bg-surface shadow-2xl max-h-[85vh] overflow-y-auto",
  "sheet-right":
    "ml-auto h-full w-full max-w-sm bg-surface shadow-2xl overflow-y-auto",
  fullscreen: "h-full w-full bg-surface overflow-y-auto",
};

const enterTransformByVariant: Record<DialogVariant, string> = {
  center: "translate-y-2 scale-[0.98] opacity-0",
  "sheet-bottom": "translate-y-6 opacity-0",
  "sheet-right": "translate-x-6 opacity-0",
  fullscreen: "opacity-0",
};

/**
 * Shared dialog primitive backing QuickQuoteModal, SearchOverlay and
 * MobileMenu — implements design.md's Modal / Drawer state machine
 * (Closed / Opening / Open / Closing) plus focus trap, Escape-to-close,
 * scroll lock and focus restoration.
 */
export function Dialog({
  isOpen,
  onClose,
  children,
  labelledBy,
  variant = "center",
  panelClassName,
  returnFocusRef,
}: DialogProps) {
  const [mounted, setMounted] = useState(isOpen);
  const [entered, setEntered] = useState(false);
  // Tracks isOpen so a change can be reacted to during render (React's
  // recommended "adjust state when a prop changes" pattern) instead of
  // inside an effect, keeping mount/unmount timing synchronous with the
  // triggering render rather than one tick behind it.
  const [trackedIsOpen, setTrackedIsOpen] = useState(isOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  if (isOpen !== trackedIsOpen) {
    setTrackedIsOpen(isOpen);
    if (isOpen) {
      setMounted(true);
    } else {
      setEntered(false);
    }
  }

  useLockBodyScroll(isOpen);
  useFocusTrap({ active: isOpen, containerRef, onClose, returnFocusRef });

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }
    const timeout = setTimeout(() => setMounted(false), reducedMotion ? 0 : 280);
    return () => clearTimeout(timeout);
  }, [isOpen, reducedMotion]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    // `pointer-events-none` whenever not fully open/entered: for up to
    // 280ms after `isOpen` flips false, this stays mounted (mid exit
    // transition) at opacity-0 — CSS opacity does NOT disable hit-testing,
    // so without this an invisible-but-fully-clickable full-viewport layer
    // would silently swallow every click on the page until the timeout
    // unmounts it. This was the root cause of "can't click anything after
    // closing Search/a modal."
    <div className={cn("fixed inset-0 z-50 flex", !(isOpen && entered) && "pointer-events-none")} role="presentation">
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-primary-black/60 transition-opacity duration-[var(--duration-panel)] ease-[var(--ease-in-out-standard)]",
          entered ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          "relative flex w-full transition-all duration-[var(--duration-panel)] ease-[var(--ease-out-standard)]",
          variant === "center" && "items-center justify-center p-4",
          variant === "sheet-bottom" && "items-end",
          variant === "sheet-right" && "items-stretch",
          variant === "fullscreen" && "items-stretch"
        )}
      >
        <div
          className={cn(
            panelBaseByVariant[variant],
            "transition-all duration-[var(--duration-panel)] ease-[var(--ease-out-standard)]",
            entered ? "translate-x-0 translate-y-0 scale-100 opacity-100" : enterTransformByVariant[variant],
            panelClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
