import { ServicesGrid, type ServiceGridItem } from "@/components/sections/ServicesGrid";
import { BodyIcon, DimensionsIcon, DrivetrainIcon, GaugeIcon, WrenchIcon } from "@/components/ui/Icons";
import { RENTAL_ECOSYSTEM_LINES } from "@/features/rental/config/rental.config";

/** Same icon per business line as the homepage/Services page's own ServicesGrid, plus Service & Parts. */
const ECOSYSTEM_ICONS = [BodyIcon, GaugeIcon, DimensionsIcon, DrivetrainIcon, WrenchIcon];

const ECOSYSTEM_ITEMS: ServiceGridItem[] = RENTAL_ECOSYSTEM_LINES.map((line, i) => ({
  id: `ecosystem-${line.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  icon: ECOSYSTEM_ICONS[i],
  title: line.title,
  description: line.body,
  href: line.href,
}));

/**
 * "Paradigm Fleet Ecosystem" (spec §10) — no verified partner/manufacturer
 * logos exist in this project (audited: only Paradigm's own logo under
 * public/images/logos/), so per the spec's explicit fallback this shows
 * Paradigm Fleet's real internal business lines instead of fabricated
 * partner branding. Reuses ServicesGrid's exact card shape rather than a
 * second, near-identical component.
 */
export function RentalEcosystemSection() {
  return (
    <section aria-labelledby="rental-ecosystem-heading" className="border-y border-border bg-soft-gray py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-8 text-center">
          <p className="text-label-m mb-2 text-primary-red">One Commercial Vehicle Partner</p>
          <h2 id="rental-ecosystem-heading" className="text-heading-l text-primary-black">
            The Paradigm Fleet Ecosystem
          </h2>
          <p className="text-body-m mx-auto mt-2 max-w-xl text-dark-neutral/65">
            From rental to the rest of your fleet needs — sales, leasing, upfitting and service, all from one
            partner.
          </p>
        </div>
        <ServicesGrid items={ECOSYSTEM_ITEMS} gridClassName="sm:grid-cols-2 lg:grid-cols-5" />
      </div>
    </section>
  );
}
