import { RentalBookingClient } from "@/features/rental/components/booking/RentalBookingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Rental | Paradigm Fleet",
  description: "Complete your rental booking — add-ons, coverage, information and payment.",
  robots: { index: false },
  alternates: { canonical: "/rentals/book" },
};

/**
 * Booking Process page (spec §17) — a full page (never a modal/popup/
 * iframe/external redirect). `robots: noindex` since this is a stateful
 * checkout step that means nothing without the in-memory booking state.
 */
export default function RentalBookPage() {
  return <RentalBookingClient />;
}
