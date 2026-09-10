/**
 * Rental architecture (design.md §7). No rental-specific data model exists
 * anywhere in this project (no daily/weekly rate, no availability calendar)
 * — the Vehicle type (features/vehicles/types/vehicle.types.ts) is reused
 * as-is for "what fleet is available," and this feature only adds the
 * front-end guided-qualification + structured-lead shape around it.
 */

/**
 * Find Your Fleet (spec §8, full-page rebuild pass) — a short, optional
 * category recommender: two one-tap questions, then a result that hands
 * off to `/rentals/search`, the SAME Reservation Search every other
 * "Rent It" uses. Previously had a third "details" step that collected
 * timing + contact directly in the finder — dropped, since Search/
 * Information collect both later and asking twice was redundant.
 */
export type RentalFinderStep = "vehicle-type" | "use-case" | "results";

/** Why the visitor needs a rental — informs copy/urgency framing only, never a hidden score. */
export type RentalUseCase =
  | "Seasonal / Peak Season"
  | "Fleet Vehicle Down for Repair"
  | "Short-Term Project"
  | "Trying Before You Buy"
  | "Other";

export interface RentalFinderVehicle {
  /** One of `RENTAL_FLEET_CATEGORIES` — the real, verified rental fleet category names. */
  type: string;
}

export interface RentalFinderDuration {
  /** ISO date string (yyyy-mm-dd) from a native date input — optional, visitor may not have an exact date yet. */
  startDate: string;
  /** Plain label, not a computed value — options come from RENTAL_DURATION_OPTIONS. */
  duration: string;
}

export interface RentalContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
}

export type StepErrors = Partial<Record<keyof RentalFinderVehicle | keyof RentalContact, string>>;

/** Structured lead metadata the finder produces — a real backend scoring/routing engine (Phase 2) would consume this; no scoring happens here. */
export interface RentalFinderRequest {
  useCase: RentalUseCase | null;
  vehicle: RentalFinderVehicle;
  durationInfo: RentalFinderDuration;
  contact: RentalContact;
}

export type SubmissionState = "idle" | "submitting" | "success" | "error";

export interface RentalQuoteRequest {
  contact: RentalContact;
  vehicleType: string;
  durationInfo: RentalFinderDuration;
  useCase: RentalUseCase | null;
  /** Present when the quote was requested against a specific matched/VDP vehicle. */
  vehicleSlug?: string | null;
  vehicleName?: string | null;
  message: string;
}

export interface RentalQuoteResult {
  id: string;
}
