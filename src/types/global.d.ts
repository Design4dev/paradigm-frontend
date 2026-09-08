export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ADMIN_ACCESS_KEY?: string;
      readonly WEBHOOK_SECRET?: string;
      readonly SALESFORCE_INSTANCE_URL?: string;
      readonly SALESFORCE_ACCESS_TOKEN?: string;
      readonly NEXT_PUBLIC_ANALYTICS_ID?: string;
      readonly NEXT_PUBLIC_SITE_URL?: string;
    }
  }

  interface Window {
    /** Present only when an analytics provider script has loaded; see features/analytics. */
    gtag?: (...args: unknown[]) => void;
  }
}
