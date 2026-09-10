/**
 * Native Paradigm Fleet rental experience — three distinct page-level
 * stops, not a modal/iframe (design.md §7, full-page rebuild pass):
 *
 *   /rentals              Landing — categories + fleet, discovery only
 *   /rentals/search       Reservation Search (dedicated page)
 *   /rentals/search/results  Vehicle results for that search
 *   /rentals/book          Booking process (Add-ons → Coverage → Information → Payment)
 *   /rentals/confirmation  Confirmation (its own route, real-success-gated)
 *
 * The booking-process stepper itself only cycles through the 4 in-page
 * steps below — Confirmation is a fifth stepper position but lives on its
 * own route, reached only after `createBooking()` genuinely succeeds.
 */
export type BookingStepId = "addons" | "coverage" | "information" | "payment";

/** All 5 positions the stepper visualizes, including the route-level Confirmation step. */
export type BookingStepperPosition = BookingStepId | "confirmation";

/**
 * The real rental fleet catalog — verified directly from the client's live
 * Apprentall booking engine (book.apprentall.cloud/?clientid=1923) and
 * paradigmtruckrental.com: category names, "similar to" descriptors,
 * Doors/Seats/Baggage counts, and photography are all real, observed
 * values, not invented. In this project's verified data, a "category" and
 * a "vehicle" are the same real-world entity — the client's fleet is
 * organized as one representative vehicle per category, not many individual
 * units per category — so `RentalCategory` and `RentalFleetVehicle` share
 * one id space (a category's `slug` is the vehicle's `slug`).
 */
export interface RentalFleetVehicle {
  slug: string;
  name: string;
  /** e.g. "Similar to Ford Transit Medium Roof with Reefer" — real text observed in the live booking engine for this category. */
  descriptor: string;
  image: { url: string; alt: string };
  /** Verified physical attributes (doors/seats/baggage) as shown in the live booking engine — not specs invented for this project. */
  attributes: { label: string; value: string }[];
}

/** A rental category is this project's real fleet catalog, viewed as a compact filter — not a second, invented taxonomy. */
export type RentalCategory = Pick<RentalFleetVehicle, "slug" | "name" | "image">;

/** Data-driven Add-on/Coverage line item shape — populated once the real catalog is confirmed; empty today (see rentalAvailability.service.ts). */
export interface RentalAddOn {
  id: string;
  name: string;
  description?: string;
}

/** Section A — Contact Info (spec §22A): exactly the 4 fields confirmed, no company name — this isn't the same section as the shared `RentalContact` used elsewhere in the site. */
export interface RentalContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export const EMPTY_CONTACT_INFO: RentalContactInfo = { firstName: "", lastName: "", phone: "", email: "" };

/** Section B — Driver's License Info for the primary contact (spec §22B): exactly the 3 fields confirmed. */
export interface RentalPrimaryLicense {
  dateOfBirth: string;
  licenseNumber: string;
  licenseExpiry: string;
}

export const EMPTY_PRIMARY_LICENSE: RentalPrimaryLicense = { dateOfBirth: "", licenseNumber: "", licenseExpiry: "" };

/** Section C — Additional Driver (optional, spec §22C): the fuller field set, including License Issue Date (not present on the primary contact's section). */
export interface RentalAdditionalDriver {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  licenseNumber: string;
  licenseExpiry: string;
  licenseIssueDate: string;
}

export const EMPTY_ADDITIONAL_DRIVER: RentalAdditionalDriver = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  licenseNumber: "",
  licenseExpiry: "",
  licenseIssueDate: "",
};

export interface RentalPersonalAddress {
  address: string;
  city: string;
  country: string;
  province: string;
  postalCode: string;
}

export const EMPTY_PERSONAL_ADDRESS: RentalPersonalAddress = { address: "", city: "", country: "", province: "", postalCode: "" };

/**
 * A locally-selected document (license/insurance card, front or back).
 * There is no document-upload backend connected — `file`/`previewUrl` stay
 * entirely local (a `URL.createObjectURL` preview, never transmitted) until
 * a real upload service exists (see `rentalDocument.service.ts`).
 */
export interface RentalDocumentSlot {
  file: File | null;
  fileName: string | null;
  previewUrl: string | null;
}

export function emptyDocumentSlot(): RentalDocumentSlot {
  return { file: null, fileName: null, previewUrl: null };
}

export interface RentalDocuments {
  licenseFront: RentalDocumentSlot;
  licenseBack: RentalDocumentSlot;
  insuranceCardFront: RentalDocumentSlot;
  insuranceCardBack: RentalDocumentSlot;
}

export type BookingSubmissionStatus = "idle" | "submitting" | "success" | "error";

/**
 * One centralized state (spec §31) — never scattered across page
 * components. Lives in a non-persisted Zustand store so it survives
 * client-side navigation between `/rentals/search` → `/results` → `/book`
 * → `/confirmation` (all client-side transitions in the same SPA session)
 * without ever being written to disk — a booking flow carries PII and,
 * transiently in the Payment step's own local state only, card input, so it
 * must not silently survive a shared machine's next browser session. A hard
 * refresh mid-flow resets it by design; pages that require prior state
 * (e.g. `/rentals/book` requires a selected vehicle) redirect back rather
 * than rendering broken/empty state.
 */
export interface RentalBookingState {
  // Category / vehicle context — set on the Landing page or a Search
  // Result, carried through Search → Results → Booking.
  selectedCategory: string | null;
  selectedVehicle: RentalFleetVehicle | null;

  // Reservation Search — the verified field set.
  pickupLocation: string;
  differentDropoff: boolean;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  age: string;
  promoCode: string;
  searchSubmitted: boolean;

  // Booking process
  currentStep: BookingStepId;
  furthestStepIndex: number;

  selectedAddonIds: string[];
  selectedCoverageId: string | null;

  contact: RentalContactInfo;
  primaryLicense: RentalPrimaryLicense;
  additionalDriverEnabled: boolean;
  additionalDriver: RentalAdditionalDriver;
  address: RentalPersonalAddress;
  documents: RentalDocuments;
  termsAccepted: boolean;

  submission: {
    status: BookingSubmissionStatus;
    referenceId: string | null;
    error: string | null;
  };
}

export type BookingStepErrors = Partial<Record<string, string>>;
