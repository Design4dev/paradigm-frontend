import { RentalHero } from "@/features/rental/components/RentalHero";
import { RentalQuoteClient, type RentalQuoteVehicleContext } from "@/features/rental/components/RentalQuoteClient";
import { getVehicleBySlug } from "@/features/vehicles/services/vehicles.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Rental Callback | Paradigm Fleet",
  description: "Can't book online right now? Request a callback and our rental team will book it for you directly.",
  alternates: { canonical: "/rentals/quote" },
};

interface RentalQuotePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Request a Callback — a fallback/compatibility path (full-page rebuild
 * pass, spec §28), not the primary booking flow. The real primary path is
 * Landing/Search Results "Rent It" → `/rentals/book`'s full booking
 * process. This route is kept rather than deleted since it's a real,
 * working lead-capture mechanism — reached directly, and offered as
 * `StepPayment`'s fallback when online payment isn't connected. Server
 * component resolving optional `?vehicle=<slug>` context, same pattern as
 * Trade-In/Payment Calculator.
 */
export default async function RentalQuotePage({ searchParams }: RentalQuotePageProps) {
  const params = await searchParams;
  const vehicleSlug = firstValue(params.vehicle);
  const vehicle = vehicleSlug ? (getVehicleBySlug(vehicleSlug) ?? null) : null;

  const vehicleContext: RentalQuoteVehicleContext | null = vehicle
    ? {
        slug: vehicle.slug,
        name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
        imageUrl: vehicle.images[0]?.url,
      }
    : null;

  return (
    <div className="pb-16">
      <RentalHero
        breadcrumbLabel="Request a Callback"
        eyebrow="Rental Callback"
        heading="Request a Rental Callback"
        subtitle="Prefer to book by phone? Tell us what you need and we'll call you back."
        description="Quick, no-obligation request. Our rental team will reach out to confirm details and get you booked."
      />
      <RentalQuoteClient vehicle={vehicleContext} />
    </div>
  );
}
