import type {
  PhotoCategory,
  TradeInConditionDetails,
  TradeInContact,
  TradeInVehicle,
} from "@/features/tradein/types/tradein.types";

/**
 * Vehicle/equipment types the appraisal form accepts (§10). Reuses the same
 * commercial-vehicle categories as the rest of the site (VEHICLE_INTEREST_OPTIONS)
 * plus "Heavy Equipment" and "Other" so the live business's equipment
 * trade-ins (loaders, dozers, skid steers, etc. — §2) stay supported without
 * hardcoding a fixed equipment-brand list the business doesn't actually use.
 */
export const TRADE_IN_TYPE_OPTIONS = [
  "Cargo Van",
  "Passenger Van",
  "Pickup Truck",
  "Cube / Box Truck",
  "Service Truck",
  "SUV",
  "Sedan",
  "Refrigerated / Other",
  "Heavy Equipment",
  "Other",
] as const;

/** Only Heavy Equipment shows Horsepower/Hours instead of the standard vehicle fields (§10/§12). */
export const EQUIPMENT_TYPE = "Heavy Equipment";

export const CONDITION_OPTIONS = ["Excellent", "Good", "Fair", "Poor"] as const;

export const CONTACT_METHOD_OPTIONS = ["Phone", "Email", "Either"] as const;

export const PHOTO_CATEGORIES: { id: PhotoCategory; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "rear", label: "Rear" },
  { id: "driverSide", label: "Driver Side" },
  { id: "passengerSide", label: "Passenger Side" },
  { id: "interior", label: "Interior" },
  { id: "cargo", label: "Cargo / Equipment Area" },
  { id: "damage", label: "Damage / Issue" },
];

export const EMPTY_TRADE_IN_VEHICLE: TradeInVehicle = {
  vin: "",
  type: "",
  condition: "",
  year: "",
  make: "",
  model: "",
  horsepower: "",
  hours: "",
  price: "",
};

export const EMPTY_TRADE_IN_CONDITION: TradeInConditionDetails = {
  exterior: "",
  interior: "",
  mechanical: "",
  tires: "",
  mileage: "",
  notes: "",
};

export const EMPTY_TRADE_IN_CONTACT: TradeInContact = {
  firstName: "",
  lastName: "",
  contactMethod: "",
  phone: "",
  email: "",
  message: "",
};

export const CONDITION_RATING_OPTIONS = ["Excellent", "Good", "Fair", "Poor", "Needs Repair"] as const;
