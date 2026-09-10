"use client";

import { Button } from "@/components/ui/Button";
import { RentalVehicleCard } from "@/features/rental/components/RentalVehicleCard";
import { getVehicles } from "@/features/rental/services/rentalAvailability.service";

/**
 * Find Your Fleet's result (spec §8/§9, full-page rebuild pass) — the
 * recommended vehicle from the real fleet catalog, shown as the same
 * `RentalVehicleCard` used on `/rentals` and Search Results. Matching is
 * exact and transparent (Step 1's options ARE `RENTAL_FLEET_CATEGORIES`
 * names, i.e. exactly `RentalFleetVehicle.name` values) — no scoring/
 * ranking model. "Rent It" takes the visitor to `/rentals/search` (the
 * same Reservation Search every other entry point uses, default
 * `destination` on `RentalVehicleCard`) — never straight into booking,
 * never a second booking form.
 */
export function RentalFinderResults({ vehicleType, onEditSelection }: { vehicleType: string; onEditSelection: () => void }) {
  const vehicle = getVehicles().find((v) => v.name === vehicleType);

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <p className="text-body-m text-dark-neutral/70">We couldn&apos;t find that category in our current fleet.</p>
        <Button type="button" variant="secondary" onClick={onEditSelection}>
          ← Choose a Different Vehicle Type
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-caption-s font-semibold text-dark-neutral/50">Recommended for you</p>
        <h2 className="text-heading-l text-primary-black">{vehicle.name}</h2>
        <p className="text-body-m mt-1 text-dark-neutral/70">Based on what you told us, this is the rental category that fits.</p>
      </div>

      <div className="mx-auto w-full max-w-xs">
        <RentalVehicleCard vehicle={vehicle} />
      </div>

      <Button type="button" variant="ghost" className="w-fit" onClick={onEditSelection}>
        ← Choose a Different Vehicle Type
      </Button>
    </div>
  );
}
