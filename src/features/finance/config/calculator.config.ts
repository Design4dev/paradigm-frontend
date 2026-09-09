import type { CalculatorInput, PaymentFrequency } from "@/features/finance/types/calculator.types";

/**
 * Business-configurable calculator values (page-04-payment-calculator.md
 * §38/§49) — kept out of any visual component so a real backend/config
 * source can supply them later without touching UI code. The default APR
 * mirrors the spec's own worked example (§16/§60) and is presented
 * throughout as a generic starting estimate, never as Paradigm Fleet's
 * approved/quoted rate — same "estimate, not an offer" framing the VDP's
 * inline PaymentEstimator already uses.
 */
export const LOAN_TERM_OPTIONS: { label: string; value: number }[] = [
  { label: "36 mo", value: 36 },
  { label: "48 mo", value: 48 },
  { label: "60 mo", value: 60 },
  { label: "72 mo", value: 72 },
];

export const PAYMENT_FREQUENCY_OPTIONS: { label: string; value: PaymentFrequency; periodsPerYear: number }[] = [
  { label: "Weekly", value: "weekly", periodsPerYear: 52 },
  { label: "Bi-weekly", value: "biweekly", periodsPerYear: 26 },
  { label: "Monthly", value: "monthly", periodsPerYear: 12 },
];

export const PERIODS_PER_YEAR: Record<PaymentFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  monthly: 12,
};

export const calculatorDefaults: CalculatorInput = {
  mode: "vehiclePrice",
  vehiclePrice: "",
  targetPayment: "",
  downPayment: "",
  loanTermMonths: 60,
  paymentFrequency: "biweekly",
  apr: "8.99",
  financeFee: 0,
};
