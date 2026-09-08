import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

export function SearchResults({ results }: { results: Vehicle[] }) {
  return (
    <div>
      <p role="status" className="text-label-m mb-4 text-dark-neutral/70">
        {results.length} {results.length === 1 ? "vehicle" : "vehicles"} found
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
