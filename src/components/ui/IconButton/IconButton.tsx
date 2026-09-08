import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: "default" | "inverted";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, variant = "default", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-[var(--duration-micro)] active:scale-[0.94]",
        variant === "default"
          ? "text-primary-black hover:bg-soft-gray active:bg-border"
          : "text-primary-white hover:bg-primary-white/10 active:bg-primary-white/20",
        className
      )}
      {...props}
    />
  );
});
