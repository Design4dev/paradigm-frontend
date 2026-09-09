const currencyFormatter = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

/** Whole-CAD-dollar formatting (§22) — the one formatter shared by the summary, breakdown and review. */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(Math.max(value, 0));
}

/** APR display, e.g. `8.99%` (§16/§22) — retains one decimal rather than rounding to whole percent. */
export function formatPercent(value: number): string {
  return `${value.toFixed(2).replace(/\.?0+$/, "").replace(/^$/, "0")}%`;
}

const frequencyLabel: Record<string, string> = { weekly: "Weekly", biweekly: "Bi-weekly", monthly: "Monthly" };

export function formatFrequency(value: string): string {
  return frequencyLabel[value] ?? value;
}
