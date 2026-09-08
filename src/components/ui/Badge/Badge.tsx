import { cn } from "@/lib/utils";
import type { VehicleAvailability } from "@/features/vehicles/types/vehicle.types";

const availabilityLabel: Record<VehicleAvailability, string> = {
  available: "Available Now",
  limited: "Limited Availability",
  reserved: "Reserved",
  "coming-soon": "Coming Soon",
};

const availabilityClasses: Record<VehicleAvailability, string> = {
  available: "bg-primary-black text-primary-white",
  limited: "bg-primary-red text-primary-white",
  reserved: "bg-soft-gray text-dark-neutral border border-border",
  "coming-soon": "bg-dark-neutral text-primary-white",
};

export function AvailabilityBadge({ status, className }: { status: VehicleAvailability; className?: string }) {
  return (
    <span
      className={cn(
        "text-label-m inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs",
        availabilityClasses[status],
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "available" ? "bg-primary-white" : status === "limited" ? "bg-primary-white" : "bg-primary-red"
        )}
      />
      {availabilityLabel[status]}
    </span>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "text-label-m inline-flex items-center rounded-full bg-soft-gray px-3 py-1 text-xs text-primary-black",
        className
      )}
    >
      {children}
    </span>
  );
}
