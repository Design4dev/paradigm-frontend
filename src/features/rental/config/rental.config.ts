import type { RentalContact, RentalFinderDuration, RentalFinderVehicle, RentalUseCase } from "@/features/rental/types/rental.types";

export const RENTAL_USE_CASE_OPTIONS: RentalUseCase[] = [
  "Seasonal / Peak Season",
  "Fleet Vehicle Down for Repair",
  "Short-Term Project",
  "Trying Before You Buy",
  "Other",
];

/** Plain, honest duration bands — not tied to any rate table, since no rental pricing exists in this project. */
export const RENTAL_DURATION_OPTIONS = ["A few days", "1–2 weeks", "1 month", "Longer / Ongoing", "Not sure yet"] as const;

export const EMPTY_RENTAL_VEHICLE: RentalFinderVehicle = { type: "" };
export const EMPTY_RENTAL_DURATION: RentalFinderDuration = { startDate: "", duration: "" };
export const EMPTY_RENTAL_CONTACT: RentalContact = { firstName: "", lastName: "", email: "", phone: "", companyName: "" };

/**
 * Verified real content from https://paradigmtruckrental.com/ (fetched and
 * confirmed this pass — not invented, not from the UI reference image).
 * Contact details below are the RENTAL division's own, distinct from
 * `siteConfig.contact` (the main dealership) — same street address, but a
 * different phone/email, so they're kept separate rather than reusing
 * `siteConfig` and risking the wrong number.
 */
export const RENTAL_CONTACT = {
  phone: "905-512-5670",
  phoneHref: "tel:+19055125670",
  tollFree: "866-952-1781",
  tollFreeHref: "tel:+18669521781",
  email: "info@paradigmtruckrental.com",
  address: "339 Dosco Dr, Hamilton, ON L8E 2N6",
  hours: "Monday – Friday: 8AM to 5PM",
} as const;

/**
 * Verified value propositions, quoted from the live site's headline +
 * supporting line for each — shown in the Hero's dark benefit strip (spec
 * §4), immediately under the headline. "Short- & long-term rentals" is the
 * same verified rental-term claim used across the site (see
 * `RENTAL_BUSINESS_HIGHLIGHTS`... now folded in here as the 4th point so
 * it isn't repeated in a second, near-identical strip further down the
 * page.
 */
export const RENTAL_VALUE_PROPS = [
  { title: "Free 100 KMs per day", body: "Maximize your savings and driving range with 100 free kilometres a day." },
  { title: "No booking fees", body: "Avoid the hassle of having to pay an additional fee to book your vehicle." },
  { title: "Short- & long-term rentals", body: "From a few days to an ongoing arrangement — whatever your business needs." },
  { title: "A variety of vehicles to choose from", body: "Vehicles with low, mid, and high roofs to suit your needs." },
] as const;

/**
 * "Why Choose Paradigm Truck Rental" (spec §8) — six verified points built
 * from the client's real rental proposition (100 KM/day, no booking fees,
 * short/long-term terms, the real fleet categories, custom upfitting, and
 * the business-first framing already established across this feature).
 * Replaces the older, overlapping "Built for Business" 4-point set with
 * one section rather than two that said nearly the same thing twice.
 */
export const RENTAL_WHY_CHOOSE = [
  { title: "Free 100 KM Per Day", body: "Get 100 kilometres per day included with your rental." },
  { title: "No Booking Fees", body: "Book without additional booking fees." },
  { title: "Flexible Rental Terms", body: "Options for short- and long-term commercial rental needs." },
  { title: "Commercial Vehicle Range", body: "Choose from cargo vans, cube trucks, dump trucks, HD trucks, refrigerated vehicles and pickups." },
  { title: "Custom Upfitting", body: "Need a vehicle configured for your work? Paradigm can support custom upfitting requirements." },
  { title: "Business-Focused Service", body: "Commercial rental support designed around business requirements." },
] as const;

/**
 * "More Than a Rental" upfitting/business-support section (spec §9) —
 * connects the rental flow to Paradigm Fleet's real, existing Upfitting
 * offering (`/services#upfitting`) rather than inventing a separate rental-
 * only upfit product. Highlight list is the same real upfit capability
 * described on the Services page, not a new invented catalog.
 */
export const RENTAL_UPFIT_HIGHLIGHTS = ["Custom Upfitting", "Shelving", "Ladder Racks", "Graphics & Accessories", "Commercial Vehicle Solutions"] as const;

/**
 * "Paradigm Fleet Ecosystem" (spec §10) — no verified partner/manufacturer/
 * finance-partner logos exist anywhere in this project or its documented
 * client sources (audited this pass: only the Paradigm Fleet logo itself
 * is present under public/images/logos/), so per the spec's explicit
 * fallback this is built from Paradigm Fleet's own real, verified internal
 * business lines instead of fabricated partner logos. Hrefs are the same
 * real routes used elsewhere in navigation (footerServiceNav,
 * ServicesGrid) — no new/duplicate destinations invented.
 */
export const RENTAL_ECOSYSTEM_LINES = [
  { title: "Rentals", body: "Short- and long-term commercial vehicle rentals.", href: "/rentals" },
  { title: "Sales", body: "New and pre-inspected commercial vehicles.", href: "/vehicles" },
  { title: "Leasing & Financing", body: "Solutions structured around how your business runs.", href: "/services#leasing-financing" },
  { title: "Upfitting", body: "Shelving, racking and custom builds, done in-house.", href: "/services#upfitting" },
  { title: "Service & Parts", body: "Maintenance, repairs and parts support.", href: "/contact" },
] as const;

/** "Rent Your Vehicle in Four Simple Steps" (spec §11) — the real user-facing flow, not the internal booking-step architecture. */
export const RENTAL_PROCESS_STEPS = [
  { step: "01", title: "Choose Your Vehicle", body: "Browse the fleet or pick a category to get started." },
  { step: "02", title: "Select Your Dates", body: "Tell us your pickup, return and location details." },
  { step: "03", title: "Complete Your Details", body: "Add your contact, license and driver information." },
  { step: "04", title: "Confirm Your Rental", body: "Review everything and confirm your reservation." },
] as const;

/**
 * The real rental fleet category names as listed on paradigmtruckrental.com
 * (verified this pass). No price, capacity, or spec fields are attached —
 * none are verified for this project's data, and the spec explicitly
 * forbids inventing them; VehicleCard-style cards are not used here since
 * sales fields (price, availability badge) don't apply to rental fleet.
 */
export const RENTAL_FLEET_CATEGORIES = [
  "Refrigerated Van",
  "16FT Cube Van",
  "Dump Truck",
  "HD Truck",
  "Mid Roof Cargo Van",
  "High Roof Cargo Van",
  "1/2 Ton Pickup Truck",
] as const;

