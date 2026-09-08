"use client";

import { useVdpSections } from "@/features/vehicles/components/VdpSectionsContext";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/** Purchase price (page-03-vdp.md §7) — jumps to the on-page Financing section/tab rather than a dead "pricing details" page. */
export function VehiclePrice({ vehicle }: { vehicle: Vehicle }) {
  const { goToSection } = useVdpSections();

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <p className="text-display-l text-primary-black">{vehicle.priceLabel}</p>
      <button
        type="button"
        onClick={() => goToSection("financing")}
        className="focus-ring text-label-m inline-flex items-center gap-1 rounded text-primary-red hover:underline"
      >
        View Pricing Details →
      </button>
    </div>
  );
}
