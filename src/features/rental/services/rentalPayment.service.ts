/**
 * Payment adapter boundary (spec §19/§23/§32). No approved payment
 * provider/gateway is connected in this project. This function exists so
 * `StepPayment` has a single real call site to swap for a provider SDK
 * (Stripe Elements, etc.) later — it never processes anything itself.
 *
 * Security invariants this file (and its one caller) must preserve:
 *  - Raw card fields live only in `StepPayment`'s own local component
 *    state — never in `RentalBookingState` (the central store), never sent
 *    here, never logged. There is deliberately no `PaymentDetails` type
 *    with a card-number field anywhere in this codebase.
 *  - This function never returns a fabricated success. Every call resolves
 *    "not_configured" until a real provider adapter replaces this body.
 */
export type PaymentResult = { status: "not_configured" } | { status: "success"; transactionId: string } | { status: "error"; message: string };

export async function processPayment(): Promise<PaymentResult> {
  return { status: "not_configured" };
}
