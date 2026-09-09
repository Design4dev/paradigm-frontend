import { Button } from "@/components/ui/Button";
import { CurrencyInput, PercentageInput } from "@/features/finance/components/CurrencyInput";
import { LoanTermSelector } from "@/features/finance/components/LoanTermSelector";
import { PaymentFrequencySelector } from "@/features/finance/components/PaymentFrequencySelector";
import type { CalculatorInput, PaymentFrequency, StepErrors } from "@/features/finance/types/calculator.types";

interface CalculatorStep2Props {
  input: CalculatorInput;
  errors: StepErrors;
  onFieldChange: (patch: Partial<CalculatorInput>) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Step 2 — Loan Details: down payment, term, frequency, APR (§13–§16). */
export function CalculatorStep2({ input, errors, onFieldChange, onBack, onNext }: CalculatorStep2Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-heading-m">Loan Details</h2>
        <p className="text-body-m mt-1 text-dark-neutral/60">Are you depositing a down payment?</p>
      </div>

      <CurrencyInput
        label="Down Payment"
        placeholder="0"
        hint="The bigger the down payment, the smaller your payment."
        value={input.downPayment}
        onChange={(event) => onFieldChange({ downPayment: event.target.value })}
        error={errors.downPayment}
      />

      <LoanTermSelector value={input.loanTermMonths} onChange={(loanTermMonths) => onFieldChange({ loanTermMonths })} error={errors.loanTermMonths} />

      <PaymentFrequencySelector
        value={input.paymentFrequency}
        onChange={(paymentFrequency: PaymentFrequency) => onFieldChange({ paymentFrequency })}
        error={errors.paymentFrequency}
      />

      <PercentageInput
        label="APR (Annual Percentage Rate)"
        placeholder="0.00"
        hint="We may be able to offer you an even better rate! Talk to our finance experts today."
        value={input.apr}
        onChange={(event) => onFieldChange({ apr: event.target.value })}
        error={errors.apr}
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
