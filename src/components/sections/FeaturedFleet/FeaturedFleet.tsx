import { Reveal } from "@/components/ui/Reveal";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { getFeaturedVehicles } from "@/features/vehicles/services/vehicles.service";
import Link from "next/link";

export function FeaturedFleet() {
  const vehicles = getFeaturedVehicles(3);

  return (
    <section id="fleet" aria-labelledby="fleet-heading" className="container-page py-16 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="fleet-heading" className="text-heading-l">
            Featured Fleet
          </h2>
          <p className="text-body-m mt-2 max-w-lg text-dark-neutral/60">
            A curated look at what&apos;s ready to deploy this week across our Southern Ontario yards.
          </p>
        </div>
        <Link href="/vehicles" className="focus-ring text-label-m rounded text-primary-red hover:underline">
          View All Inventory →
        </Link>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle, index) => (
          <Reveal key={vehicle.slug} className="h-full" as="div">
            <VehicleCard vehicle={vehicle} priority={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
