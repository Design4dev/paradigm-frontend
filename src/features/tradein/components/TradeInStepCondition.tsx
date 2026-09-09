"use client";

import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CONDITION_RATING_OPTIONS } from "@/features/tradein/config/tradein.config";
import type { StepErrors, TradeInConditionDetails } from "@/features/tradein/types/tradein.types";

const RATING_OPTIONS = [{ label: "Select condition", value: "" }, ...CONDITION_RATING_OPTIONS.map((value) => ({ label: value, value }))];

interface TradeInStepConditionProps {
  condition: TradeInConditionDetails;
  errors: StepErrors;
  onFieldChange: (patch: Partial<TradeInConditionDetails>) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Step 2 — Vehicle Condition (§12/§13): rated groups plus optional free-text notes. */
export function TradeInStepCondition({ condition, errors, onFieldChange, onBack, onNext }: TradeInStepConditionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m">Vehicle Condition</h2>
        <p className="text-body-m mt-1 text-dark-neutral/60">Help us understand the current condition — this keeps your appraisal accurate.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Exterior (body, paint, rust, dents/scratches)"
          options={RATING_OPTIONS}
          value={condition.exterior}
          onChange={(event) => onFieldChange({ exterior: event.target.value })}
          error={errors.exterior}
        />
        <Select
          label="Interior (seats, dashboard, flooring/cargo area)"
          options={RATING_OPTIONS}
          value={condition.interior}
          onChange={(event) => onFieldChange({ interior: event.target.value })}
          error={errors.interior}
        />
        <Select
          label="Mechanical (engine, transmission, warning lights)"
          options={RATING_OPTIONS}
          value={condition.mechanical}
          onChange={(event) => onFieldChange({ mechanical: event.target.value })}
          error={errors.mechanical}
        />
        <Select
          label="Tires"
          options={RATING_OPTIONS}
          value={condition.tires}
          onChange={(event) => onFieldChange({ tires: event.target.value })}
          error={errors.tires}
        />
      </div>

      <Input
        label="Mileage / Hours"
        placeholder="e.g. 85,000 km or 3,200 hrs"
        value={condition.mileage}
        onChange={(event) => onFieldChange({ mileage: event.target.value })}
        error={errors.mileage}
      />

      <Textarea
        label="Tell us anything else about the vehicle"
        placeholder="Repairs, known issues, modifications, accident history, service history, upfitting/accessories…"
        rows={4}
        value={condition.notes}
        onChange={(event) => onFieldChange({ notes: event.target.value })}
        error={errors.notes}
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onNext}>
          Next Step →
        </Button>
      </div>
    </div>
  );
}
