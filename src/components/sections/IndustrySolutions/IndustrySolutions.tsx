import { ArrowRightIcon } from "@/components/ui/Icons";
import { categoryImage, PHOTO_IDS } from "@/features/vehicles/config/images.config";
import Image from "next/image";
import Link from "next/link";

/** Industry Solutions — page-01-homepage.md §14. */
const INDUSTRIES = [
  {
    label: "Plumbing",
    body: "Vehicles built for every job.",
    query: "Service+Truck",
    image: categoryImage(PHOTO_IDS.industryPlumbing),
  },
  {
    label: "Electrical",
    body: "Power your projects.",
    query: "Service+Truck",
    image: categoryImage(PHOTO_IDS.industryElectrical),
  },
  {
    label: "HVAC",
    body: "Keep business moving.",
    query: "Cargo+Van",
    image: categoryImage(PHOTO_IDS.industryHvac),
  },
  {
    label: "Logistics",
    body: "Deliver more.",
    query: "Box+Truck",
    image: categoryImage(PHOTO_IDS.industryLogistics),
  },
];

export function IndustrySolutions() {
  return (
    <section aria-labelledby="industry-heading" className="container-page py-16 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label-m mb-3 text-primary-red">Industry Solutions</p>
          <h2 id="industry-heading" className="text-heading-l">
            Built for the Work You Do
          </h2>
          <p className="text-body-m mt-2 max-w-lg text-dark-neutral/60">
            From trades and logistics to infrastructure and public services, we provide complete commercial vehicle
            solutions for similar industries.
          </p>
        </div>
        <Link href="/vehicles" className="focus-ring text-label-m shrink-0 rounded text-primary-red hover:underline">
          View All Inventory →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INDUSTRIES.map((industry) => (
          <Link
            key={industry.label}
            href={`/vehicles?type=${industry.query}`}
            className="focus-ring group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] text-left sm:aspect-[3/4]"
          >
            <Image
              src={industry.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 320px, 45vw"
              className="object-cover transition-transform duration-300 ease-[var(--ease-out-standard)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary-black/55 transition-colors duration-[var(--duration-micro)] group-hover:bg-primary-black/65" aria-hidden="true" />
            <span className="relative z-10 flex items-center justify-between gap-2 p-5 text-primary-white">
              <span>
                <span className="text-heading-m block">{industry.label}</span>
                <span className="text-caption-s block text-primary-white/70">{industry.body}</span>
              </span>
              <ArrowRightIcon
                tone="white"
                className="h-4 w-4 shrink-0 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
