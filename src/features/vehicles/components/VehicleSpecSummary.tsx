import { MapPinIcon } from "@/components/ui/Icons";
import type { SpecIconName, Vehicle } from "@/features/vehicles/types/vehicle.types";

/** Condensed "3.5L V6 | Automatic | Gas | 12,500 km" line + location (page-03-vdp.md §6). */
const SUMMARY_SPEC_ORDER: SpecIconName[] = ["engine", "transmission", "fuel", "mileage"];

export function VehicleSpecSummary({ vehicle }: { vehicle: Vehicle }) {
  const values = SUMMARY_SPEC_ORDER.map((icon) => vehicle.specs.find((spec) => spec.icon === icon)?.value).filter(
    (value): value is string => Boolean(value)
  );

  return (
    <div className="flex flex-col gap-1.5">
      {values.length > 0 && <p className="text-body-m text-dark-neutral/70">{values.join(" | ")}</p>}
      <p className="text-body-m flex items-center gap-1.5 text-dark-neutral/70">
        <MapPinIcon className="h-4 w-4 shrink-0" />
        {vehicle.location}
      </p>
    </div>
  );
}
