import { BookingConfirmationView } from "@/features/rental/components/booking/BookingConfirmationView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | Paradigm Fleet",
  description: "Your rental booking request has been received.",
  robots: { index: false },
  alternates: { canonical: "/rentals/confirmation" },
};

/**
 * Confirmation page (spec §27/§30) — its own route, reached only via a
 * real successful booking submission from `/rentals/book`. `robots: noindex`
 * since this reflects transient, per-visitor booking state.
 */
export default function RentalConfirmationPage() {
  return <BookingConfirmationView />;
}
