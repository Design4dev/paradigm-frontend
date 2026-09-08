import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-red text-primary-white hover:bg-accent-red-dark active:bg-accent-red-dark disabled:bg-border disabled:text-dark-neutral/40",
  secondary:
    "bg-transparent text-primary-black border border-primary-black hover:bg-primary-black hover:text-primary-white active:bg-dark-neutral disabled:border-border disabled:text-dark-neutral/40",
  ghost:
    "bg-transparent text-primary-black hover:bg-soft-gray active:bg-border disabled:text-dark-neutral/40",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-label-m",
  lg: "h-[52px] px-7 text-label-m",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] transition-[background-color,color,transform] duration-[var(--duration-micro)] ease-[var(--ease-out-standard)] active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});
