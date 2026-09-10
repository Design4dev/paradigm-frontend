"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { InfoIcon, LockIcon } from "@/components/ui/Icons";
import { BookingStepFooter } from "@/features/rental/components/booking/BookingStepFooter";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { hasBookingErrors, validateTermsAcceptance } from "@/features/rental/lib/validateBooking";
import { processPayment } from "@/features/rental/services/rentalPayment.service";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import { useState } from "react";

/**
 * Step 04 — Payment (spec §25/§26/§32). A real, complete payment UI shell —
 * but no payment provider is connected, so nothing here ever processes a
 * charge. Card fields are local component state ONLY: never written into
 * `RentalBookingState`, never sent to `processPayment()` (which takes no
 * arguments and always resolves "not_configured"), never logged.
 *
 * Terms acceptance lives here (not a separate step — the spec's 5-stage
 * list doesn't include one) as the final gate before submitting.
 */
export function StepPayment({ onBack, onSubmitBooking, submitting }: { onBack: () => void; onSubmitBooking: () => void; submitting: boolean }) {
  const termsAccepted = useRentalBookingStore((s) => s.termsAccepted);
  const setTermsAccepted = useRentalBookingStore((s) => s.setTermsAccepted);
  const track = useTrackEvent();

  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "not_configured">("idle");
  const [termsError, setTermsError] = useState<string | undefined>();

  const handleCompletePayment = async () => {
    setStatus("checking");
    track({ name: "rental_payment_started" });
    const result = await processPayment();
    if (result.status === "not_configured") {
      setStatus("not_configured");
    }
  };

  const handleContinue = () => {
    const errors = validateTermsAcceptance({ termsAccepted });
    if (hasBookingErrors(errors)) {
      setTermsError(errors.termsAccepted);
      return;
    }
    setTermsError(undefined);
    onSubmitBooking();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-heading-m text-primary-black">Payment</h2>
        <p className="text-body-m mt-1 text-dark-neutral/70">Final pricing and charges are confirmed by our rental team.</p>
      </div>

      <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-border bg-soft-gray p-4">
        <LockIcon className="mt-0.5 h-5 w-5 shrink-0 text-dark-neutral/50" />
        <p className="text-body-m text-dark-neutral/70">
          Your card details stay on this device and are never saved or sent until a secure payment connection is active. Nothing is charged by
          filling in this form.
        </p>
      </div>

      <fieldset className="flex flex-col gap-4" disabled={status === "not_configured"}>
        <legend className="text-label-m text-primary-black">Payment Method — Credit/Debit Card</legend>
        <Input label="Cardholder Name" autoComplete="cc-name" value={cardholder} onChange={(e) => setCardholder(e.target.value)} />
        <Input label="Card Number" inputMode="numeric" autoComplete="cc-number" placeholder="•••• •••• •••• ••••" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Expiry (MM/YY)" autoComplete="cc-exp" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
          <Input label="CVC" inputMode="numeric" autoComplete="cc-csc" placeholder="•••" value={cvc} onChange={(e) => setCvc(e.target.value)} />
        </div>
      </fieldset>

      {status === "not_configured" && (
        <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-primary-red/30 bg-primary-red/5 p-4">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-red" />
          <p className="text-body-m text-primary-black">
            Online payment isn&apos;t connected yet — your card has not been charged. Continue, and our rental team will call you to collect
            payment when they confirm your booking.
          </p>
        </div>
      )}

      <div className="border-t border-border pt-5">
        <Checkbox
          label="I have read and agree to the rental terms & conditions."
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        {termsError && <p className="text-caption-s mt-1 text-primary-red">{termsError}</p>}
      </div>

      <BookingStepFooter
        onBack={onBack}
        onNext={status === "not_configured" ? handleContinue : handleCompletePayment}
        nextLabel={status === "not_configured" ? "Continue Without Paying Online →" : "Complete Payment"}
        nextLoading={status === "checking" || submitting}
      />
    </div>
  );
}
