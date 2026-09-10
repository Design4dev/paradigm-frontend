import { buttonClassName } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { RentalCategoryTile } from "@/features/rental/components/RentalCategoryTile";
import { RentalEcosystemSection } from "@/features/rental/components/RentalEcosystemSection";
import { RentalFleetGrid } from "@/features/rental/components/RentalFleetGrid";
import { RentalHero } from "@/features/rental/components/RentalHero";
import { RentalLandingViewTracker } from "@/features/rental/components/RentalLandingViewTracker";
import { RentalNotSureSection } from "@/features/rental/components/RentalNotSureSection";
import { RentalProcessSection } from "@/features/rental/components/RentalProcessSection";
import { RentalUpfitSection } from "@/features/rental/components/RentalUpfitSection";
import { RentalWhyChoose } from "@/features/rental/components/RentalWhyChoose";
import { RENTAL_CATEGORIES } from "@/features/rental/config/booking.config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vehicle Rentals | Paradigm Fleet",
  description: "Book your van or truck rental — free 100 KMs per day, no booking fees, and a variety of vehicles to choose from.",
  alternates: { canonical: "/rentals" },
};

/**
 * Rental Landing (spec: "RENTAL LANDING PAGE REFINEMENT + PARTNERS +
 * SITE-WIDE CONFIRMATION SOUND" pass). Header → Hero (Book Now / View
 * Rental Fleet) → Rental Vehicle Categories → Our Rental Fleet → Not Sure
 * What You Need? (secondary, after the fleet) → Why Choose Paradigm Truck
 * Rental → More Than a Rental (upfitting) → Paradigm Fleet Ecosystem →
 * Simple Rental Process → Final CTA → Footer. Every "Rent It"/category
 * click takes the visitor to `/rentals/search` (never a modal/popup/
 * iframe) — see `RentalVehicleCard`/`RentalCategoryTile`. The primary
 * journey is See Vehicles → Choose Vehicle → Rent It; Find Your Fleet stays
 * a single, secondary entry point.
 */
export default function RentalsPage() {
  return (
    <>
      <RentalLandingViewTracker />
      <RentalHero
        breadcrumbLabel="Rentals"
        eyebrow="Paradigm Truck Rental"
        heading="Book Your Van or Truck Rental"
        subtitle="Short- and long-term truck and van rentals for businesses, with a variety of vehicles, competitive rates and custom upfitting options."
        description="Free 100 KMs per day, no booking fees, and a variety of vehicles to choose from."
        primaryAction={{ label: "Book Now", href: "/rentals/search" }}
        secondaryAction={{ label: "View Rental Fleet", href: "#rental-fleet" }}
      />

      <div id="rental-categories" className="container-page scroll-mt-20 py-10 sm:py-12">
        <div className="mb-6 text-center">
          <h2 className="text-heading-l text-primary-black">What Type of Rental Vehicle Do You Need?</h2>
          <p className="text-body-m mt-2 text-dark-neutral/70">Choose a category to start your search.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {RENTAL_CATEGORIES.map((category) => (
            <RentalCategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </div>

      <div id="rental-fleet" className="container-page scroll-mt-20 py-10 sm:py-12">
        <div className="mb-6 text-center">
          <h2 className="text-heading-l text-primary-black">Our Rental Fleet</h2>
          <p className="text-body-m mt-2 text-dark-neutral/70">Browse real vehicles from our fleet.</p>
        </div>

        <RentalFleetGrid />
      </div>

      <RentalNotSureSection />
      <RentalWhyChoose />
      <RentalUpfitSection />
      <RentalEcosystemSection />
      <RentalProcessSection />

      <CTA
        tone="dark"
        heading="Ready to Get to Work?"
        body="Choose your vehicle, select your dates and get your rental moving."
        action={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/rentals/search" className={buttonClassName({ variant: "primary", size: "lg" })}>
              Book Now
            </Link>
            <Link
              href="#rental-fleet"
              className={buttonClassName({
                variant: "secondary",
                size: "lg",
                className: "!border-primary-white/40 !bg-transparent !text-primary-white hover:!bg-primary-white hover:!text-primary-black",
              })}
            >
              View Rental Fleet
            </Link>
          </div>
        }
      />
    </>
  );
}
