import { env } from "@/config/environment";

export type AnalyticsEvent =
  | { name: "vehicle_viewed"; slug: string }
  | { name: "quote_requested"; vehicleSlug?: string }
  | { name: "contact_submitted" }
  | { name: "trade_in_view" }
  | { name: "trade_in_started" }
  | { name: "trade_in_vehicle_step_completed" }
  | { name: "trade_in_condition_step_completed" }
  | { name: "trade_in_photo_upload_started" }
  | { name: "trade_in_photo_uploaded" }
  | { name: "trade_in_contact_step_completed" }
  | { name: "trade_in_submitted" }
  | { name: "trade_in_submission_success" }
  | { name: "trade_in_submission_error" }
  | { name: "trade_in_contact_clicked" }
  | { name: "trade_in_browse_vehicles_clicked" };

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
