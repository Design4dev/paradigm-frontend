import { AvailabilityBadge } from "@/components/ui/Badge";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/** Status pills row — "New" + availability (page-03-vdp.md §6). Save/Share render alongside it in VehicleSummary. */
export function VehicleMeta({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {vehicle.isNew && (
        <span className="text-label-m inline-flex items-center rounded-full bg-primary-red px-3 py-1 text-xs text-primary-white">
          New
        </span>
      )}
      <AvailabilityBadge status={vehicle.availability} />
    </div>
  );
}
