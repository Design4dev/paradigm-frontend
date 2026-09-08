export type VehicleAvailability = "available" | "limited" | "reserved" | "coming-soon";

export type VehicleType =
  | "Cargo Van"
  | "Passenger Van"
  | "Pickup Truck"
  | "Box Truck"
  | "SUV"
  | "Sedan"
  | "Electric";

export interface VehicleSpec {
  label: string;
  value: string;
  /** Name of the icon rendered in the specs grid, resolved by VehicleSpecs. */
  icon: SpecIconName;
}

export type SpecIconName =
  | "transmission"
  | "fuel"
  | "seats"
  | "mileage"
  | "body"
  | "drivetrain"
  | "dimensions"
  | "engine"
  | "color"
  | "identifier";

export interface VehicleImage {
  url: string;
  alt: string;
}

/** One "Key Features" highlight card (page-03-vdp.md §14) — image + short elaboration of a real feature. */
export interface VehicleKeyFeature {
  title: string;
  description: string;
}

export interface Vehicle {
  slug: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  /** Numeric full purchase price (CAD) used for sorting/filtering/comparison. */
  price: number;
  priceLabel: string;
  availability: VehicleAvailability;
  /** Drives the "New" badge on cards (page-01-homepage.md §12). */
  isNew?: boolean;
  location: string;
  images: VehicleImage[];
  specs: VehicleSpec[];
  features: string[];
  description: string;
  /** "Why Choose This Vehicle?" checklist on the VDP Overview (page-03-vdp.md §12) — distinct from `features`. */
  whyChoose?: string[];
  /** VDP "Key Features" visual cards (page-03-vdp.md §14) — paired with the vehicle's own gallery photos. */
  keyFeatures?: VehicleKeyFeature[];
  stockNumber?: string;
  vin?: string;
  exteriorColor?: string;
  interiorColor?: string;
  /** Only set true where a real 360° capture exists — never inferred (page-03-vdp.md §9/§31). */
  has360Tour?: boolean;
  cta: {
    label: string;
    secondaryLabel: string;
  };
}
