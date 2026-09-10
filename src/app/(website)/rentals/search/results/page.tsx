import { RentalHero } from "@/features/rental/components/RentalHero";
import { RentalSearchResults } from "@/features/rental/components/RentalSearchResults";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rental Vehicle Results | Paradigm Fleet Rentals",
  description: "Rental vehicles matching your search.",
  alternates: { canonical: "/rentals/search/results" },
};

/**
 * Rental Results (spec §14/§15) — a dedicated page, not a modal. Shows the
 * search summary plus vehicle results (filtered by category/vehicle
 * context if the search started from one). "Rent It" here goes straight to
 * `/rentals/book` (search is already done) — see `RentalVehicleCard`.
 */
export default function RentalSearchResultsPage() {
  return (
    <div className="pb-16">
      <RentalHero
        breadcrumbLabel="Results"
        eyebrow="Rental Results"
        heading="Available Rental Vehicles"
        subtitle="Real vehicles from our fleet, matched to your search."
        description="Select a vehicle to continue to booking."
      />
      <div className="container-page py-10">
        <RentalSearchResults />
      </div>
    </div>
  );
}
