import { RentalFinderClient } from "@/features/rental/components/RentalFinderClient";
import { RentalHero } from "@/features/rental/components/RentalHero";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Your Fleet | Paradigm Fleet Rentals",
  description: "Answer a few quick questions and we'll match you with available rental fleet.",
  alternates: { canonical: "/rentals/find-your-fleet" },
};

/**
 * Find Your Fleet — a secondary, OPTIONAL discovery tool (rental
 * implementation spec §12/§18), not a required detour before booking. The
 * real primary path is Book Now on `/rentals`; this page exists for
 * visitors who aren't sure what they need yet. Modeled on the UX concept of
 * paradigmtruckrental.com/find-your-fleet/ (progressive questions →
 * qualification → recommendation), not its unverified internal scoring —
 * that page's content couldn't be inspected from this environment (see the
 * audit summary), so only the known, client-stated concept is used.
 */
export default function FindYourFleetPage() {
  return (
    <div className="pb-16">
      <RentalHero
        breadcrumbLabel="Find Your Fleet"
        eyebrow="Guided Rental Finder"
        heading="Find Your Fleet"
        subtitle="A few quick questions, then we'll show you what's available."
        description="No long form, no obligation — just tell us what you need and we'll match you with real, available fleet."
      />
      <p className="container-page pt-6 text-body-m text-dark-neutral/70">
        Already know what you need?{" "}
        <Link href="/rentals" className="focus-ring rounded font-semibold text-primary-red hover:underline">
          Skip ahead to our fleet →
        </Link>
      </p>
      <RentalFinderClient />
    </div>
  );
}
