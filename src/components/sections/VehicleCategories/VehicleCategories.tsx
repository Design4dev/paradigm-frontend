import { ArrowRightIcon } from "@/components/ui/Icons";
import { categoryImage, PHOTO_IDS } from "@/features/vehicles/config/images.config";
import Image from "next/image";
import Link from "next/link";

/**
 * Shop by Vehicle Type — page-01-homepage.md §11. Homepage groupings are a
 * simplified rollup of the live inventory's detailed categories (Compact
 * Vans, Cargo Van Low/Mid/High, Cube/Box 12–18ft and 18ft+, Service Trucks,
 * Refrigerated Trucks, SUV/Sedans, Pickup Trucks, Classic Cars), not a
 * replacement for them — the full breakdown lives on /vehicles.
 */
const CATEGORIES = [
  {
    label: "Cargo Vans",
    body: "Versatile for any job.",
    query: "Cargo+Van",
    image: categoryImage(PHOTO_IDS.categoryVans),
  },
  {
    label: "Cube / Box Trucks",
    body: "Move more, more possibilities.",
    query: "Box+Truck",
    image: categoryImage(PHOTO_IDS.categoryTrucks),
  },
  {
    label: "Service Trucks",
    body: "Built for hard work.",
    query: "Service+Truck",
    image: categoryImage(PHOTO_IDS.categoryServiceTrucks),
  },
  {
    label: "Pickup Trucks",
    body: "Power for your business.",
    query: "Pickup+Truck",
    image: categoryImage(PHOTO_IDS.pickupFront),
  },
  {
    label: "Passenger Vans",
    body: "Move your team in comfort.",
    query: "Passenger+Van",
    image: categoryImage(PHOTO_IDS.passengerVanFront),
  },
  {
    label: "Refrigerated / Other",
    body: "Specialized for your needs.",
    query: "Refrigerated",
    image: categoryImage(PHOTO_IDS.categoryElectric),
  },
];

export function VehicleCategories() {
  return (
    <section aria-labelledby="categories-heading" className="container-page py-16 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="categories-heading" className="text-heading-l">
          Shop by Vehicle Type
        </h2>
        <Link href="/vehicles" className="focus-ring text-label-m rounded text-primary-red hover:underline">
          View All Inventory →
        </Link>
      </div>
      <p className="text-body-m -mt-6 mb-8 max-w-lg text-dark-neutral/60">Find the right vehicle for your business.</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((category) => (
          <Link
            key={category.label}
            href={`/vehicles?type=${category.query}`}
            className="focus-ring group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface text-left"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-soft-gray">
              <Image
                src={category.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 220px, 45vw"
                className="object-contain p-3 transition-transform duration-300 ease-[var(--ease-out-standard)] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-3.5">
              <span className="text-label-m text-primary-black">{category.label}</span>
              <span className="text-caption-s text-dark-neutral/60">{category.body}</span>
              <span className="text-label-m mt-2 inline-flex items-center gap-1 text-primary-red">
                View Inventory
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
