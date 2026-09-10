/**
 * Pricing adapter boundary (spec §23). The client's real booking engine
 * computes per-day rates from a live rate table keyed by date/availability
 * (confirmed live this pass — Apprentall's Select Vehicle screen showed real
 * per-day pricing that only appears after a completed search). This project
 * has no connection to that rate engine, so `calculatePrice()` deliberately
 * never returns a dollar figure — only a `"pending_confirmation"` status.
 *
 * This is NOT the same situation as `rentalAvailability.service.ts`'s
 * vehicle catalog (which is genuinely static/verified) — a price observed
 * once during this session is a snapshot of a live, variable rate table, not
 * a stable fact, so freezing it into static site content would itself
 * become a fabricated/stale price over time. Review/Confirmation show
 * "Final pricing confirmed by our rental team" instead of a number, per the
 * brief's explicit "do not fabricate totals" instruction. Swap the
 * `"pending_confirmation"` branch for a real `"calculated"` result once a
 * live pricing/rate API is connected — every caller already reads the
 * `status` discriminant rather than assuming a total exists.
 */
export type PriceEstimate =
  | { status: "pending_confirmation" }
  | { status: "calculated"; currency: string; total: number; breakdown: { label: string; amount: number }[] };

export function calculatePrice(): PriceEstimate {
  return { status: "pending_confirmation" };
}
