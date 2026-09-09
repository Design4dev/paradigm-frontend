import { Button } from "@/components/ui/Button";
import { FeedbackCard } from "@/components/ui/FeedbackCard";
import { VehicleMatchCTA } from "@/features/finance/components/VehicleMatchCTA";
import { formatCurrency, formatFrequency, formatPercent } from "@/features/finance/lib/format";
import type { CalculatorResult } from "@/features/finance/types/calculator.types";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-body-m text-dark-neutral/60">{label}</span>
      <span className="text-label-m text-primary-black">{value}</span>
    </div>
  );
}

interface CalculatorStep3Props {
  result: CalculatorResult | null;
  onAdjust: () => void;
  onTalkToFinance: () => void;
}

/** Step 3 — Review (§29): the full finance summary plus final actions. */
export function CalculatorStep3({ result, onAdjust, onTalkToFinance }: CalculatorStep3Props) {
  if (!result) {
    return (
      <FeedbackCard
        status="error"
        title="We couldn't calculate this payment"
        message="Please review your inputs on the previous steps."
        action={
          <Button type="button" variant="primary" onClick={onAdjust} className="mx-auto">
            Adjust Calculation
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-heading-m">Review</h2>
        <p className="text-body-m mt-1 text-dark-neutral/60">Here&apos;s your finance summary — adjust anything before moving on.</p>
      </div>

      <div className="rounded-[var(--radius-control)] bg-soft-gray p-5 text-center">
        <p className="text-caption-s text-dark-neutral/60">Estimated Payment</p>
        <p className="flex items-baseline justify-center gap-2">
          <span className="text-display-l text-primary-black">{formatCurrency(result.payment)}</span>
          <span className="text-label-m text-dark-neutral/60">/ {formatFrequency(result.paymentFrequency)}</span>
        </p>
        <p className="text-body-m mt-2 text-dark-neutral/70">Vehicle Budget: {formatCurrency(result.vehicleBudget)}</p>
      </div>

      <div>
        <p className="text-label-m mb-1 text-primary-black">Financing Breakdown</p>
        <div className="divide-y divide-border">
          <Row label="Vehicle Price" value={formatCurrency(result.vehicleBudget)} />
          {result.financeFee > 0 && <Row label="Finance Fee" value={formatCurrency(result.financeFee)} />}
          <Row label="Down Payment" value={formatCurrency(result.downPayment)} />
          <Row label="Loan Amount" value={formatCurrency(result.loanAmount)} />
          <Row label="Term" value={`${result.loanTermMonths} months`} />
          <Row label="Frequency" value={formatFrequency(result.paymentFrequency)} />
          <Row label="APR" value={formatPercent(result.apr)} />
          <Row label="Total Cost of Credit" value={formatCurrency(result.totalCostOfCredit)} />
          <Row label="Total Obligation" value={formatCurrency(result.totalObligation)} />
        </div>
      </div>

      <VehicleMatchCTA result={result} onTalkToFinance={onTalkToFinance} />

      <Button type="button" variant="ghost" onClick={onAdjust} className="mx-auto">
        ← Adjust Calculation
      </Button>
    </div>
  );
}
