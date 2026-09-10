import { ArrowRightIcon, BodyIcon, DimensionsIcon, DrivetrainIcon, GaugeIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ServiceGridItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}

/** The four service lines — page-01-homepage.md §13. */
const SERVICES: ServiceGridItem[] = [
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
    // Rentals are their own full flow under /rentals, not a services-page
    // anchor — every rental entry point goes here, never the inventory or
    // services page.
    href: "/rentals",
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

/**
 * `items`/`gridClassName` default to the homepage/Services page's own four
 * service lines and 4-column layout, so every existing call site is
 * unchanged. Reused as-is (not duplicated) by the Rental Landing page's
 * "Paradigm Fleet Ecosystem" section (spec §10) with its own 5 real
 * business-line items — same card shape, no second card component.
 */
export function ServicesGrid({ items = SERVICES, gridClassName }: { items?: ServiceGridItem[]; gridClassName?: string }) {
  return (
    <div className={cn("grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4", gridClassName)}>
      {items.map((service) => (
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
