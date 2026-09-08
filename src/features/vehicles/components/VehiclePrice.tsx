"use client";

import { useVdpSections } from "@/features/vehicles/components/VdpSectionsContext";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/** Purchase price (page-03-vdp.md §7) — jumps to the on-page Financing section/tab rather than a dead "pricing details" page. */
export function VehiclePrice({ vehicle }: { vehicle: Vehicle }) {
  const { scrollToSection } = useVdpSections();

  return (
    <div className="flex flex-col gap-1">
      <p className="text-display-l text-primary-black">{vehicle.priceLabel}</p>
      <button
        type="button"
        onClick={() => scrollToSection("financing")}
        className="focus-ring text-label-m inline-flex w-fit items-center gap-1 rounded text-primary-red hover:underline"
      >
        View Pricing Details →
      </button>
    </div>
  );
}
