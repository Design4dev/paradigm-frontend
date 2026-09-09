import { AvailabilityBadge, Pill } from "@/components/ui/Badge";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/** Status pills row — "New" + availability (page-03-vdp.md §6). Save/Share render alongside it in VehicleSummary. */
export function VehicleMeta({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {vehicle.isNew && <Pill tone="red">New</Pill>}
      <AvailabilityBadge status={vehicle.availability} />
    </div>
  );
}
