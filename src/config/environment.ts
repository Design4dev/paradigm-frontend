/**
 * Centralized, typed access to environment variables. Nothing here reads
 * `process.env` directly outside this file, so a missing/renamed var is a
 * single-file fix instead of a grep across services/routes/middleware.
 */
export const env = {
  /** Gate for the prototype /admin section — see middleware.ts. Unset = admin is closed. */
  adminAccessKey: process.env.ADMIN_ACCESS_KEY ?? "",

  /** Shared secret inbound webhooks must send via the `x-webhook-secret` header. */
  webhookSecret: process.env.WEBHOOK_SECRET ?? "",

  /** Optional Salesforce REST config — services/salesforce falls back to mock mode without these. */
  salesforce: {
    instanceUrl: process.env.SALESFORCE_INSTANCE_URL ?? "",
    accessToken: process.env.SALESFORCE_ACCESS_TOKEN ?? "",
  },

  /** Optional analytics provider id — features/analytics no-ops without it. */
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID ?? "",

  /**
   * Apprentall booking-engine base URL + client ID — verified from
   * paradigmtruckrental.com's own production HTML (`<iframe
   * id="reservation_iframe" src="https://book.apprentall.cloud/?clientid=1923">`),
   * not guessed. Both are public, non-secret values (they appear directly in
   * that site's page source), so they default to the real, working values
   * here and don't require a `.env.local` for local development to work —
   * `.env.example` documents them and lets a different environment (e.g. a
   * future second client/location) override either one.
   */
  apprentallUrl: process.env.NEXT_PUBLIC_APPRENTALL_URL || "https://book.apprentall.cloud",
  apprentallClientId: process.env.NEXT_PUBLIC_APPRENTALL_CLIENT_ID || "1923",

  isProduction: process.env.NODE_ENV === "production",
} as const;

export function isSalesforceConfigured(): boolean {
  return Boolean(env.salesforce.instanceUrl && env.salesforce.accessToken);
}
