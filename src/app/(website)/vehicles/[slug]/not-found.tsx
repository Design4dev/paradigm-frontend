import { Button } from "@/components/ui/Button";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { getFeaturedVehicles } from "@/features/vehicles/services/vehicles.service";
import Link from "next/link";
import { SearchVehiclesButton } from "@/features/vehicles/components/SearchVehiclesButton";

/**
 * Vehicle-specific 404 (page-03-vdp.md §23) — overrides the generic
 * `(website)/not-found.tsx` for this one segment so an unknown/removed
 * `/vehicles/[slug]` points the visitor back into real inventory instead of
 * just "back to homepage".
 */
export default function VehicleNotFound() {
  const suggestions = getFeaturedVehicles(3);

  return (
    <div className="container-page flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-label-m text-primary-red">404</p>
      <h1 className="text-display-l">We couldn&apos;t find that vehicle</h1>
      <p className="text-body-l max-w-md text-dark-neutral/60">
        It may have sold or the link may be out of date. Browse current inventory or search for something similar.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/vehicles">
          <Button variant="primary" size="lg">
            Back to Inventory
          </Button>
        </Link>
        <SearchVehiclesButton />
      </div>

      {suggestions.length > 0 && (
        <div className="mt-14 w-full max-w-5xl text-left">
          <h2 className="text-heading-l mb-5 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {suggestions.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
