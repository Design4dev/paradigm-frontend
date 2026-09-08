import { ArrowRightIcon, BodyIcon, DimensionsIcon, DrivetrainIcon, GaugeIcon } from "@/components/ui/Icons";
import Link from "next/link";

/** The four service lines — page-01-homepage.md §13. */
const SERVICES = [
  {
    id: "sales",
    icon: GaugeIcon,
    title: "Sales",
    description: "Get the right vehicle for your fleet.",
    href: "/vehicles",
  },
  {
    id: "rentals",
    icon: BodyIcon,
    title: "Rentals",
    description: "Flexible rentals for short or long term.",
    href: "/services#rentals",
  },
  {
    id: "leasing-financing",
    icon: DimensionsIcon,
    title: "Leasing & Financing",
    description: "Solutions that fit your budget.",
    href: "/services#leasing-financing",
  },
  {
    id: "upfitting",
    icon: DrivetrainIcon,
    title: "Upfitting",
    description: "Custom builds for your specific needs.",
    href: "/services#upfitting",
  },
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          id={service.id}
          className="scroll-mt-24 flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6"
        >
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
            <service.icon className="h-5 w-5" />
          </span>
          <h3 className="text-heading-m mb-2">{service.title}</h3>
          <p className="text-body-m mb-4 text-dark-neutral/65">{service.description}</p>
          <Link
            href={service.href}
            className="focus-ring text-label-m mt-auto inline-flex w-fit items-center gap-1 rounded text-primary-red hover:underline"
          >
            Learn More
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      ))}
    </div>
  );
}
