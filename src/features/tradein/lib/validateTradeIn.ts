import { EQUIPMENT_TYPE } from "@/features/tradein/config/tradein.config";
import type {
  StepErrors,
  TradeInConditionDetails,
  TradeInContact,
  TradeInVehicle,
  VehicleLookupMode,
} from "@/features/tradein/types/tradein.types";

const PHONE_PATTERN = /^[0-9()+\-.\s]{7,}$/;
const CURRENT_YEAR = new Date().getFullYear();

/** Step 1 — Vehicle Information (§10/§20). VIN mode only requires the VIN itself; manual mode requires the core fields. */
export function validateVehicleStep(vehicle: TradeInVehicle, mode: VehicleLookupMode): StepErrors {
  const errors: StepErrors = {};

  if (mode === "vin") {
    const vin = vehicle.vin.trim();
    if (!vin) {
      errors.vin = "Enter your 17-character VIN.";
    } else if (vin.length !== 17) {
      errors.vin = "A VIN is 17 characters.";
    }
    return errors;
  }

  if (!vehicle.type.trim()) errors.type = "Select a vehicle or equipment type.";
  if (!vehicle.condition.trim()) errors.condition = "Select a condition.";

  const year = Number(vehicle.year);
  if (!vehicle.year.trim() || !Number.isInteger(year) || year < 1980 || year > CURRENT_YEAR + 1) {
    errors.year = `Enter a valid year (1980–${CURRENT_YEAR + 1}).`;
  }

  if (!vehicle.make.trim()) errors.make = "Enter the make.";
  if (!vehicle.model.trim()) errors.model = "Enter the model.";

  if (vehicle.price.trim()) {
    const price = Number(vehicle.price);
    if (!Number.isFinite(price) || price < 0) errors.price = "Enter a valid price.";
  }

  if (vehicle.type === EQUIPMENT_TYPE) {
    if (vehicle.horsepower.trim() && (!Number.isFinite(Number(vehicle.horsepower)) || Number(vehicle.horsepower) < 0)) {
      errors.horsepower = "Enter a valid horsepower.";
    }
    if (vehicle.hours.trim() && (!Number.isFinite(Number(vehicle.hours)) || Number(vehicle.hours) < 0)) {
      errors.hours = "Enter valid hours.";
    }
  }

  return errors;
}

/** Step 2 — Condition (§12/§20): only condition rating fields are required; notes stay optional. */
export function validateConditionStep(condition: TradeInConditionDetails): StepErrors {
  const errors: StepErrors = {};
  if (!condition.exterior.trim()) errors.exterior = "Select the exterior condition.";
  if (!condition.interior.trim()) errors.interior = "Select the interior condition.";
  if (!condition.mechanical.trim()) errors.mechanical = "Select the mechanical condition.";
  return errors;
}

/** Step 4 — Contact Information (§15/§20). */
export function validateContactStep(contact: TradeInContact): StepErrors {
  const errors: StepErrors = {};

  if (!contact.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!contact.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!contact.contactMethod.trim()) errors.contactMethod = "Select how we should reach you.";

  const wantsPhone = contact.contactMethod !== "Email";
  const wantsEmail = contact.contactMethod !== "Phone";

  if (wantsPhone) {
    if (!contact.phone.trim()) {
      errors.phone = "Enter your phone number.";
    } else if (!PHONE_PATTERN.test(contact.phone) || contact.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  if (wantsEmail) {
    if (!contact.email.trim()) {
      errors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
  }

  return errors;
}

export function hasErrors(errors: StepErrors): boolean {
  return Object.values(errors).some(Boolean);
}
