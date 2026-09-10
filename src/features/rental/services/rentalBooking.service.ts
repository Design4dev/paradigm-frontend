import { BOOKING_LOCATIONS } from "@/features/rental/config/booking.config";
import { submitRentalQuote } from "@/features/rental/services/rental.service";
import type { RentalBookingState } from "@/features/rental/types/booking.types";
import type { RentalQuoteResult } from "@/features/rental/types/rental.types";

export type CreateBookingResult = { ok: true; data: RentalQuoteResult } | { ok: false; error: string };

function locationLabel(value: string): string {
  return BOOKING_LOCATIONS.find((loc) => loc.value === value)?.label ?? value;
}

/**
 * Booking-creation adapter boundary (spec §23/§28). There is no live
 * connection to the client's actual reservation system (Apprentall) that
 * can create a real, paid, confirmed reservation from this codebase, and
 * building one was explicitly out of scope. Rather than fabricate a
 * booking-confirmation response, this submits the complete structured
 * booking through the project's existing, real, working lead pipeline
 * (`submitRentalQuote` → `/api/rental-quote` → `createSalesforceLead`).
 * The reference number the visitor sees on `/rentals/confirmation` is the
 * real id that endpoint returns — genuinely real, honestly scoped as a
 * booking REQUEST for the rental team to confirm and process payment on,
 * never as a live paid Apprentall reservation. Swap this function's body
 * for a real `POST /api/bookings` (or direct Apprentall API integration)
 * once one exists — callers only depend on `CreateBookingResult`'s shape.
 */
export async function createBooking(state: RentalBookingState): Promise<CreateBookingResult> {
  const lines: string[] = ["Native rental booking request (Paradigm Fleet full-page booking flow)"];
  lines.push(`Pickup: ${locationLabel(state.pickupLocation)} — ${state.pickupDate} ${state.pickupTime}`.trim());
  lines.push(`Return: ${state.differentDropoff ? locationLabel(state.dropoffLocation) : locationLabel(state.pickupLocation)} — ${state.returnDate} ${state.returnTime}`.trim());
  if (state.age) lines.push(`Driver age band: ${state.age}`);
  if (state.promoCode) lines.push(`Promotion code: ${state.promoCode}`);
  lines.push(
    state.selectedAddonIds.length > 0 ? `Add-ons: ${state.selectedAddonIds.join(", ")}` : "Add-ons: none selected (add-on catalog not yet integrated)"
  );
  lines.push(state.selectedCoverageId ? `Coverage: ${state.selectedCoverageId}` : "Coverage: none selected (coverage catalog not yet integrated)");
  lines.push(
    `Primary driver license: DOB ${state.primaryLicense.dateOfBirth || "—"}, License # ${state.primaryLicense.licenseNumber || "—"}, Expiry ${state.primaryLicense.licenseExpiry || "—"}`
  );
  lines.push(
    `Address: ${state.address.address}, ${state.address.city}, ${state.address.province} ${state.address.postalCode}, ${state.address.country}`.trim()
  );
  if (state.additionalDriverEnabled) {
    lines.push(
      `Additional driver: ${state.additionalDriver.firstName} ${state.additionalDriver.lastName} — ${state.additionalDriver.email} — ${state.additionalDriver.phone}`.trim()
    );
  } else {
    lines.push("Additional driver: none");
  }
  const uploadedDocs = Object.entries(state.documents)
    .filter(([, slot]) => slot.fileName)
    .map(([key, slot]) => `${key}: ${slot.fileName}`);
  lines.push(uploadedDocs.length > 0 ? `Documents attached (pending secure upload integration): ${uploadedDocs.join(", ")}` : "Documents: none attached");
  lines.push(`Terms acknowledged: ${state.termsAccepted ? "yes" : "no"}`);
  lines.push("Payment: not processed — no payment provider connected yet, team to follow up to collect payment.");

  const response = await submitRentalQuote({
    contact: { firstName: state.contact.firstName, lastName: state.contact.lastName, email: state.contact.email, phone: state.contact.phone, companyName: "" },
    vehicleType: state.selectedVehicle?.name ?? "",
    durationInfo: { startDate: state.pickupDate, duration: "" },
    useCase: null,
    vehicleSlug: state.selectedVehicle?.slug ?? null,
    vehicleName: state.selectedVehicle?.name ?? null,
    message: lines.join("\n"),
  });

  return response.ok ? { ok: true, data: response.data } : { ok: false, error: response.error };
}
