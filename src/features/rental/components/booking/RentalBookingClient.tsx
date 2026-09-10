"use client";

import { FeedbackCard } from "@/components/ui/FeedbackCard";
import { buttonClassName } from "@/components/ui/Button";
import { BookingStepper } from "@/features/rental/components/booking/BookingStepper";
import { BookingSummarySidebar } from "@/features/rental/components/booking/BookingSummarySidebar";
import { StepAddons } from "@/features/rental/components/booking/steps/StepAddons";
import { StepCoverage } from "@/features/rental/components/booking/steps/StepCoverage";
import { StepInformation } from "@/features/rental/components/booking/steps/StepInformation";
import { StepPayment } from "@/features/rental/components/booking/steps/StepPayment";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { createBooking } from "@/features/rental/services/rentalBooking.service";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Booking Process (spec §17-§26) — a full page, never a modal/popup/iframe.
 * Guards against a direct/refreshed visit with no selected vehicle by
 * redirecting back to `/rentals/search`. Steps live in-page (client-side
 * step transitions via the store, no route change) until Payment succeeds,
 * at which point the visitor is sent to the dedicated `/rentals/confirmation`
 * route — never rendered here directly, so a stale/refreshed booking page
 * can't show a fake "confirmed" state.
 */
export function RentalBookingClient() {
  const state = useRentalBookingStore((s) => s);
  const advanceFrom = useRentalBookingStore((s) => s.advanceFrom);
  const goBackFrom = useRentalBookingStore((s) => s.goBackFrom);
  const goToStep = useRentalBookingStore((s) => s.goToStep);
  const setSubmission = useRentalBookingStore((s) => s.setSubmission);
  const track = useTrackEvent();
  const router = useRouter();

  useEffect(() => {
    if (!state.selectedVehicle) router.replace("/rentals/search");
  }, [state.selectedVehicle, router]);

  if (!state.selectedVehicle) return null;

  const handleSubmitBooking = async () => {
    setSubmission({ status: "submitting", error: null });
    const result = await createBooking(state);
    if (result.ok) {
      setSubmission({ status: "success", referenceId: result.data.id, error: null });
      track({ name: "rental_payment_success" });
      track({ name: "rental_booking_completed", referenceId: result.data.id });
      router.push("/rentals/confirmation");
    } else {
      setSubmission({ status: "error", error: result.error });
      track({ name: "rental_payment_failure" });
    }
  };

  return (
    <div className="container-page flex flex-col gap-6 py-8 sm:py-10">
      <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[6px] bg-soft-gray">
            <Image src={state.selectedVehicle.image.url} alt={state.selectedVehicle.image.alt} fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-label-m truncate text-primary-black">{state.selectedVehicle.name}</p>
            <p className="text-caption-s truncate text-dark-neutral/60">
              {state.pickupDate || "—"} {state.pickupTime} → {state.returnDate || "—"} {state.returnTime}
            </p>
          </div>
        </div>
        <Link href="/rentals/search/results" className={buttonClassName({ variant: "ghost", size: "md" })}>
          ← Back to Results
        </Link>
      </div>

      <BookingStepper current={state.currentStep} furthestStepIndex={state.furthestStepIndex} onStepClick={goToStep} />

      {state.submission.status === "error" && (
        <FeedbackCard status="error" title="We couldn't submit your booking" message={state.submission.error ?? "Please try again."} />
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
          {state.currentStep === "addons" && <StepAddons onNext={() => advanceFrom("addons")} />}
          {state.currentStep === "coverage" && <StepCoverage onBack={() => goBackFrom("coverage")} onNext={() => advanceFrom("coverage")} />}
          {state.currentStep === "information" && <StepInformation onBack={() => goBackFrom("information")} onNext={() => advanceFrom("information")} />}
          {state.currentStep === "payment" && (
            <StepPayment onBack={() => goBackFrom("payment")} onSubmitBooking={handleSubmitBooking} submitting={state.submission.status === "submitting"} />
          )}
        </div>

        <BookingSummarySidebar />
      </div>
    </div>
  );
}
