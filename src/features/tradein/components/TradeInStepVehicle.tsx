"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CurrencyInput } from "@/features/finance/components/CurrencyInput";
import { CONDITION_OPTIONS, EQUIPMENT_TYPE, TRADE_IN_TYPE_OPTIONS } from "@/features/tradein/config/tradein.config";
import type { StepErrors, TradeInVehicle, VehicleLookupMode } from "@/features/tradein/types/tradein.types";
import { cn } from "@/lib/utils";

const TYPE_OPTIONS = [{ label: "Select a type", value: "" }, ...TRADE_IN_TYPE_OPTIONS.map((value) => ({ label: value, value }))];
const CONDITION_SELECT_OPTIONS = [
  { label: "Select a condition", value: "" },
  ...CONDITION_OPTIONS.map((value) => ({ label: value, value })),
];

interface TradeInStepVehicleProps {
  vehicle: TradeInVehicle;
  errors: StepErrors;
  mode: VehicleLookupMode;
  onModeChange: (mode: VehicleLookupMode) => void;
  onFieldChange: (patch: Partial<TradeInVehicle>) => void;
  onNext: () => void;
}

/** Step 1 — Vehicle Information (§10/§11): VIN lookup or manual entry, always with manual entry available. */
export function TradeInStepVehicle({ vehicle, errors, mode, onModeChange, onFieldChange, onNext }: TradeInStepVehicleProps) {
  const isEquipment = vehicle.type === EQUIPMENT_TYPE;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m">Let&apos;s Find Your Vehicle</h2>
        <p className="text-body-m mt-1 text-dark-neutral/60">
          Enter your VIN for the fastest and most accurate appraisal, or enter your vehicle details manually.
        </p>
      </div>

      <div role="radiogroup" aria-label="Vehicle lookup method" className="inline-flex w-full overflow-hidden rounded-[var(--radius-control)] border border-border">
        {(
          [
            { id: "vin" as const, label: "VIN Lookup (Recommended)" },
            { id: "manual" as const, label: "Enter Details Manually" },
          ]
        ).map((option, index) => {
          const active = option.id === mode;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onModeChange(option.id)}
              className={cn(
                "focus-ring text-label-m h-11 flex-1 px-2 transition-colors duration-[var(--duration-micro)]",
                index > 0 && "border-l border-border",
                active ? "bg-primary-red text-primary-white" : "bg-surface text-primary-black hover:bg-soft-gray"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {mode === "vin" ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <Input
              label="VIN"
              hideLabel
              placeholder="Enter your 17-character VIN"
              value={vehicle.vin}
              onChange={(event) => onFieldChange({ vin: event.target.value.toUpperCase() })}
              error={errors.vin}
              maxLength={17}
              containerClassName="flex-1"
            />
            <Button type="button" variant="primary" size="lg" onClick={onNext} className="shrink-0">
              Lookup Vehicle
            </Button>
          </div>
          <p className="text-caption-s text-dark-neutral/60">
            <button type="button" onClick={() => onModeChange("manual")} className="focus-ring rounded text-primary-red hover:underline">
              Where do I find my VIN?
            </button>
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select label="Type" options={TYPE_OPTIONS} value={vehicle.type} onChange={(event) => onFieldChange({ type: event.target.value })} error={errors.type} />
            <Select
              label="Condition"
              options={CONDITION_SELECT_OPTIONS}
              value={vehicle.condition}
              onChange={(event) => onFieldChange({ condition: event.target.value })}
              error={errors.condition}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              label="Year"
              type="text"
              inputMode="numeric"
              placeholder="2024"
              value={vehicle.year}
              onChange={(event) => onFieldChange({ year: event.target.value })}
              error={errors.year}
            />
            <Input
              label="Make"
              placeholder="e.g. Ford, Caterpillar"
              value={vehicle.make}
              onChange={(event) => onFieldChange({ make: event.target.value })}
              error={errors.make}
            />
            <Input
              label="Model"
              placeholder="e.g. Transit, D10"
              value={vehicle.model}
              onChange={(event) => onFieldChange({ model: event.target.value })}
              error={errors.model}
            />
          </div>

          {isEquipment && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Horsepower"
                type="text"
                inputMode="numeric"
                placeholder="Optional"
                value={vehicle.horsepower}
                onChange={(event) => onFieldChange({ horsepower: event.target.value })}
                error={errors.horsepower}
              />
              <Input
                label="Hours"
                type="text"
                inputMode="numeric"
                placeholder="Optional"
                value={vehicle.hours}
                onChange={(event) => onFieldChange({ hours: event.target.value })}
                error={errors.hours}
              />
            </div>
          )}

          <CurrencyInput
            label="Price"
            placeholder="0"
            hint="What you're hoping to get for it — optional, our team will confirm a fair value."
            value={vehicle.price}
            onChange={(event) => onFieldChange({ price: event.target.value })}
            error={errors.price}
          />

          <div className="mt-2 flex items-center justify-end gap-3">
            <Button type="button" variant="primary" size="lg" onClick={onNext}>
              Next Step →
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
