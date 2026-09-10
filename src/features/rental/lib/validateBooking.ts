import type { BookingStepErrors, RentalBookingState } from "@/features/rental/types/booking.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9()+\-.\s]{7,}$/;

export function hasBookingErrors(errors: BookingStepErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Reservation Search (spec §12/§13) — the same required-field set validated throughout this project. */
export function validateSearchStep(
  state: Pick<RentalBookingState, "pickupLocation" | "differentDropoff" | "dropoffLocation" | "pickupDate" | "pickupTime" | "returnDate" | "returnTime" | "age">
): BookingStepErrors {
  const errors: BookingStepErrors = {};
  if (!state.pickupLocation) errors.pickupLocation = "Select a pickup location.";
  if (state.differentDropoff && !state.dropoffLocation) errors.dropoffLocation = "Select a drop-off location.";
  if (!state.pickupDate) errors.pickupDate = "Select a pickup date.";
  if (!state.pickupTime) errors.pickupTime = "Select a pickup time.";
  if (!state.returnDate) errors.returnDate = "Select a return date.";
  if (!state.returnTime) errors.returnTime = "Select a return time.";
  if (state.pickupDate && state.returnDate && state.returnDate < state.pickupDate) {
    errors.returnDate = "Return date must be on or after the pickup date.";
  }
  if (!state.age) errors.age = "Select your age.";
  return errors;
}

function validateName(value: string, field: string, errors: BookingStepErrors, label: string) {
  if (!value.trim()) errors[field] = `Enter ${label}.`;
}
function validateEmailField(value: string, field: string, errors: BookingStepErrors) {
  if (!value.trim()) errors[field] = "Enter an email address.";
  else if (!EMAIL_PATTERN.test(value.trim())) errors[field] = "Enter a valid email address.";
}
function validatePhoneField(value: string, field: string, errors: BookingStepErrors) {
  if (!value.trim()) errors[field] = "Enter a phone number.";
  else if (!PHONE_PATTERN.test(value) || value.replace(/\D/g, "").length < 10) errors[field] = "Enter a valid phone number.";
}
function validateDateField(value: string, field: string, errors: BookingStepErrors, label: string) {
  if (!value) errors[field] = `Enter ${label}.`;
}

/**
 * Information step (spec §22/§24) — validates every section: Contact Info,
 * primary Driver's License Info, Personal Address, Additional Driver (only
 * when enabled), and the two required license-photo uploads. Insurance Card
 * is explicitly optional (§22F) and never required here.
 */
export function validateInformationStep(state: RentalBookingState): BookingStepErrors {
  const errors: BookingStepErrors = {};

  validateName(state.contact.firstName, "contact.firstName", errors, "your first name");
  validateName(state.contact.lastName, "contact.lastName", errors, "your last name");
  validatePhoneField(state.contact.phone, "contact.phone", errors);
  validateEmailField(state.contact.email, "contact.email", errors);

  validateDateField(state.primaryLicense.dateOfBirth, "primaryLicense.dateOfBirth", errors, "your date of birth");
  if (!state.primaryLicense.licenseNumber.trim()) errors["primaryLicense.licenseNumber"] = "Enter your driver's license number.";
  validateDateField(state.primaryLicense.licenseExpiry, "primaryLicense.licenseExpiry", errors, "your license expiry date");

  if (!state.address.address.trim()) errors["address.address"] = "Enter your street address.";
  if (!state.address.city.trim()) errors["address.city"] = "Enter your city.";
  if (!state.address.country.trim()) errors["address.country"] = "Enter your country.";
  if (!state.address.province.trim()) errors["address.province"] = "Enter your province/state.";
  if (!state.address.postalCode.trim()) errors["address.postalCode"] = "Enter your ZIP/postal code.";

  if (state.additionalDriverEnabled) {
    const d = state.additionalDriver;
    validateName(d.firstName, "additionalDriver.firstName", errors, "the additional driver's first name");
    validateName(d.lastName, "additionalDriver.lastName", errors, "the additional driver's last name");
    validatePhoneField(d.phone, "additionalDriver.phone", errors);
    validateEmailField(d.email, "additionalDriver.email", errors);
    validateDateField(d.dateOfBirth, "additionalDriver.dateOfBirth", errors, "the additional driver's date of birth");
    if (!d.licenseNumber.trim()) errors["additionalDriver.licenseNumber"] = "Enter the additional driver's license number.";
    validateDateField(d.licenseExpiry, "additionalDriver.licenseExpiry", errors, "the additional driver's license expiry date");
    validateDateField(d.licenseIssueDate, "additionalDriver.licenseIssueDate", errors, "the additional driver's license issue date");
  }

  if (!state.documents.licenseFront.fileName) errors["documents.licenseFront"] = "Upload the front of your driver's license.";
  if (!state.documents.licenseBack.fileName) errors["documents.licenseBack"] = "Upload the back of your driver's license.";

  return errors;
}

export function validateTermsAcceptance(state: Pick<RentalBookingState, "termsAccepted">): BookingStepErrors {
  const errors: BookingStepErrors = {};
  if (!state.termsAccepted) errors.termsAccepted = "You must agree to the rental terms to continue.";
  return errors;
}
