import { RentalVehicleCard } from "@/features/rental/components/RentalVehicleCard";
import { RENTAL_FLEET_VEHICLES } from "@/features/rental/config/booking.config";

/**
 * "Our Rental Fleet" (spec §3/§9) — the verified real fleet catalog, real
 * photography (see booking.config.ts), one `RentalVehicleCard` per
 * category. "Rent It" takes the visitor to `/rentals/search` with this
 * vehicle preserved as context — never a modal, never straight into
 * booking (spec §7).
 */
export function RentalFleetGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {RENTAL_FLEET_VEHICLES.map((vehicle, i) => (
        <RentalVehicleCard key={vehicle.slug} vehicle={vehicle} priority={i < 4} />
      ))}
    </div>
  );
}
