"use client";

import { CalculatorHero } from "@/features/finance/components/CalculatorHero";
import { CalculatorStepper } from "@/features/finance/components/CalculatorStepper";
import { CalculatorStep1 } from "@/features/finance/components/CalculatorStep1";
import { CalculatorStep2 } from "@/features/finance/components/CalculatorStep2";
import { CalculatorStep3 } from "@/features/finance/components/CalculatorStep3";
import { CalculatorSummary } from "@/features/finance/components/CalculatorSummary";
import { CalculatorSupportingSection } from "@/features/finance/components/CalculatorSupportingSection";
import { calculatorDefaults } from "@/features/finance/config/calculator.config";
import { calculatePayment } from "@/features/finance/lib/calculatePayment";
import { validateStep1, validateStep2, hasErrors } from "@/features/finance/lib/validateCalculator";
import type { CalculatorInput, CalculatorMode, CalculatorStep, StepErrors } from "@/features/finance/types/calculator.types";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import { useDebounce } from "@/hooks/useDebounce";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import { useMemo, useState } from "react";

function buildInitialInput(vehicle: Vehicle | null): CalculatorInput {
  return { ...calculatorDefaults, vehiclePrice: vehicle ? String(vehicle.price) : "" };
}

/**
 * Payment Calculator orchestrator (page-04-payment-calculator.md §9/§38).
 * Owns the single shared calculator state — the summary panel is computed
 * from this same state regardless of which step is showing, so it can stay
 * "persistent" on desktop rather than only appearing at Review.
 */
export function PaymentCalculatorClient({ initialVehicle }: { initialVehicle: Vehicle | null }) {
  const { openQuote } = useQuote();

  const [input, setInput] = useState<CalculatorInput>(() => buildInitialInput(initialVehicle));
  const [step, setStep] = useState<CalculatorStep>(1);
  const [furthestStep, setFurthestStep] = useState<CalculatorStep>(1);
  const [errors, setErrors] = useState<StepErrors>({});
  const [vehicle, setVehicle] = useState<Vehicle | null>(initialVehicle);

  // VDP context changed (a fresh `?vehicle=` navigation, or "Change Vehicle"
  // clearing it) — reset to reflect the new source of truth. Adjusting state
  // in response to a changed prop belongs in render, not an effect — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [trackedSlug, setTrackedSlug] = useState(initialVehicle?.slug ?? null);
  if ((initialVehicle?.slug ?? null) !== trackedSlug) {
    setTrackedSlug(initialVehicle?.slug ?? null);
    setVehicle(initialVehicle);
    setInput(buildInitialInput(initialVehicle));
    setStep(1);
    setFurthestStep(1);
    setErrors({});
  }

  // Cosmetic "Calculating…" transition (§17/§34) — the calculation itself is
  // synchronous/instant; this just avoids the result snapping on every
  // keystroke the way a live-typed CurrencyInput otherwise would.
  const [version, setVersion] = useState(0);
  const debouncedVersion = useDebounce(version, 220);
  const isCalculating = version !== debouncedVersion;

  const result = useMemo(() => calculatePayment(input), [input]);

  const updateInput = (patch: Partial<CalculatorInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
    setVersion((v) => v + 1);
  };

  const changeMode = (mode: CalculatorMode) => {
    updateInput({ mode });
    setErrors({});
  };

  const goNext = () => {
    if (step === 1) {
      const stepErrors = validateStep1(input);
      if (hasErrors(stepErrors)) {
        setErrors(stepErrors);
        return;
      }
      setErrors({});
      setStep(2);
      setFurthestStep((prev) => (prev < 2 ? 2 : prev));
    } else if (step === 2) {
      const stepErrors = validateStep2(input);
      if (hasErrors(stepErrors)) {
        setErrors(stepErrors);
        return;
      }
      setErrors({});
      setStep(3);
      setFurthestStep((prev) => (prev < 3 ? 3 : prev));
    }
  };

  const goBack = () => {
    setErrors({});
    setStep((prev) => (prev > 1 ? ((prev - 1) as CalculatorStep) : prev));
  };

  const goToStep = (target: CalculatorStep) => {
    if (target <= furthestStep && target !== step) {
      setErrors({});
      setStep(target);
    }
  };

  const resetCalculator = () => {
    setInput(buildInitialInput(vehicle));
    setStep(1);
    setFurthestStep(1);
    setErrors({});
    setVersion((v) => v + 1);
  };

  const talkToFinance = () => {
    openQuote(
      vehicle ? { slug: vehicle.slug, name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`, stockNumber: vehicle.stockNumber, priceLabel: vehicle.priceLabel } : undefined
    );
  };

  const hasEnteredData = input.mode === "vehiclePrice" ? input.vehiclePrice.trim() !== "" : input.targetPayment.trim() !== "";

  return (
    <div className="pb-16">
      <CalculatorHero />

      <div className="container-page grid grid-cols-1 gap-8 py-8 sm:py-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <CalculatorStepper currentStep={step} furthestStep={furthestStep} onStepClick={goToStep} />

          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
            {step === 1 && (
              <CalculatorStep1
                input={input}
                errors={errors}
                vehicle={vehicle}
                onModeChange={changeMode}
                onFieldChange={updateInput}
                onNext={goNext}
                onReset={resetCalculator}
              />
            )}
            {step === 2 && <CalculatorStep2 input={input} errors={errors} onFieldChange={updateInput} onBack={goBack} onNext={goNext} />}
            {step === 3 && <CalculatorStep3 result={result} onAdjust={goBack} onTalkToFinance={talkToFinance} />}
          </div>

          {/* Mobile/tablet: the persistent panel becomes an in-flow card once there's something to show (§9/§30). */}
          {hasEnteredData && (
            <div className="lg:hidden">
              <CalculatorSummary vehicle={vehicle} result={result} isCalculating={isCalculating} compact onTalkToFinance={talkToFinance} />
            </div>
          )}
        </div>

        <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <CalculatorSummary vehicle={vehicle} result={result} isCalculating={isCalculating} onTalkToFinance={talkToFinance} />
        </div>
      </div>

      <CalculatorSupportingSection />
    </div>
  );
}
