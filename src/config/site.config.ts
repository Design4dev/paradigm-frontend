/**
 * Single source of truth for site-wide identity/copy. Referenced by
 * metadata, the Header, the Footer, the SEO structured-data component and
 * the About/Contact pages instead of being duplicated across those places.
 *
 * Business facts (legal name, address, hours) reflect Paradigm Fleet
 * Services' real Hamilton, ON location; phone numbers match the approved
 * homepage design reference (page-01-homepage.md / Desktop screenshot).
 */
export const siteConfig = {
  name: "Paradigm Fleet",
  legalName: "Paradigm Fleet Services",
  tagline: "Southern Ontario's Trusted Commercial Vehicle Partner",
  description:
    "Sales, rentals, leasing/financing and custom upfitting for commercial vehicles across Hamilton and Southern Ontario. Browse work-ready vans, trucks and more and get a quote in minutes.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: "Hamilton, ON",
  contact: {
    phone: "(866) 331-3566",
    phoneHref: "tel:+18663313566",
    salesPhone: "905-301-3557",
    salesPhoneHref: "tel:+19053013557",
    email: "info@paradigmfleet.ca",
    address: "339 Dosco Drive, Hamilton, ON L8E 2N6",
    hours: [
      { days: "Mon – Fri", time: "8:00 AM – 6:00 PM" },
      { days: "Sat", time: "9:00 AM – 4:00 PM" },
      { days: "Sun", time: "Closed" },
    ],
    hubs: ["Hamilton", "Burlington", "Kitchener", "Cambridge", "Waterloo", "Toronto"],
  },
  social: {
    linkedin: "https://ca.linkedin.com/company/paradigm-fleet-sales-leasing-and-upfitting",
    instagram: "#",
    facebook: "https://www.facebook.com/paradigmfleet/",
  },
} as const;
