import { AvailabilityBadge } from "@/components/ui/Badge";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/**
 * Status pills row — "New" + availability (page-03-vdp.md §6). The VDP
 * reference shows "available" specifically as a green "In Stock" pill;
 * every other status keeps the shared `AvailabilityBadge` copy/styling
 * (also used by admin), so only this one case gets a local override rather
 * than changing that shared component's meaning everywhere it's used.
 */
export function VehicleMeta({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {vehicle.isNew && (
        <span className="text-label-m inline-flex items-center rounded-full bg-primary-red px-3 py-1 text-xs text-primary-white">
          New
        </span>
      )}
      {vehicle.availability === "available" ? (
        <span className="text-label-m inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-xs text-primary-white">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary-white" />
          In Stock
        </span>
      ) : (
        <AvailabilityBadge status={vehicle.availability} />
      )}
    </div>
  );
}
