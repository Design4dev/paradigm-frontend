/** Trade-In Appraisal data model (page-05-trade-in-appraisal.md §28/§38). */

export type TradeInStep = "vehicle" | "condition" | "photos" | "contact" | "review";

export type SubmissionState = "idle" | "validating" | "submitting" | "success" | "error";

export type VehicleLookupMode = "vin" | "manual";

export interface TradeInVehicle {
  vin: string;
  type: string;
  condition: string;
  year: string;
  make: string;
  model: string;
  horsepower: string;
  hours: string;
  price: string;
}

export interface TradeInConditionDetails {
  exterior: string;
  interior: string;
  mechanical: string;
  tires: string;
  mileage: string;
  notes: string;
}

export type PhotoCategory =
  | "front"
  | "rear"
  | "driverSide"
  | "passengerSide"
  | "interior"
  | "cargo"
  | "damage";

export type PhotoUploadStatus = "uploading" | "uploaded" | "error";

export interface TradeInPhoto {
  id: string;
  category: PhotoCategory;
  fileName: string;
  status: PhotoUploadStatus;
  /** Local object URL for the preview thumbnail — revoked on removal. */
  previewUrl: string;
}

export interface TradeInContact {
  firstName: string;
  lastName: string;
  contactMethod: string;
  phone: string;
  email: string;
  message: string;
}

export interface TradeInReplacementVehicle {
  slug: string;
  name: string;
  priceLabel: string;
  imageUrl?: string;
}

export interface TradeInRequest {
  vehicle: TradeInVehicle;
  condition: TradeInConditionDetails;
  contact: TradeInContact;
  photos?: { category: PhotoCategory; fileName: string }[];
  replacementVehicle?: TradeInReplacementVehicle | null;
}

export interface TradeInResult {
  id: string;
}

export type StepErrors = Partial<
  Record<keyof TradeInVehicle | keyof TradeInConditionDetails | keyof TradeInContact, string>
>;
