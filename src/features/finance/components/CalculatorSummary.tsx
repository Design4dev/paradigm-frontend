import { AccordionItem } from "@/components/ui/Accordion";
import { Pill } from "@/components/ui/Badge";
import { GaugeIcon, InfoIcon, SpinnerIcon } from "@/components/ui/Icons";
import { VehicleMatchCTA } from "@/features/finance/components/VehicleMatchCTA";
import { formatCurrency, formatFrequency, formatPercent } from "@/features/finance/lib/format";
import type { CalculatorResult } from "@/features/finance/types/calculator.types";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import Image from "next/image";
import Link from "next/link";

/**
 * Temporarily hidden per request — this card's "View Matching Vehicles" /
 * "Talk to Our Finance Experts" buttons (`VehicleMatchCTA`) are removed from
 * view here, not deleted: the component is still used as-is by
 * `CalculatorStep3`, and `onTalkToFinance` stays threaded through this
 * component's props so restoring it is a one-line flip.
 */
const SHOW_VEHICLE_MATCH_CTA = false;

interface CalculatorSummaryProps {
  vehicle?: Vehicle | null;
  result: CalculatorResult | null;
  /** Mobile renders a shorter row set behind a "View Full Breakdown" accordion instead of always-expanded rows (§30). */
  compact?: boolean;
  /** Brief inline affordance while a just-typed value settles (§17/§34) — values stay visible/unblanked throughout. */
  isCalculating?: boolean;
  onTalkToFinance: () => void;
}

function BreakdownRow({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-body-m text-dark-neutral/60">{label}</span>
      <span className={emphasis ? "text-label-m text-primary-black" : "text-body-m text-primary-black"}>{value}</span>
    </div>
  );
}

/**
 * Persistent calculation summary (§9/§23/§24) — the desktop right column
 * and the mobile in-flow result card share this one component so the two
 * never drift; `compact` only changes how much of the breakdown is shown by
 * default, not the underlying values.
 */
export function CalculatorSummary({ vehicle, result, compact = false, isCalculating = false, onTalkToFinance }: CalculatorSummaryProps) {
  const primaryImage = vehicle?.images[0];

  const rows = result ? (
    <>
      <BreakdownRow label={vehicle ? "Vehicle Price" : "Vehicle Budget"} value={formatCurrency(result.vehicleBudget)} />
      {result.financeFee > 0 && <BreakdownRow label="Finance Fee" value={formatCurrency(result.financeFee)} />}
      <BreakdownRow label="Down Payment" value={formatCurrency(result.downPayment)} />
      <BreakdownRow label="Loan Amount" value={formatCurrency(result.loanAmount)} />
      <BreakdownRow label="Loan Term" value={`${result.loanTermMonths} months`} />
      <BreakdownRow label="Payment Frequency" value={formatFrequency(result.paymentFrequency)} />
      <BreakdownRow label="APR (Annual)" value={formatPercent(result.apr)} />
    </>
  ) : null;

  return (
    <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-heading-m">Your Payment Estimate</h2>
        {result && (
          <Pill tone="outline" className="shrink-0">
            Estimated
          </Pill>
        )}
      </div>

      {vehicle && (
        <div className="flex items-center gap-3 rounded-[var(--radius-control)] bg-soft-gray p-3">
          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[6px] bg-border">
            {primaryImage && <Image src={primaryImage.url} alt={primaryImage.alt} fill sizes="64px" className="object-contain p-1" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-label-m truncate text-primary-black">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </p>
            <p className="text-caption-s truncate text-dark-neutral/60">
              {vehicle.specs
                .slice(0, 3)
                .map((spec) => spec.value)
                .join(" · ")}
            </p>
            <span className="text-caption-s flex flex-wrap gap-x-3">
              <Link href={`/vehicles/${vehicle.slug}`} className="focus-ring rounded text-primary-red hover:underline">
                View Details →
              </Link>
              <Link href="/payment-calculator" className="focus-ring rounded text-dark-neutral/60 hover:underline">
                Change Vehicle
              </Link>
            </span>
          </div>
        </div>
      )}

      {result ? (
        <>
          <div className="rounded-[var(--radius-control)] bg-soft-gray p-4">
            <p className="text-caption-s flex items-center gap-1.5 text-dark-neutral/60">
              Estimated Payment
              {isCalculating && <SpinnerIcon className="h-3 w-3" />}
            </p>
            <p className="flex items-baseline gap-2">
              <span className="text-display-l text-primary-black">{formatCurrency(result.payment)}</span>
              <span className="text-label-m text-dark-neutral/60">/ {formatFrequency(result.paymentFrequency)}</span>
            </p>
            <p className="text-caption-s mt-1 text-dark-neutral/60">For {result.loanTermMonths} months</p>
          </div>

          {compact ? (
            <AccordionItem title="View Full Breakdown" titleClassName="text-body-m py-0" contentClassName="pt-1">
              <div className="divide-y divide-border">{rows}</div>
            </AccordionItem>
          ) : (
            <div className="divide-y divide-border">{rows}</div>
          )}

          {SHOW_VEHICLE_MATCH_CTA && <VehicleMatchCTA result={result} onTalkToFinance={onTalkToFinance} />}

          <p className="text-caption-s flex items-start gap-1.5 text-dark-neutral/50">
            <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            This is an estimate for illustrative purposes only. Actual rates, payments and terms are subject to lender
            approval, taxes, fees and other conditions.
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 py-8 text-center text-dark-neutral/50">
          <GaugeIcon className="h-6 w-6 opacity-50" />
          <p className="text-body-m">Enter a vehicle price or target payment to see your estimated payment.</p>
        </div>
      )}
    </div>
  );
}
