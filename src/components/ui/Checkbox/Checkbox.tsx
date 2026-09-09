import { cn } from "@/lib/utils";
import { useId, type InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: React.ReactNode;
  /** Shown right-aligned after the label — e.g. a live result count like "(3)". */
  trailing?: React.ReactNode;
  containerClassName?: string;
}

/** Shared checkbox control (item #11) — consistent target size/spacing, real focus ring, disabled state. */
export function Checkbox({ label, trailing, id, className, containerClassName, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "text-body-m flex min-h-[28px] cursor-pointer items-center justify-between gap-2 text-dark-neutral/85",
        props.disabled && "cursor-not-allowed opacity-50",
        containerClassName
      )}
    >
      <span className="flex items-center gap-2.5">
        <input
          id={inputId}
          type="checkbox"
          className={cn(
            "focus-ring h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[4px] border-border accent-primary-red disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {label}
      </span>
      {trailing !== undefined && <span className="text-caption-s text-dark-neutral/60">{trailing}</span>}
    </label>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: React.ReactNode;
  containerClassName?: string;
}

/** Shared radio control — same visual language as Checkbox for a consistent form system. */
export function Radio({ label, id, className, containerClassName, ...props }: RadioProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "text-body-m flex min-h-[28px] cursor-pointer items-center gap-2.5 text-dark-neutral/85",
        props.disabled && "cursor-not-allowed opacity-50",
        containerClassName
      )}
    >
      <input
        id={inputId}
        type="radio"
        className={cn(
          "focus-ring h-[18px] w-[18px] shrink-0 cursor-pointer border-border accent-primary-red disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
      {label}
    </label>
  );
}
