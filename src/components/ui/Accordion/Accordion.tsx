"use client";

import { ChevronRightIcon } from "@/components/ui/Icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Controlled mode: when provided (with `onOpenChange`), this item's own open state is ignored in favor of these. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

/**
 * Generic collapsible row — backs the VDP's tablet/mobile section nav
 * (page-03-vdp.md §11) and the Footer's tablet/mobile nav columns. Each
 * instance manages its own open state (uncontrolled) so any number of items
 * can be open at once, matching the reference's independent chevron rows.
 * Height animates via a grid-rows trick (no JS measuring); collapses
 * instantly under `prefers-reduced-motion`.
 */
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  titleClassName,
  contentClassName,
}: AccordionItemProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const contentId = useId();
  const reducedMotion = useReducedMotion();

  const toggle = () => {
    if (isControlled) {
      onOpenChange?.(!open);
    } else {
      setUncontrolledOpen((value) => !value);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={toggle}
        className={cn(
          "focus-ring flex w-full items-center justify-between gap-3 py-3 text-left text-label-m text-primary-black",
          titleClassName
        )}
      >
        {title}
        <ChevronRightIcon
          className={cn(
            "h-4 w-4 shrink-0 opacity-60 transition-transform",
            !reducedMotion && "duration-[var(--duration-micro)]",
            open ? "rotate-90" : "rotate-0"
          )}
        />
      </button>
      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows] ease-[var(--ease-out-standard)]",
          reducedMotion ? "duration-0" : "duration-[var(--duration-panel)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className={cn("overflow-hidden", contentClassName)}>{children}</div>
      </div>
    </div>
  );
}
