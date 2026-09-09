import { cn } from "@/lib/utils";
import type { VehicleAvailability } from "@/features/vehicles/types/vehicle.types";

export type PillTone = "neutral" | "red" | "black" | "green" | "amber" | "outline";

const TONE_CLASSES: Record<PillTone, string> = {
  neutral: "bg-soft-gray text-primary-black",
  red: "bg-primary-red text-primary-white",
  black: "bg-primary-black text-primary-white",
  green: "bg-green-600 text-primary-white",
  amber: "bg-amber-500 text-primary-black",
  outline: "border border-border bg-surface text-primary-black",
};

export interface PillProps {
  children: React.ReactNode;
  tone?: PillTone;
  /** Small leading dot (matches the availability-style pills) — purely decorative, never the only signal (color is never the sole meaning-carrier — text label always present). */
  dot?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

/**
 * The one pill/tag primitive for the whole app (item #8) — semantic tone
 * variants (not arbitrary one-off colors), consistent radius/padding/type
 * scale, optional leading icon or status dot. Every "New"/"In Stock"/
 * "Featured"/condition/availability tag in the app should render through
 * this rather than hand-rolled `<span>` styling, so they can never drift.
 */
export function Pill({ children, tone = "neutral", dot = false, icon: Icon, className }: PillProps) {
  return (
    <span
      className={cn(
        // `text-caption-s font-semibold` is the single, deliberate source of
        // truth for size/line-height/weight — it used to be layered under a
        // conflicting `text-label-m ... text-xs leading-tight`, which only
        // ever looked right because of Tailwind's utility-generation order,
        // not because the two were meant to compose.
        "text-caption-s inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1 font-semibold leading-[1.3] tracking-[0.01em]",
        TONE_CLASSES[tone],
        className
      )}
    >
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-90" />}
      {Icon && <Icon className="h-3 w-3 shrink-0" />}
      <span className="truncate">{children}</span>
    </span>
  );
}

const AVAILABILITY_LABEL: Record<VehicleAvailability, string> = {
  available: "In Stock",
  limited: "Limited Availability",
  reserved: "Reserved",
  "coming-soon": "Coming Soon",
};

const AVAILABILITY_TONE: Record<VehicleAvailability, PillTone> = {
  available: "green",
  limited: "amber",
  reserved: "outline",
  "coming-soon": "black",
};

/** Availability pill — one definition, reused by VehicleCard, VehicleMeta (VDP) and admin. */
export function AvailabilityBadge({ status, className }: { status: VehicleAvailability; className?: string }) {
  return (
    <Pill tone={AVAILABILITY_TONE[status]} dot className={className}>
      {AVAILABILITY_LABEL[status]}
    </Pill>
  );
}

/** Generic neutral pill — kept for existing call sites that just need a plain tag. */
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Pill tone="neutral" className={className}>
      {children}
    </Pill>
  );
}
