"use client";

import { TradeInAdvantage } from "@/features/tradein/components/TradeInAdvantage";
import { TradeInFinalCTA } from "@/features/tradein/components/TradeInFinalCTA";
import { TradeInHero } from "@/features/tradein/components/TradeInHero";
import { TradeInStepCondition } from "@/features/tradein/components/TradeInStepCondition";
import { TradeInStepContact } from "@/features/tradein/components/TradeInStepContact";
import { TradeInStepPhotos } from "@/features/tradein/components/TradeInStepPhotos";
import { TradeInStepReview } from "@/features/tradein/components/TradeInStepReview";
import { TradeInStepVehicle } from "@/features/tradein/components/TradeInStepVehicle";
import { TradeInStepper } from "@/features/tradein/components/TradeInStepper";
import { TradeInWhyUs } from "@/features/tradein/components/TradeInWhyUs";
import {
  EMPTY_TRADE_IN_CONDITION,
  EMPTY_TRADE_IN_CONTACT,
  EMPTY_TRADE_IN_VEHICLE,
} from "@/features/tradein/config/tradein.config";
import { useTradeInPhotos } from "@/features/tradein/lib/useTradeInPhotos";
import { validateConditionStep, validateContactStep, validateVehicleStep, hasErrors } from "@/features/tradein/lib/validateTradeIn";
import { submitTradeIn } from "@/features/tradein/services/tradein.service";
import type {
  StepErrors,
  SubmissionState,
  TradeInConditionDetails,
  TradeInContact,
  TradeInReplacementVehicle,
  TradeInStep,
  TradeInVehicle,
  VehicleLookupMode,
} from "@/features/tradein/types/tradein.types";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { useEffect, useRef, useState } from "react";

const STEP_INDEX: Record<TradeInStep, number> = { vehicle: 1, condition: 2, photos: 3, contact: 4, review: 5 };

/**
 * Trade-In Appraisal orchestrator (page-05-trade-in-appraisal.md §9/§21) —
 * owns the single shared form state across all 5 steps, mirroring
 * PaymentCalculatorClient's architecture (one state object, a persistent
 * sidebar card, the same step-gating rules).
 */
export function TradeInClient({ initialReplacementVehicle }: { initialReplacementVehicle: TradeInReplacementVehicle | null }) {
  const track = useTrackEvent();

  const [step, setStep] = useState<TradeInStep>("vehicle");
  const [furthestIndex, setFurthestIndex] = useState(1);
  const [mode, setMode] = useState<VehicleLookupMode>("vin");
  const [vehicle, setVehicle] = useState<TradeInVehicle>(EMPTY_TRADE_IN_VEHICLE);
  const [condition, setCondition] = useState<TradeInConditionDetails>(EMPTY_TRADE_IN_CONDITION);
  const [contact, setContact] = useState<TradeInContact>(EMPTY_TRADE_IN_CONTACT);
  const [errors, setErrors] = useState<StepErrors>({});
  const [replacementVehicle, setReplacementVehicle] = useState(initialReplacementVehicle);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const { photos, addFiles, removePhoto, retryPhoto } = useTradeInPhotos();

  // A fresh `?vehicle=` navigation (or its absence) changes the VDP
  // replacement-vehicle context — adjusting state in response to a changed
  // prop belongs in render, not an effect, per PaymentCalculatorClient's
  // same pattern.
  const [trackedSlug, setTrackedSlug] = useState(initialReplacementVehicle?.slug ?? null);
  if ((initialReplacementVehicle?.slug ?? null) !== trackedSlug) {
    setTrackedSlug(initialReplacementVehicle?.slug ?? null);
    setReplacementVehicle(initialReplacementVehicle);
  }

  useEffect(() => {
    track({ name: "trade_in_view" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fires once, the first time the visitor puts anything into the form —
  // not on every field/mode toggle.
  const startedRef = useRef(false);
  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track({ name: "trade_in_started" });
  };

  const updateVehicle = (patch: Partial<TradeInVehicle>) => {
    markStarted();
    setVehicle((prev) => ({ ...prev, ...patch }));
  };
  const updateCondition = (patch: Partial<TradeInConditionDetails>) => setCondition((prev) => ({ ...prev, ...patch }));
  const updateContact = (patch: Partial<TradeInContact>) => setContact((prev) => ({ ...prev, ...patch }));

  // Leaving Review after a submission error (to fix something and come
  // back) must clear the stale error/pending state — otherwise re-reaching
  // "review" re-shows the old error card instead of the submit form.
  const clearStaleSubmission = (target: TradeInStep) => {
    if (target !== "review" && submissionState !== "idle") {
      setSubmissionState("idle");
      setSubmissionError(null);
    }
  };

  const goToStep = (target: TradeInStep) => {
    if (STEP_INDEX[target] <= furthestIndex) {
      setErrors({});
      clearStaleSubmission(target);
      setStep(target);
    }
  };

  const advanceTo = (target: TradeInStep) => {
    setErrors({});
    clearStaleSubmission(target);
    setStep(target);
    setFurthestIndex((prev) => Math.max(prev, STEP_INDEX[target]));
  };

  const goBackFrom = (target: TradeInStep) => {
    setErrors({});
    clearStaleSubmission(target);
    setStep(target);
  };

  const handleVehicleNext = () => {
    const stepErrors = validateVehicleStep(vehicle, mode);
    if (hasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }
    track({ name: "trade_in_vehicle_step_completed" });
    advanceTo("condition");
  };

  const handleConditionNext = () => {
    const stepErrors = validateConditionStep(condition);
    if (hasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }
    track({ name: "trade_in_condition_step_completed" });
    advanceTo("photos");
  };

  const handleContactNext = () => {
    const stepErrors = validateContactStep(contact);
    if (hasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }
    track({ name: "trade_in_contact_step_completed" });
    advanceTo("review");
  };

  const handleSubmit = async () => {
    // Defensive re-validation — a visitor can reach Review by clicking back
    // into an earlier step via the stepper without re-running that step's
    // own "Next" validation.
    const vehicleErrors = validateVehicleStep(vehicle, mode);
    const conditionErrors = validateConditionStep(condition);
    const contactErrors = validateContactStep(contact);

    if (hasErrors(vehicleErrors)) {
      setErrors(vehicleErrors);
      goBackFrom("vehicle");
      return;
    }
    if (hasErrors(conditionErrors)) {
      setErrors(conditionErrors);
      goBackFrom("condition");
      return;
    }
    if (hasErrors(contactErrors)) {
      setErrors(contactErrors);
      goBackFrom("contact");
      return;
    }

    setSubmissionState("submitting");
    setSubmissionError(null);
    track({ name: "trade_in_submitted" });

    const response = await submitTradeIn({
      vehicle,
      condition,
      contact,
      photos: photos.filter((photo) => photo.status === "uploaded").map((photo) => ({ category: photo.category, fileName: photo.fileName })),
      replacementVehicle: replacementVehicle
        ? { slug: replacementVehicle.slug, name: replacementVehicle.name, priceLabel: replacementVehicle.priceLabel }
        : null,
    });

    if (response.ok) {
      setSubmissionState("success");
      setReferenceId(response.data.id);
      track({ name: "trade_in_submission_success" });
    } else {
      setSubmissionState("error");
      setSubmissionError(response.error);
      track({ name: "trade_in_submission_error" });
    }
  };

  return (
    <div className="pb-16">
      <TradeInHero />

      <div className="container-page grid grid-cols-1 gap-8 py-8 sm:py-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <TradeInStepper currentStep={step} furthestIndex={furthestIndex} onStepClick={goToStep} />

          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
            {step === "vehicle" && (
              <TradeInStepVehicle vehicle={vehicle} errors={errors} mode={mode} onModeChange={setMode} onFieldChange={updateVehicle} onNext={handleVehicleNext} />
            )}
            {step === "condition" && (
              <TradeInStepCondition condition={condition} errors={errors} onFieldChange={updateCondition} onBack={() => goBackFrom("vehicle")} onNext={handleConditionNext} />
            )}
            {step === "photos" && (
              <TradeInStepPhotos
                photos={photos}
                onAddFiles={addFiles}
                onRemove={removePhoto}
                onRetry={retryPhoto}
                onBack={() => goBackFrom("condition")}
                onNext={() => advanceTo("contact")}
              />
            )}
            {step === "contact" && (
              <TradeInStepContact contact={contact} errors={errors} onFieldChange={updateContact} onBack={() => goBackFrom("photos")} onNext={handleContactNext} />
            )}
            {step === "review" && (
              <TradeInStepReview
                vehicle={vehicle}
                condition={condition}
                contact={contact}
                photos={photos}
                replacementVehicle={replacementVehicle}
                submissionState={submissionState}
                submissionError={submissionError}
                referenceId={referenceId}
                onBack={() => goBackFrom("contact")}
                onSubmit={handleSubmit}
                onEditStep={goToStep}
              />
            )}
          </div>

          {/* Mobile/tablet: the same persistent advantage card, in-flow below the form (§9/§24). */}
          <div className="lg:hidden">
            <TradeInAdvantage replacementVehicle={replacementVehicle} />
          </div>
        </div>

        <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <TradeInAdvantage replacementVehicle={replacementVehicle} />
        </div>
      </div>

      <TradeInWhyUs />
      <TradeInFinalCTA />
    </div>
  );
}
