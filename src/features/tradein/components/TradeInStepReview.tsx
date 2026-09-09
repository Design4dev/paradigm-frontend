"use client";

import { Button } from "@/components/ui/Button";
import { FeedbackCard } from "@/components/ui/FeedbackCard";
import { SpinnerIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site.config";
import type {
  SubmissionState,
  TradeInConditionDetails,
  TradeInContact,
  TradeInPhoto,
  TradeInReplacementVehicle,
  TradeInVehicle,
} from "@/features/tradein/types/tradein.types";
import Link from "next/link";

function SummaryRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="text-body-m text-dark-neutral/60">{label}</span>
      <span className="text-label-m text-right text-primary-black">{value}</span>
    </div>
  );
}

interface TradeInStepReviewProps {
  vehicle: TradeInVehicle;
  condition: TradeInConditionDetails;
  contact: TradeInContact;
  photos: TradeInPhoto[];
  replacementVehicle?: TradeInReplacementVehicle | null;
  submissionState: SubmissionState;
  submissionError: string | null;
  referenceId: string | null;
  onBack: () => void;
  onSubmit: () => void;
  onEditStep: (step: "vehicle" | "condition" | "contact") => void;
}

/** Step 5 — Review, then Submit → Success/Error (§16–§19). Never fabricates an appraisal value (§17). */
export function TradeInStepReview({
  vehicle,
  condition,
  contact,
  photos,
  replacementVehicle,
  submissionState,
  submissionError,
  referenceId,
  onBack,
  onSubmit,
  onEditStep,
}: TradeInStepReviewProps) {
  if (submissionState === "success") {
    return (
      <FeedbackCard
        status="success"
        title="Appraisal Request Submitted"
        message={
          <>
            Thanks for sending your vehicle information. Our team will review the details and contact you{" "}
            {contact.contactMethod ? `by ${contact.contactMethod.toLowerCase()} ` : ""}
            regarding the appraisal.
            {referenceId && (
              <>
                <br />
                <span className="text-caption-s text-dark-neutral/50">Reference #{referenceId}</span>
              </>
            )}
          </>
        }
        action={
          <>
            <Link href="/vehicles" className="flex-1">
              <Button type="button" variant="primary" size="lg" className="w-full">
                Browse Vehicles
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button type="button" variant="secondary" size="lg" className="w-full">
                Return Home
              </Button>
            </Link>
            <a href={siteConfig.contact.phoneHref} className="flex-1">
              <Button type="button" variant="ghost" size="lg" className="w-full">
                Talk to Our Team
              </Button>
            </a>
          </>
        }
      />
    );
  }

  if (submissionState === "error") {
    return (
      <FeedbackCard
        status="error"
        title="We Couldn't Submit Your Request"
        message={submissionError ?? "Please review your information and try again."}
        action={
          <>
            <Button type="button" variant="primary" size="lg" onClick={onSubmit} className="flex-1">
              Try Again
            </Button>
            <a href={siteConfig.contact.phoneHref} className="flex-1">
              <Button type="button" variant="secondary" size="lg" className="w-full">
                Call Our Team
              </Button>
            </a>
          </>
        }
      />
    );
  }

  const vehicleLine = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");
  const submitting = submissionState === "submitting";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m">Review Your Appraisal Request</h2>
        <p className="text-body-m mt-1 text-dark-neutral/60">Check your details, then submit — our team will follow up with your appraisal.</p>
      </div>

      <div className="rounded-[var(--radius-control)] border border-border p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-label-m text-primary-black">Vehicle</p>
          <button type="button" onClick={() => onEditStep("vehicle")} className="focus-ring text-caption-s rounded text-primary-red hover:underline">
            Edit
          </button>
        </div>
        <div className="mt-1 divide-y divide-border">
          <SummaryRow label="VIN" value={vehicle.vin || undefined} />
          <SummaryRow label="Vehicle" value={vehicleLine || undefined} />
          <SummaryRow label="Type" value={vehicle.type || undefined} />
          <SummaryRow label="Condition" value={vehicle.condition || undefined} />
          <SummaryRow label="Horsepower" value={vehicle.horsepower || undefined} />
          <SummaryRow label="Hours" value={vehicle.hours || undefined} />
          <SummaryRow label="Asking Price" value={vehicle.price ? `$${vehicle.price}` : undefined} />
        </div>
      </div>

      <div className="rounded-[var(--radius-control)] border border-border p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-label-m text-primary-black">Condition</p>
          <button type="button" onClick={() => onEditStep("condition")} className="focus-ring text-caption-s rounded text-primary-red hover:underline">
            Edit
          </button>
        </div>
        <div className="mt-1 divide-y divide-border">
          <SummaryRow label="Exterior" value={condition.exterior || undefined} />
          <SummaryRow label="Interior" value={condition.interior || undefined} />
          <SummaryRow label="Mechanical" value={condition.mechanical || undefined} />
          <SummaryRow label="Tires" value={condition.tires || undefined} />
          <SummaryRow label="Mileage / Hours" value={condition.mileage || undefined} />
        </div>
        <p className="text-caption-s mt-2 text-dark-neutral/60">
          {photos.length > 0 ? `${photos.length} photo${photos.length === 1 ? "" : "s"} attached.` : "No photos attached."}
        </p>
      </div>

      <div className="rounded-[var(--radius-control)] border border-border p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-label-m text-primary-black">Contact</p>
          <button type="button" onClick={() => onEditStep("contact")} className="focus-ring text-caption-s rounded text-primary-red hover:underline">
            Edit
          </button>
        </div>
        <div className="mt-1 divide-y divide-border">
          <SummaryRow label="Name" value={`${contact.firstName} ${contact.lastName}`.trim() || undefined} />
          <SummaryRow label="Contact Me By" value={contact.contactMethod || undefined} />
          <SummaryRow label="Phone" value={contact.phone || undefined} />
          <SummaryRow label="Email" value={contact.email || undefined} />
        </div>
      </div>

      {replacementVehicle && (
        <div className="rounded-[var(--radius-control)] bg-soft-gray p-4">
          <p className="text-body-m text-dark-neutral/70">
            Trading toward <span className="text-label-m text-primary-black">{replacementVehicle.name}</span> ({replacementVehicle.priceLabel})
          </p>
        </div>
      )}

      <p className="text-caption-s text-dark-neutral/50">
        This is an appraisal request, not a guaranteed value. Our team will review your details and follow up with a real appraisal.
      </p>

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack} disabled={submitting}>
          ← Back
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <SpinnerIcon tone="white" className="h-4 w-4" /> Submitting…
            </>
          ) : (
            "Submit Appraisal Request"
          )}
        </Button>
      </div>
    </div>
  );
}
