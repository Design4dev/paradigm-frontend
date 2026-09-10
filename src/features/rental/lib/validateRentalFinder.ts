import type { RentalContact, RentalFinderVehicle, StepErrors } from "@/features/rental/types/rental.types";

const PHONE_PATTERN = /^[0-9()+\-.\s]{7,}$/;

export function validateVehicleStep(vehicle: RentalFinderVehicle): StepErrors {
  const errors: StepErrors = {};
  if (!vehicle.type) errors.type = "Select a vehicle type.";
  return errors;
}

export function validateContactStep(contact: RentalContact): StepErrors {
  const errors: StepErrors = {};
  if (!contact.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!contact.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!contact.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!contact.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else if (!PHONE_PATTERN.test(contact.phone) || contact.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a valid phone number.";
  }
  return errors;
}

export function hasErrors(errors: StepErrors): boolean {
  return Object.keys(errors).length > 0;
}
