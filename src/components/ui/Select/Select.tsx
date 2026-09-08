import { ChevronRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { useId, type SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  options: SelectOption[];
  error?: string;
  /** Visually hides the <label> while keeping it for assistive tech (e.g. compact search panels). */
  hideLabel?: boolean;
  containerClassName?: string;
}

/**
 * Native `<select>` styled to match Input's field chrome, used throughout
 * the Hero search, Advanced Search and lead forms (page-01-homepage.md
 * §6/§8/§10). Native rather than a custom listbox so keyboard/touch/screen
 * reader behavior is correct for free.
 */
export function Select({
  label,
  options,
  error,
  hideLabel = false,
  id,
  className,
  containerClassName,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <label htmlFor={selectId} className={cn("text-label-m text-primary-black", hideLabel && "sr-only")}>
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(
            // `h-11` matches Input and Button's "md" size exactly — see Input.tsx's fieldClasses comment.
            "focus-ring h-11 w-full appearance-none truncate rounded-[var(--radius-control)] border bg-surface py-2 pl-4 pr-10 text-body-m leading-tight text-primary-black transition-colors duration-[var(--duration-micro)]",
            error ? "border-primary-red" : "border-border focus:border-primary-black",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronRightIcon
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 opacity-50"
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-caption-s text-primary-red">
          {error}
        </p>
      )}
    </div>
  );
}
