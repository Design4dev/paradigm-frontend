"use client";

import { RentalFinderResults } from "@/features/rental/components/RentalFinderResults";
import { RentalFinderStepUseCase } from "@/features/rental/components/RentalFinderStepUseCase";
import { RentalFinderStepVehicleType } from "@/features/rental/components/RentalFinderStepVehicleType";
import { RentalFinderStepper } from "@/features/rental/components/RentalFinderStepper";
import { EMPTY_RENTAL_VEHICLE } from "@/features/rental/config/rental.config";
import type { RentalFinderStep, RentalFinderVehicle, RentalUseCase } from "@/features/rental/types/rental.types";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { useEffect, useState } from "react";

const STEP_INDEX: Record<RentalFinderStep, number> = { "vehicle-type": 1, "use-case": 2, results: 3 };

/**
 * Guided rental category recommender (spec §8, full-page rebuild pass).
 * 3 steps: Vehicle Type → What You Need → Recommendation. This is purely a
 * discovery/recommendation tool — the result hands off to
 * `/rentals/search`, the same Reservation Search every other "Rent It"
 * uses (`RentalVehicleCard`'s default `destination`), so timing and
 * contact are collected exactly once, never duplicated here.
 */
export function RentalFinderClient() {
  const track = useTrackEvent();

  const [step, setStep] = useState<RentalFinderStep>("vehicle-type");
  const [furthestIndex, setFurthestIndex] = useState(1);
  const [useCase, setUseCase] = useState<RentalUseCase | null>(null);
  const [vehicle, setVehicle] = useState<RentalFinderVehicle>(EMPTY_RENTAL_VEHICLE);

  useEffect(() => {
    track({ name: "rental_finder_started" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToStep = (target: RentalFinderStep) => {
    if (STEP_INDEX[target] <= furthestIndex) {
      setStep(target);
    }
  };
  const advanceTo = (target: RentalFinderStep) => {
    setStep(target);
    setFurthestIndex((prev) => Math.max(prev, STEP_INDEX[target]));
  };
  const goBackFrom = (target: RentalFinderStep) => {
    setStep(target);
  };

  const handleVehicleTypeNext = () => {
    if (!vehicle.type) return;
    advanceTo("use-case");
  };

  const handleUseCaseNext = () => {
    if (!useCase) return;
    track({ name: "rental_finder_completed" });
    advanceTo("results");
  };

  return (
    <div className="container-page flex flex-col gap-6 py-8 sm:py-10">
      <RentalFinderStepper currentStep={step} furthestIndex={furthestIndex} onStepClick={goToStep} />

      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
        {step === "vehicle-type" && (
          <RentalFinderStepVehicleType
            value={vehicle.type}
            onChange={(type) => setVehicle({ type })}
            onNext={handleVehicleTypeNext}
          />
        )}
        {step === "use-case" && (
          <RentalFinderStepUseCase
            useCase={useCase}
            onChange={setUseCase}
            onBack={() => goBackFrom("vehicle-type")}
            onNext={handleUseCaseNext}
          />
        )}
        {step === "results" && <RentalFinderResults vehicleType={vehicle.type} onEditSelection={() => goBackFrom("vehicle-type")} />}
      </div>
    </div>
  );
}
