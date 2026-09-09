/** Central map of this app's own API route paths — never hard-code these inline. */
export const endpoints = {
  contact: "/api/contact",
  leads: "/api/leads",
  tradeIn: "/api/trade-in",
  webhooks: "/api/webhooks",
} as const;
