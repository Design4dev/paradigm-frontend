"use client";

import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { getVehicleBySlug } from "@/features/vehicles/services/vehicles.service";
import { useAppStore } from "@/store";

/** Renders nothing until the visitor has actually viewed a vehicle this session/browser. */
export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const slugs = useAppStore((state) => state.recentlyViewedSlugs);
  const vehicles = slugs
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => getVehicleBySlug(slug))
    .filter((vehicle): vehicle is NonNullable<typeof vehicle> => Boolean(vehicle));

  if (vehicles.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed-heading" className="container-page py-16 sm:py-20">
      <h2 id="recently-viewed-heading" className="text-heading-l mb-8">
        Recently Viewed
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
