import { Button } from "@/components/ui/Button";
import { CalculatorModeSelector } from "@/features/finance/components/CalculatorModeSelector";
import { CurrencyInput } from "@/features/finance/components/CurrencyInput";
import type { CalculatorInput, CalculatorMode, StepErrors } from "@/features/finance/types/calculator.types";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import Link from "next/link";

interface CalculatorStep1Props {
  input: CalculatorInput;
  errors: StepErrors;
  vehicle?: Vehicle | null;
  onModeChange: (mode: CalculatorMode) => void;
  onFieldChange: (patch: Partial<CalculatorInput>) => void;
  onNext: () => void;
  onReset: () => void;
}

/** Step 1 — Vehicle & Payment Type (§10/§11). */
export function CalculatorStep1({ input, errors, vehicle, onModeChange, onFieldChange, onNext, onReset }: CalculatorStep1Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m">Let&apos;s get started</h2>
        <p className="text-body-m mt-1 text-dark-neutral/60">Choose how you&apos;d like to calculate your payment.</p>
      </div>

      <CalculatorModeSelector mode={input.mode} onChange={onModeChange} />

      {input.mode === "vehiclePrice" ? (
        <div>
          <CurrencyInput
            label="Vehicle Price"
            placeholder="0"
            value={input.vehiclePrice}
            onChange={(event) => onFieldChange({ vehiclePrice: event.target.value })}
            error={errors.vehiclePrice}
          />
          {vehicle && (
            <p className="text-caption-s mt-1.5 text-dark-neutral/60">
              From selected vehicle ({vehicle.year} {vehicle.brand} {vehicle.model}){" "}
              <Link href="/payment-calculator" className="focus-ring rounded text-primary-red hover:underline">
                Change Vehicle
              </Link>
            </p>
          )}
        </div>
      ) : (
        <CurrencyInput
          label="Target Payment"
          placeholder="0"
          hint="Start with the payment amount that fits your budget."
          value={input.targetPayment}
          onChange={(event) => onFieldChange({ targetPayment: event.target.value })}
          error={errors.targetPayment}
        />
      )}

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onReset}>
          ↺ Reset Calculator
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onNext}>
          Next Step →
        </Button>
      </div>
    </div>
  );
}
