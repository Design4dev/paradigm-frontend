"use client";

import { Button } from "@/components/ui/Button";
import { ConfirmationSound } from "@/features/rental/components/booking/ConfirmationSound";
import { SuccessIcon } from "@/features/rental/components/booking/SuccessIcon";
import { BOOKING_LOCATIONS } from "@/features/rental/config/booking.config";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function locationLabel(value: string): string {
  return BOOKING_LOCATIONS.find((loc) => loc.value === value)?.label ?? value;
}

/**
 * Confirmation (spec §27; booking confirmation refinement pass) — its own
 * route, only ever reachable via a real router push from
 * `RentalBookingClient` after `createBooking()` genuinely succeeds (spec
 * §41: "never show 'Booking Confirmed' without a real successful booking
 * response"). A direct/refreshed visit with no recorded success redirects
 * back to `/rentals` rather than faking one.
 *
 * A standalone success state, not another step in the booking process: the
 * progress stepper is deliberately never rendered here (it's a one-way
 * destination, not a step the visitor "continues" from), and the whole
 * content column collapses gracefully into that space rather than leaving
 * a gap — there is no reserved slot for the stepper to begin with.
 *
 * Hierarchy is a deliberate top-to-bottom sequence: success icon → heading
 * → short supporting message → reservation summary → actions — see
 * `SuccessIcon` for the one-shot icon animation and `ConfirmationSound` for
 * the (silent-render, autoplay-once) confirmation chime. Both mount only
 * here, only once `state.submission.status === "success"`, and neither
 * re-fires on a re-render of this same success state.
 */
export function BookingConfirmationView() {
  const state = useRentalBookingStore((s) => s);
  const reset = useRentalBookingStore((s) => s.reset);
  const router = useRouter();

  const confirmed = state.submission.status === "success";

  useEffect(() => {
    if (!confirmed) router.replace("/rentals");
  }, [confirmed, router]);

  if (!confirmed) return null;

  const handleBackToRentals = () => {
    reset();
    router.push("/rentals");
  };

  return (
    <div className="container-page py-12 sm:py-16">
      <ConfirmationSound armed={confirmed} />

      <div className="mx-auto flex w-full max-w-xl flex-col items-center">
        <SuccessIcon />

        <h1 className="text-heading-l mt-6 text-center text-primary-black">Booking Confirmed</h1>
        <p className="text-body-m mt-3 max-w-sm text-center text-dark-neutral/70">
          Our rental team will confirm your reservation and follow up to collect payment.
        </p>

        <div className="mt-10 w-full rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-7">
          {state.submission.referenceId && (
            <div className="mb-6 border-b border-border pb-6">
              <p className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/50">Confirmation / Reservation Number</p>
              <p className="text-heading-m mt-1.5 break-words text-primary-black">{state.submission.referenceId}</p>
            </div>
          )}

          <dl className="flex flex-col gap-5">
            <div>
              <dt className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/50">Vehicle</dt>
              <dd className="text-body-m mt-1.5 break-words font-semibold text-primary-black">{state.selectedVehicle?.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/50">Pickup</dt>
              <dd className="text-body-m mt-1.5 break-words text-primary-black">
                {locationLabel(state.pickupLocation)} — {state.pickupDate} {state.pickupTime}
              </dd>
            </div>
            <div>
              <dt className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/50">Return</dt>
              <dd className="text-body-m mt-1.5 break-words text-primary-black">
                {state.differentDropoff ? locationLabel(state.dropoffLocation) : locationLabel(state.pickupLocation)} — {state.returnDate} {state.returnTime}
              </dd>
            </div>
            <div>
              <dt className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/50">Customer</dt>
              <dd className="text-body-m mt-1.5 break-words text-primary-black">
                {state.contact.firstName} {state.contact.lastName} — {state.contact.email}
              </dd>
            </div>
            <div>
              <dt className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/50">Payment</dt>
              <dd className="text-body-m mt-1.5 break-words text-primary-black">Confirmed by our rental team</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
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
