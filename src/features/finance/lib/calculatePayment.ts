import { PERIODS_PER_YEAR } from "@/features/finance/config/calculator.config";
import type { CalculatorInput, CalculatorResult } from "@/features/finance/types/calculator.types";

/**
 * Reusable, typed finance calculation engine (page-04-payment-calculator.md
 * §18–§21/§49) — kept independent of any component so both the
 * vehicle-price and target-payment modes stay in exactly one place instead
 * of being reimplemented per screen. Pure function: same input always
 * produces the same output, nothing here touches the DOM or React state.
 */
export function calculatePayment(input: CalculatorInput): CalculatorResult | null {
  const periodsPerYear = PERIODS_PER_YEAR[input.paymentFrequency];
  const apr = Number(input.apr);
  const downPayment = Math.max(Number(input.downPayment) || 0, 0);
  const financeFee = Math.max(input.financeFee || 0, 0);
  const loanTermMonths = input.loanTermMonths;

  if (!Number.isFinite(apr) || apr < 0) return null;
  if (!Number.isFinite(loanTermMonths) || loanTermMonths <= 0) return null;

  // Retain full precision internally; only the UI layer rounds for display (§22).
  const n = (loanTermMonths / 12) * periodsPerYear;
  const r = apr / 100 / periodsPerYear;

  if (input.mode === "vehiclePrice") {
    const vehiclePrice = Number(input.vehiclePrice);
    if (!Number.isFinite(vehiclePrice) || vehiclePrice <= 0) return null;

    const financeAmount = vehiclePrice + financeFee;
    const loanAmount = Math.max(financeAmount - downPayment, 0);
    const payment = r === 0 ? loanAmount / n : (loanAmount * r) / (1 - Math.pow(1 + r, -n));

    if (!Number.isFinite(payment)) return null;

    const totalObligation = payment * n;
    const totalCostOfCredit = totalObligation - loanAmount;

    return {
      vehicleBudget: vehiclePrice,
      financeAmount,
      loanAmount,
      downPayment,
      payment,
      paymentFrequency: input.paymentFrequency,
      loanTermMonths,
      apr,
      numberOfPayments: n,
      totalCostOfCredit,
      totalObligation,
      financeFee,
    };
  }

  // Target-payment mode — solve for the maximum financed principal (§21).
  const targetPayment = Number(input.targetPayment);
  if (!Number.isFinite(targetPayment) || targetPayment <= 0) return null;

  const loanAmount = r === 0 ? targetPayment * n : (targetPayment * (1 - Math.pow(1 + r, -n))) / r;
  if (!Number.isFinite(loanAmount) || loanAmount <= 0) return null;

  const vehicleBudget = loanAmount + downPayment - financeFee;
  // A budget that can't cover the fee/financing structure isn't a usable estimate (§36 "Very Low Target Payment").
  if (vehicleBudget <= 0) return null;

  const financeAmount = loanAmount + downPayment;
  const totalObligation = targetPayment * n;
  const totalCostOfCredit = totalObligation - loanAmount;

  return {
    vehicleBudget,
    financeAmount,
    loanAmount,
    downPayment,
    payment: targetPayment,
    paymentFrequency: input.paymentFrequency,
    loanTermMonths,
    apr,
    numberOfPayments: n,
    totalCostOfCredit,
    totalObligation,
    financeFee,
  };
}
