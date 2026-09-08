import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { getRelatedVehicles } from "@/features/vehicles/services/vehicles.service";
import Link from "next/link";

export function RelatedVehicles({ slug }: { slug: string }) {
  const related = getRelatedVehicles(slug);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="related-heading" className="text-heading-l">
          Related Vehicles
        </h2>
        <Link href="/vehicles" className="focus-ring text-label-m rounded text-primary-red hover:underline">
          View All Inventory →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
