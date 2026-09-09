/** Payment Calculator data model (page-04-payment-calculator.md §50). */

export type PaymentFrequency = "weekly" | "biweekly" | "monthly";

export type CalculatorMode = "vehiclePrice" | "targetPayment";

export type CalculatorStep = 1 | 2 | 3;

export interface CalculatorInput {
  mode: CalculatorMode;
  /** Kept as free-text strings while being typed (mirrors PaymentEstimator/Input's controlled-string convention) — parsed to numbers only at calculation time. */
  vehiclePrice: string;
  targetPayment: string;
  downPayment: string;
  loanTermMonths: number;
  paymentFrequency: PaymentFrequency;
  apr: string;
  /** Only ever non-zero when supplied by real VDP/backend context (§37) — never invented by the UI. */
  financeFee: number;
}

export interface CalculatorResult {
  vehicleBudget: number;
  financeAmount: number;
  loanAmount: number;
  downPayment: number;
  payment: number;
  paymentFrequency: PaymentFrequency;
  loanTermMonths: number;
  apr: number;
  numberOfPayments: number;
  totalCostOfCredit: number;
  totalObligation: number;
  financeFee: number;
}

export interface StepErrors {
  vehiclePrice?: string;
  targetPayment?: string;
  downPayment?: string;
  loanTermMonths?: string;
  paymentFrequency?: string;
  apr?: string;
}
