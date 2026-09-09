import type { CalculatorInput, StepErrors } from "@/features/finance/types/calculator.types";

/** Step 1 — mode + price/target payment (§32/§33). */
export function validateStep1(input: CalculatorInput): StepErrors {
  const errors: StepErrors = {};

  if (input.mode === "vehiclePrice") {
    const price = Number(input.vehiclePrice);
    if (!input.vehiclePrice.trim() || !Number.isFinite(price) || price <= 0) {
      errors.vehiclePrice = "Enter a vehicle price.";
    }
  } else {
    const target = Number(input.targetPayment);
    if (!input.targetPayment.trim() || !Number.isFinite(target) || target <= 0) {
      errors.targetPayment = "Enter a valid payment amount.";
    }
  }

  return errors;
}

/** Step 2 — financing inputs (§32/§33). */
export function validateStep2(input: CalculatorInput): StepErrors {
  const errors: StepErrors = {};

  const downPayment = Number(input.downPayment || "0");
  if (input.downPayment.trim() && (!Number.isFinite(downPayment) || downPayment < 0)) {
    errors.downPayment = "Enter a valid down payment.";
  } else if (input.mode === "vehiclePrice") {
    const vehiclePrice = Number(input.vehiclePrice) || 0;
    const financeAmount = vehiclePrice + input.financeFee;
    if (downPayment > financeAmount && financeAmount > 0) {
      errors.downPayment = "Down payment cannot be greater than the financed amount.";
    }
  }

  if (!input.loanTermMonths) {
    errors.loanTermMonths = "Select a loan term.";
  }

  if (!input.paymentFrequency) {
    errors.paymentFrequency = "Select a payment frequency.";
  }

  const apr = Number(input.apr);
  if (!input.apr.trim() || !Number.isFinite(apr) || apr < 0) {
    errors.apr = "Enter a valid APR.";
  }

  return errors;
}

export function hasErrors(errors: StepErrors): boolean {
  return Object.values(errors).some(Boolean);
}
