"use client";

import { Button } from "@/components/ui/Button";
import { FeedbackCard } from "@/components/ui/FeedbackCard";
import { BookingStepper } from "@/features/rental/components/booking/BookingStepper";
import { ConfirmationSoundControl } from "@/features/rental/components/booking/ConfirmationSoundControl";
import { BOOKING_LOCATIONS } from "@/features/rental/config/booking.config";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function locationLabel(value: string): string {
  return BOOKING_LOCATIONS.find((loc) => loc.value === value)?.label ?? value;
}

/**
 * Confirmation (spec §27) — its own route, only ever reachable via a
 * real router push from `RentalBookingClient` after `createBooking()`
 * genuinely succeeds (spec §41: "never show 'Booking Confirmed' without a
 * real successful booking response"). A direct/refreshed visit with no
 * recorded success redirects back to `/rentals` rather than faking one.
 */
export function BookingConfirmationView() {
  const state = useRentalBookingStore((s) => s);
  const reset = useRentalBookingStore((s) => s.reset);
  const router = useRouter();

  useEffect(() => {
    if (state.submission.status !== "success") router.replace("/rentals");
  }, [state.submission.status, router]);

  if (state.submission.status !== "success") return null;

  const handleBackToRentals = () => {
    reset();
    router.push("/rentals");
  };

  return (
    <div className="container-page flex flex-col gap-6 py-8 sm:py-10">
      <BookingStepper current="confirmation" furthestStepIndex={5} />

      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <FeedbackCard status="success" title="Booking Confirmed" message="Our rental team will confirm your reservation and follow up to collect payment." />

        <ConfirmationSoundControl armed={state.submission.status === "success"} />

        <div className="flex flex-col divide-y divide-border rounded-[var(--radius-card)] border border-border">
          {state.submission.referenceId && (
            <div className="p-4">
              <p className="text-caption-s text-dark-neutral/50">Confirmation / Reservation Number</p>
              <p className="text-label-m text-primary-black">{state.submission.referenceId}</p>
            </div>
          )}
          <div className="p-4">
            <p className="text-caption-s text-dark-neutral/50">Vehicle</p>
            <p className="text-label-m text-primary-black">{state.selectedVehicle?.name ?? "—"}</p>
          </div>
          <div className="p-4">
            <p className="text-caption-s text-dark-neutral/50">Pickup</p>
            <p className="text-label-m text-primary-black">
              {locationLabel(state.pickupLocation)} — {state.pickupDate} {state.pickupTime}
            </p>
          </div>
          <div className="p-4">
            <p className="text-caption-s text-dark-neutral/50">Return</p>
            <p className="text-label-m text-primary-black">
              {state.differentDropoff ? locationLabel(state.dropoffLocation) : locationLabel(state.pickupLocation)} — {state.returnDate} {state.returnTime}
            </p>
          </div>
          <div className="p-4">
            <p className="text-caption-s text-dark-neutral/50">Customer</p>
            <p className="text-label-m text-primary-black">
              {state.contact.firstName} {state.contact.lastName} — {state.contact.email}
            </p>
          </div>
          <div className="p-4">
            <p className="text-caption-s text-dark-neutral/50">Payment</p>
            <p className="text-label-m text-primary-black">Confirmed by our rental team</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="primary" size="lg" className="flex-1" onClick={handleBackToRentals}>
            Back to Rentals
          </Button>
          <Button type="button" variant="secondary" size="lg" className="flex-1" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
