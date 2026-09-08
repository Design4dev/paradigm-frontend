import { env } from "@/config/environment";

export type AnalyticsEvent =
  | { name: "vehicle_viewed"; slug: string }
  | { name: "quote_requested"; vehicleSlug?: string }
  | { name: "contact_submitted" };

/**
 * Minimal analytics abstraction. Without `NEXT_PUBLIC_ANALYTICS_ID` set this
 * intentionally no-ops in production and logs to the console in
 * development, so the call sites (features/vehicles, features/leads,
 * features/contact) are already wired for whichever real provider
 * (GA4, Segment, PostHog…) gets configured later — swapping providers is a
 * one-file change here.
 */
export function trackEvent(event: AnalyticsEvent) {
  if (!env.analyticsId) {
    if (!env.isProduction) {
      console.info("[analytics:noop]", event);
    }
    return;
  }

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event.name, event);
  }
}
