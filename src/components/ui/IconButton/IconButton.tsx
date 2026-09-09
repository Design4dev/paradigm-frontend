"use client";

import { mergeRefs, useTooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: "default" | "inverted";
  /** Which side the hover/focus tooltip opens toward. Every IconButton is icon-only, so a tooltip mirroring `aria-label` is shown by default. */
  tooltipSide?: "top" | "bottom";
  /** Escape hatch for the rare case a tooltip would be redundant or get in the way — off by default. */
  hideTooltip?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, variant = "default", tooltipSide = "top", hideTooltip = false, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props },
  ref
) {
  const { triggerProps, tooltip } = useTooltip(props["aria-label"], tooltipSide);

  return (
    <>
      <button
        ref={hideTooltip ? ref : mergeRefs(ref, triggerProps.ref)}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (!hideTooltip) triggerProps.onMouseEnter();
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (!hideTooltip) triggerProps.onMouseLeave();
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (!hideTooltip) triggerProps.onFocus();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!hideTooltip) triggerProps.onBlur();
        }}
        className={cn(
          "focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-[var(--duration-micro)] active:scale-[0.94]",
          variant === "default"
            ? "text-primary-black hover:bg-soft-gray active:bg-border"
            : "text-primary-white hover:bg-primary-white/10 active:bg-primary-white/20",
          className
        )}
        {...props}
      />
      {!hideTooltip && tooltip}
    </>
  );
});
