/** Shared, non-visual constants used across features/services. */

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

export const MEDIA_QUERIES = {
  smUp: `(min-width: ${BREAKPOINTS.sm}px)`,
  lgUp: `(min-width: ${BREAKPOINTS.lg}px)`,
} as const;

export const DEBOUNCE_MS = {
  search: 380,
} as const;

export const WEBHOOK_SECRET_HEADER = "x-webhook-secret";
export const ADMIN_ACCESS_COOKIE = "admin_key";
