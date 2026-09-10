"use client";

import { Button } from "@/components/ui/Button";
import { FeedbackCard } from "@/components/ui/FeedbackCard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { RENTAL_DURATION_OPTIONS, RENTAL_FLEET_CATEGORIES, EMPTY_RENTAL_CONTACT, EMPTY_RENTAL_DURATION } from "@/features/rental/config/rental.config";
import { hasErrors, validateContactStep } from "@/features/rental/lib/validateRentalFinder";
import { submitRentalQuote } from "@/features/rental/services/rental.service";
import type { RentalContact, RentalFinderDuration, StepErrors, SubmissionState } from "@/features/rental/types/rental.types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface RentalQuoteVehicleContext {
  slug: string;
  name: string;
  imageUrl?: string;
}

/**
 * Rental Reservation / Quote (design.md §7) — standalone lead capture,
 * reachable directly from the landing page or prefilled via
 * `?vehicle=<slug>` from a matched fleet result / the VDP, mirroring the
 * Payment Calculator / Trade-In's VDP-context-prefill convention.
 */
export function RentalQuoteClient({ vehicle }: { vehicle: RentalQuoteVehicleContext | null }) {
  const track = useTrackEvent();
  const [vehicleType, setVehicleType] = useState(vehicle ? "" : "");
  const [durationInfo, setDurationInfo] = useState<RentalFinderDuration>(EMPTY_RENTAL_DURATION);
  const [contact, setContact] = useState<RentalContact>(EMPTY_RENTAL_CONTACT);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<StepErrors & { vehicleType?: string }>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    track({ name: "rental_quote_view" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const contactErrors = validateContactStep(contact);
    const nextErrors: StepErrors & { vehicleType?: string } = { ...contactErrors };
    if (!vehicle && !vehicleType) nextErrors.vehicleType = "Select a vehicle type.";
    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }

    setSubmissionState("submitting");
    setSubmissionError(null);

    const response = await submitRentalQuote({
      contact,
      vehicleType: vehicle ? vehicle.name : vehicleType,
      durationInfo,
      useCase: null,
      vehicleSlug: vehicle?.slug ?? null,
      vehicleName: vehicle?.name ?? null,
      message,
    });

    if (response.ok) {
      setSubmissionState("success");
      setReferenceId(response.data.id);
      track({ name: "rental_quote_submitted" });
    } else {
      setSubmissionState("error");
      setSubmissionError(response.error);
    }
  };

  if (submissionState === "success") {
    return (
      <div className="container-page py-10">
        <div className="mx-auto max-w-xl rounded-[var(--radius-card)] border border-border bg-surface p-6">
          <FeedbackCard
            status="success"
            title="Callback request received"
            message={
              <>
                Our rental team will call you back shortly to get you booked.
                {referenceId && (
                  <>
                    {" "}
                    Reference: <span className="text-primary-black">{referenceId}</span>
                  </>
                )}
              </>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mx-auto flex max-w-xl flex-col gap-6 rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
        {vehicle && (
          <div className="flex items-center gap-3 rounded-[var(--radius-control)] bg-soft-gray p-3">
            {vehicle.imageUrl && (
              <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[6px] bg-border">
                <Image src={vehicle.imageUrl} alt={vehicle.name} fill sizes="64px" className="object-contain p-1" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-label-m truncate text-primary-black">{vehicle.name}</p>
              <p className="text-caption-s text-dark-neutral/60">Requesting a rental quote for this vehicle</p>
            </div>
          </div>
        )}

        {submissionState === "error" && (
          <FeedbackCard status="error" title="We couldn't submit your request" message={submissionError ?? "Please try again."} />
        )}

        {!vehicle && (
          <Select
            label="Vehicle Type"
            options={[{ label: "Select a type", value: "" }, ...RENTAL_FLEET_CATEGORIES.map((type) => ({ label: type, value: type }))]}
            value={vehicleType}
            error={errors.vehicleType}
            onChange={(event) => setVehicleType(event.target.value)}
          />
        )}

        <div className="flex flex-col gap-2">
          <span className="text-label-m text-primary-black">How Long Do You Need It?</span>
          <div role="radiogroup" aria-label="Rental duration" className="flex flex-wrap gap-2">
            {RENTAL_DURATION_OPTIONS.map((option) => {
              const selected = durationInfo.duration === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setDurationInfo((prev) => ({ ...prev, duration: option }))}
                  className={cn(
                    "focus-ring text-label-m flex h-11 items-center rounded-full border px-4 transition-colors duration-[var(--duration-micro)]",
                    selected
                      ? "border-primary-red bg-primary-red/5 text-primary-black"
                      : "border-border bg-surface text-dark-neutral/80 hover:border-primary-black/30"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <Input
          label="When Do You Need It? (optional)"
          type="date"
          value={durationInfo.startDate}
          onChange={(event) => setDurationInfo((prev) => ({ ...prev, startDate: event.target.value }))}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="First Name" value={contact.firstName} error={errors.firstName} onChange={(event) => setContact((prev) => ({ ...prev, firstName: event.target.value }))} />
          <Input label="Last Name" value={contact.lastName} error={errors.lastName} onChange={(event) => setContact((prev) => ({ ...prev, lastName: event.target.value }))} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Phone" type="tel" value={contact.phone} error={errors.phone} onChange={(event) => setContact((prev) => ({ ...prev, phone: event.target.value }))} />
          <Input label="Email" type="email" value={contact.email} error={errors.email} onChange={(event) => setContact((prev) => ({ ...prev, email: event.target.value }))} />
        </div>
        <Input label="Company Name (optional)" value={contact.companyName} onChange={(event) => setContact((prev) => ({ ...prev, companyName: event.target.value }))} />
        <Input label="Message (optional)" value={message} onChange={(event) => setMessage(event.target.value)} />

        <Button type="button" variant="primary" size="lg" className="w-full" disabled={submissionState === "submitting"} onClick={handleSubmit}>
          {submissionState === "submitting" ? "Submitting…" : "Request a Callback →"}
        </Button>
      </div>
    </div>
  );
}
