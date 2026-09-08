import { SpinnerIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface LoaderProps {
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

/** Shared loading indicator — used by Search's loading state, Quick Quote's
 * submitting state, and route-level `loading.tsx` fallbacks. */
export function Loader({ label = "Loading…", className, size = "md" }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 text-dark-neutral/60", className)} role="status" aria-live="polite">
      <SpinnerIcon className={size === "sm" ? "h-4 w-4 text-primary-red" : "h-6 w-6 text-primary-red"} />
      {label && <p className="text-body-m">{label}</p>}
    </div>
  );
}
