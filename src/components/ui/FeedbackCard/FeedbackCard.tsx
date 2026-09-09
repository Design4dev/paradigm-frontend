import { AlertIcon, CheckCircleIcon, ErrorIcon, InfoIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export type FeedbackStatus = "success" | "error" | "warning" | "info";

const STATUS_ICON = { success: CheckCircleIcon, error: ErrorIcon, warning: AlertIcon, info: InfoIcon } as const;
const STATUS_CLASSES = {
  success: "bg-green-600/10 text-green-600",
  error: "bg-primary-red/10 text-primary-red",
  warning: "bg-amber-500/10 text-amber-600",
  info: "bg-dark-neutral/10 text-dark-neutral",
} as const;

export interface FeedbackCardProps {
  status: FeedbackStatus;
  title: string;
  message?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Reusable status/feedback card (item #13) — success, error, warning and
 * info states share one visual hierarchy (icon → title → message →
 * optional action) instead of each form/flow hand-rolling its own. Used by
 * QuickQuoteModal, ContactForm and the Search error state.
 */
export function FeedbackCard({ status, title, message, action, className }: FeedbackCardProps) {
  const Icon = STATUS_ICON[status];
  return (
    <div role={status === "error" ? "alert" : "status"} className={cn("flex flex-col items-center gap-3 py-4 text-center", className)}>
      <span className={cn("flex h-14 w-14 items-center justify-center rounded-full", STATUS_CLASSES[status])}>
        <Icon className="h-7 w-7" />
      </span>
      <div>
        <p className="text-heading-m text-primary-black">{title}</p>
        {message && <p className="text-body-m mt-1 text-dark-neutral/70">{message}</p>}
      </div>
      {action && <div className="mt-1 flex w-full flex-col gap-3 sm:flex-row">{action}</div>}
    </div>
  );
}
