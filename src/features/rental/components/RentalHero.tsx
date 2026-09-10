import { BenefitStrip } from "@/components/sections/BenefitStrip";
import { buttonClassName } from "@/components/ui/Button";
import { CalendarIcon, ChevronRightIcon, GaugeIcon, ShieldIcon, VehicleTypeIcon } from "@/components/ui/Icons";
import { RENTAL_VALUE_PROPS } from "@/features/rental/config/rental.config";
import { heroImage } from "@/features/vehicles/config/images.config";
import Image from "next/image";
import Link from "next/link";

/** Verified real value propositions from paradigmtruckrental.com (rental.config.ts) — not invented/generic filler. */
const RENTAL_BENEFIT_ICONS = [GaugeIcon, ShieldIcon, CalendarIcon, VehicleTypeIcon];
const RENTAL_BENEFITS = RENTAL_VALUE_PROPS.map((prop, i) => ({ icon: RENTAL_BENEFIT_ICONS[i], title: prop.title, body: prop.body }));

export interface RentalHeroAction {
  label: string;
  href: string;
}

/**
 * Compact page hero — same dark image-banner-with-breadcrumb shell as
 * CalculatorHero/TradeInHero/VrpHero. `primaryAction`/`secondaryAction` are
 * optional (only the Rental Landing page passes them — spec §3's "Book Now"
 * / "View Rental Fleet"; the Search/Results/Book/Find-Your-Fleet/Quote
 * hero instances stay CTA-less, matching their existing, still-correct
 * behavior).
 */
export function RentalHero({
  breadcrumbLabel,
  eyebrow,
  heading,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
}: {
  breadcrumbLabel: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  description: string;
  primaryAction?: RentalHeroAction;
  secondaryAction?: RentalHeroAction;
}) {
  return (
    <section className="relative overflow-hidden bg-primary-black">
      <Image src={heroImage.url} alt={heroImage.alt} fill priority sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/75 to-primary-black/50" aria-hidden="true" />

      <div className="container-page relative flex flex-col gap-3 py-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="text-caption-s flex items-center gap-1.5 text-primary-white/70">
          <Link href="/" className="focus-ring rounded hover:text-primary-white">
            Home
          </Link>
          <ChevronRightIcon className="h-3 w-3 opacity-60" />
          <Link href="/rentals" className="focus-ring rounded hover:text-primary-white">
            Rentals
          </Link>
          {breadcrumbLabel !== "Rentals" && (
            <>
              <ChevronRightIcon className="h-3 w-3 opacity-60" />
              <span className="text-primary-white" aria-current="page">
                {breadcrumbLabel}
              </span>
            </>
          )}
        </nav>

        <div>
          <p className="text-label-m mb-1 text-primary-red">{eyebrow}</p>
          <h1 className="text-display-l text-primary-white">{heading}</h1>
          <p className="text-body-l mt-1 text-primary-white/80">{subtitle}</p>
          <p className="text-body-m mt-2 max-w-xl text-primary-white/65">{description}</p>
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="mt-2 flex flex-wrap gap-3">
            {primaryAction && (
              <Link href={primaryAction.href} className={buttonClassName({ variant: "primary", size: "lg" })}>
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className={buttonClassName({
                  variant: "secondary",
                  size: "lg",
                  className: "!border-primary-white/40 !bg-transparent !text-primary-white hover:!bg-primary-white hover:!text-primary-black",
                })}
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}
      </div>

      <BenefitStrip tone="dark" items={RENTAL_BENEFITS} className="relative border-primary-white/10 bg-primary-black/40" />
    </section>
  );
}
