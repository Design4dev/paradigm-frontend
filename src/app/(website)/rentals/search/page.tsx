import { RentalHero } from "@/features/rental/components/RentalHero";
import { RentalSearchForm } from "@/features/rental/components/RentalSearchForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservation Search | Paradigm Fleet Rentals",
  description: "Search rental vehicles by pickup/drop-off location, dates and time.",
  alternates: { canonical: "/rentals/search" },
};

/**
 * Rental Search / Reservation page (spec §10/§11) — a dedicated page, not
 * a modal or a bottom-of-page form. Every entry point into rental booking
 * (a category tile, a vehicle's "Rent It," Find Your Fleet's result) lands
 * here first; the selected category/vehicle context (if any) is preserved
 * in `useRentalBookingStore` and shown inside `RentalSearchForm`.
 */
export default function RentalSearchPage() {
  return (
    <div className="pb-16">
      <RentalHero
        breadcrumbLabel="Search"
        eyebrow="Reservation Search"
        heading="Find Your Rental"
        subtitle="Pickup, return and driver details for your reservation."
        description="Tell us when and where, and we'll show you what's available."
      />
      <div className="container-page py-10">
        <div className="mx-auto max-w-xl">
          <RentalSearchForm />
        </div>
      </div>
    </div>
  );
}
