import { cn } from "@/lib/utils";
import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  /** Visually hides the <label> while keeping it for assistive tech (e.g. a Min/Max pair under one shared heading). */
  hideLabel?: boolean;
}

/**
 * Fixed text glued to the inside edge of the field (e.g. "$" / "%") — used
 * by CurrencyInput/PercentageInput so those stay thin wrappers around Input
 * instead of re-implementing field chrome (border/radius/focus/error states).
 */
interface AdornedFieldProps {
  leadingText?: string;
  trailingText?: string;
}

export type InputProps = BaseFieldProps & AdornedFieldProps & InputHTMLAttributes<HTMLInputElement>;

/**
 * Shared field chrome. `h-11` (44px) is the site's one standard control
 * height — Button's "md" size, Select and Input all match it exactly so a
 * field and an inline button never look like two different systems. Never
 * override this per-usage; adjust it here if the whole system needs to
 * change.
 */
const baseFieldClasses =
  "focus-ring w-full rounded-[var(--radius-control)] border bg-surface px-4 text-body-m leading-tight text-primary-black placeholder:text-dark-neutral/40 transition-colors duration-[var(--duration-micro)]";
const fieldClasses = cn(baseFieldClasses, "h-11 py-2");
const textareaFieldClasses = cn(baseFieldClasses, "min-h-24 py-3 resize-y");

export function Input({
  label,
  error,
  hint,
  id,
  className,
  containerClassName,
  hideLabel = false,
  leadingText,
  trailingText,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const borderClass = error ? "border-primary-red" : "border-border focus-within:border-primary-black";

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <label htmlFor={inputId} className={cn("text-label-m text-primary-black", hideLabel && "sr-only")}>
        {label}
      </label>
      {leadingText || trailingText ? (
        <div className={cn(fieldClasses, borderClass, "flex items-center gap-1 px-0", className)}>
          {leadingText && (
            <span aria-hidden="true" className="pl-4 text-dark-neutral/50">
              {leadingText}
            </span>
          )}
          <input
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={cn(hintId, errorId) || undefined}
            className={cn(
              "h-full w-full min-w-0 flex-1 bg-transparent text-body-m leading-tight text-primary-black placeholder:text-dark-neutral/40 focus:outline-none",
              leadingText ? "pl-0" : "pl-4",
              trailingText ? "pr-0" : "pr-4"
            )}
            {...props}
          />
          {trailingText && (
            <span aria-hidden="true" className="pr-4 text-dark-neutral/50">
              {trailingText}
            </span>
          )}
        </div>
      ) : (
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={cn(hintId, errorId) || undefined}
          className={cn(fieldClasses, borderClass, className)}
          {...props}
        />
      )}
      {hint && !error && (
        <p id={hintId} className="text-caption-s text-dark-neutral/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-caption-s text-primary-red">
          {error}
        </p>
      )}
    </div>
  );
}

export type TextareaProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ label, error, hint, id, className, containerClassName, ...props }: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <label htmlFor={inputId} className="text-label-m text-primary-black">
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={cn(hintId, errorId) || undefined}
        className={cn(
          textareaFieldClasses,
          error ? "border-primary-red" : "border-border focus:border-primary-black",
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="text-caption-s text-dark-neutral/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-caption-s text-primary-red">
          {error}
        </p>
      )}
    </div>
  );
}
