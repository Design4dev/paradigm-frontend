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

  isProduction: process.env.NODE_ENV === "production",
} as const;

export function isSalesforceConfigured(): boolean {
  return Boolean(env.salesforce.instanceUrl && env.salesforce.accessToken);
}
