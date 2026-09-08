import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import Link from "next/link";

/** `query` (optional) powers "View All on Inventory" so a quick in-overlay search can still hand off to the real, filtered Vehicle Listing page. */
export function SearchResults({ results, query }: { results: Vehicle[]; query?: string }) {
  const listingHref = query?.trim() ? `/vehicles?q=${encodeURIComponent(query.trim())}` : "/vehicles";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-label-m text-dark-neutral/70">
          {results.length} {results.length === 1 ? "vehicle" : "vehicles"} found
        </p>
        {results.length > 0 && (
          <Link href={listingHref} className="focus-ring text-label-m rounded text-primary-red hover:underline">
            View All on Inventory →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
