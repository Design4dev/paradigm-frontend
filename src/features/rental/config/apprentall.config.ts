import { env } from "@/config/environment";

/**
 * NOT used by any UI in this project — kept as a documented reference of
 * the client's real, verified Apprentall setup for whoever eventually
 * wires a real backend booking/payment integration (spec §28: Apprentall
 * is a reference/integration source, not the final user-facing UI — the
 * full-page booking flow under `/rentals/book` owns the whole journey,
 * never an iframe/redirect to this URL).
 *
 * VERIFIED (not guessed): paradigmtruckrental.com's own production HTML
 * embeds Apprentall as a single iframe:
 *
 *   <iframe id="reservation_iframe" src="https://book.apprentall.cloud/?clientid=1923">
 *
 * `?clientid=1923` is the whole query contract — there is no search-state
 * query string, and Apprentall's own client-rendered app supplies its own
 * search/vehicle-selection/extras/insurance/terms/customer/license/payment
 * UI inside that iframe. Useful reference if a real server-side Apprentall
 * API (distinct from this consumer-facing iframe) is confirmed later.
 */
export const APPRENTALL_EMBED_URL = `${env.apprentallUrl}/?clientid=${env.apprentallClientId}`;

export function isApprentallConfigured(): boolean {
  return Boolean(env.apprentallUrl && env.apprentallClientId);
}
