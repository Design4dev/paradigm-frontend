"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import { useMemo, useState } from "react";

const TERM_OPTIONS = [
  { label: "36 months", value: "36" },
  { label: "48 months", value: "48" },
  { label: "60 months", value: "60" },
  { label: "72 months", value: "72" },
];

const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

/**
 * Inline "Estimate Payments" calculator (page-03-vdp.md §17). The vehicle
 * price is pre-filled and read-only; the rate is left blank and typed in by
 * the visitor rather than defaulted to a number we'd be asserting as
 * Paradigm Fleet's real APR (§31 — don't invent financing rates). This is a
 * generic amortization estimate, clearly labeled as such.
 */
export function PaymentEstimator({ vehicle }: { vehicle: Vehicle }) {
  const [downPayment, setDownPayment] = useState("");
  const [apr, setApr] = useState("");
  const [term, setTerm] = useState("60");
  const { openQuote } = useQuote();

  const monthlyPayment = useMemo(() => {
    const rate = Number(apr);
    if (!apr.trim() || Number.isNaN(rate) || rate < 0) return null;

    const down = Number(downPayment) || 0;
    const principal = Math.max(vehicle.price - down, 0);
    const months = Number(term);
    const monthlyRate = rate / 100 / 12;

    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  }, [apr, downPayment, term, vehicle.price]);

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-soft-gray p-6">
      <Input label="Vehicle Price" value={vehicle.priceLabel} readOnly tabIndex={-1} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          label="Down Payment (CAD)"
          type="number"
          min={0}
          placeholder="0"
          value={downPayment}
          onChange={(event) => setDownPayment(event.target.value)}
        />
        <Input
          label="Your Rate (APR %)"
          type="number"
          min={0}
          step={0.1}
          placeholder="Enter a rate"
          hint="Not Paradigm Fleet's rate — enter your own estimate or lender quote."
          value={apr}
          onChange={(event) => setApr(event.target.value)}
        />
        <Select label="Term" options={TERM_OPTIONS} value={term} onChange={(event) => setTerm(event.target.value)} />
      </div>

      {monthlyPayment !== null ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-control)] bg-surface p-4">
          <div>
            <p className="text-caption-s text-dark-neutral/60">Estimated Monthly Payment</p>
            <p className="text-heading-l text-primary-black">{currency.format(monthlyPayment)}/mo</p>
          </div>
          <Button
            variant="primary"
            onClick={(event) =>
              openQuote(
                { slug: vehicle.slug, name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`, stockNumber: vehicle.stockNumber, priceLabel: vehicle.priceLabel },
                event.currentTarget
              )
            }
          >
            Request Financing →
          </Button>
        </div>
      ) : (
        <p className="text-caption-s text-dark-neutral/60">Enter a rate above to see an estimated monthly payment.</p>
      )}

      <p className="text-caption-s text-dark-neutral/50">
        Estimate only — not a financing offer. Actual rate and terms are determined by your lender/credit approval.
      </p>
    </div>
  );
}
