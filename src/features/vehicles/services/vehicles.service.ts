import { PHOTO_IDS, vehicleImageSet } from "@/features/vehicles/config/images.config";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/**
 * Mock, API-ready vehicle dataset for the prototype.
 *
 * Every field a real dealership/fleet API would return is modeled here
 * (slug, brand, model, year, type, price, availability, location, images,
 * specs, features, description, CTA copy) so this module is the only place
 * that needs to change when a real inventory feed replaces it. Pricing is
 * full purchase price in CAD (not monthly) and mileage is in km, matching
 * Paradigm Fleet's actual Hamilton, ON dealership model (page-01-homepage.md
 * §12 — "New" badge, price, mileage + key specs, dual CTA).
 */
export const vehicles: Vehicle[] = [
  {
    slug: "ford-transit-cargo-350",
    brand: "Ford",
    model: "Transit Cargo Van",
    year: 2024,
    type: "Cargo Van",
    price: 42970,
    priceLabel: "$42,970",
    availability: "available",
    isNew: true,
    location: "Hamilton, ON",
    images: vehicleImageSet(
      PHOTO_IDS.fordTransitCargoVan,
      PHOTO_IDS.fordTransitCargoVan,
      PHOTO_IDS.fordTransitCargoVan,
      "Ford Transit Cargo Van"
    ),
    specs: [
      { label: "Transmission", value: "Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Gas", icon: "fuel" },
      { label: "Seats", value: "2", icon: "seats" },
      { label: "Mileage", value: "12,500 km", icon: "mileage" },
      { label: "Body Type", value: "Extended Cargo Van", icon: "body" },
      { label: "Drivetrain", value: "RWD", icon: "drivetrain" },
      { label: "Cargo Volume", value: "487.3 cu ft", icon: "dimensions" },
      { label: "Engine", value: "3.5L V6", icon: "engine" },
      { label: "Exterior Color", value: "Oxford White", icon: "color" },
      { label: "Interior Color", value: "Dark Palazzo Grey", icon: "color" },
      { label: "Stock Number", value: "PF-FT-2024-001", icon: "identifier" },
      { label: "VIN", value: "1FTBR1C8XRKA1234S", icon: "identifier" },
    ],
    features: [
      "Backup camera",
      "Adaptive cruise control",
      "Shelving-ready interior",
      "Bluetooth & CarPlay",
      "Lane-keep assist",
      "Tow package",
      "Keyless entry",
      "LED cargo lighting",
    ],
    description:
      "The Transit Cargo Van is our most requested work van for last-mile delivery and trades businesses across Southern Ontario. A flat, shelving-ready interior makes it easy to upfit for your operation, and it's ready for immediate delivery out of our Hamilton yard.",
    whyChoose: [
      "Low mileage and excellent condition",
      "Ideal for a wide range of businesses",
      "Backed by Ford's proven reliability",
      "Financing and upfitting options available",
    ],
    keyFeatures: [
      { title: "Spacious Cargo Area", description: "Ample room for tools, equipment, and more." },
      { title: "Advanced Safety", description: "Pre-Collision Assist, Lane-Keeping System." },
      { title: "Modern Interior", description: "Comfortable and functional cabin." },
      { title: "Technology", description: "SYNC® 4 with 12\" touchscreen." },
    ],
    stockNumber: "PF-FT-2024-001",
    vin: "1FTBR1C8XRKA1234S",
    exteriorColor: "Oxford White",
    interiorColor: "Dark Palazzo Grey",
    cta: { label: "Request a Quote", secondaryLabel: "Talk to Fleet Sales" },
  },
  {
    slug: "ford-transit-cargo-350-mid",
    brand: "Ford",
    model: "Transit Cargo Van",
    year: 2024,
    type: "Cargo Van",
    price: 42990,
    priceLabel: "$42,990",
    availability: "available",
    isNew: true,
    location: "Hamilton, ON",
    images: vehicleImageSet(
      PHOTO_IDS.fordTransitCargoVan,
      PHOTO_IDS.fordTransitCargoVan,
      PHOTO_IDS.fordTransitCargoVan,
      "Ford Transit Cargo Van — mid-roof"
    ),
    specs: [
      { label: "Transmission", value: "Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Gas", icon: "fuel" },
      { label: "Seats", value: "2", icon: "seats" },
      { label: "Mileage", value: "12,500 km", icon: "mileage" },
      { label: "Body Type", value: "Mid-Roof Cargo Van", icon: "body" },
      { label: "Drivetrain", value: "RWD", icon: "drivetrain" },
      { label: "Cargo Volume", value: "406.9 cu ft", icon: "dimensions" },
      { label: "Engine", value: "3.5L V6", icon: "engine" },
      { label: "Exterior Color", value: "Oxford White", icon: "color" },
      { label: "Interior Color", value: "Dark Palazzo Grey", icon: "color" },
      { label: "Stock Number", value: "PF-FT-2024-002", icon: "identifier" },
      { label: "VIN", value: "1FTBR1C85RKA23456", icon: "identifier" },
    ],
    features: [
      "Backup camera",
      "Adaptive cruise control",
      "Shelving-ready interior",
      "Bluetooth & CarPlay",
      "Lane-keep assist",
      "Tow package",
      "Keyless entry",
      "LED cargo lighting",
    ],
    description:
      "A mid-roof Transit Cargo Van sized for trades and courier fleets that need standing headroom without the full extended-body footprint. Upfit-ready and staged for quick delivery.",
    whyChoose: [
      "Standing headroom without the extended-body footprint",
      "Easier to maneuver on tight urban routes",
      "Backed by Ford's proven reliability",
      "Financing and upfitting options available",
    ],
    keyFeatures: [
      { title: "Standing Headroom", description: "Mid-roof cabin sized for daily in-and-out work." },
      { title: "Advanced Safety", description: "Pre-Collision Assist, Lane-Keeping System." },
      { title: "Modern Interior", description: "Comfortable and functional cabin." },
      { title: "Technology", description: "SYNC® 4 with 12\" touchscreen." },
    ],
    stockNumber: "PF-FT-2024-002",
    vin: "1FTBR1C85RKA23456",
    exteriorColor: "Oxford White",
    interiorColor: "Dark Palazzo Grey",
    cta: { label: "Request a Quote", secondaryLabel: "Talk to Fleet Sales" },
  },
  {
    slug: "mercedes-sprinter-passenger",
    brand: "Mercedes-Benz",
    model: "Sprinter Passenger 2500",
    year: 2024,
    type: "Passenger Van",
    price: 61988,
    priceLabel: "$61,988",
    availability: "limited",
    isNew: true,
    location: "Burlington, ON",
    images: vehicleImageSet(
      PHOTO_IDS.passengerVanFront,
      PHOTO_IDS.passengerVanSide,
      PHOTO_IDS.passengerVanInterior,
      "Mercedes-Benz Sprinter Passenger 2500"
    ),
    specs: [
      { label: "Transmission", value: "Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Diesel", icon: "fuel" },
      { label: "Seats", value: "12", icon: "seats" },
      { label: "Mileage", value: "1,240 km", icon: "mileage" },
      { label: "Body Type", value: "High-Roof Passenger Van", icon: "body" },
      { label: "Drivetrain", value: "RWD", icon: "drivetrain" },
      { label: "Dimensions", value: "233\" L x 82\" H", icon: "dimensions" },
      { label: "Engine", value: "2.0L I4 Turbo Diesel", icon: "engine" },
      { label: "Exterior Color", value: "Arctic White", icon: "color" },
      { label: "Interior Color", value: "Titanium Black", icon: "color" },
      { label: "Stock Number", value: "PF-MB-2024-003", icon: "identifier" },
      { label: "VIN", value: "WD3PE7CD5RP123456", icon: "identifier" },
    ],
    features: [
      "12-passenger seating",
      "Dual-zone climate control",
      "Standing headroom",
      "Reverse assist camera",
      "Crosswind assist",
      "Power sliding door",
      "USB charging (all rows)",
      "Wheelchair-accessible option",
    ],
    description:
      "Built for shuttle, crew and group-transport contracts, the Sprinter Passenger 2500 combines high-roof standing room with a diesel drivetrain built for long duty cycles. Limited availability this quarter.",
    whyChoose: [
      "High-roof standing room for crew and passengers",
      "Diesel drivetrain built for long duty cycles",
      "Backed by Mercedes-Benz commercial reliability",
      "Financing and upfitting options available",
    ],
    keyFeatures: [
      { title: "12-Passenger Seating", description: "Configurable rows for shuttle and crew transport." },
      { title: "Crosswind Assist", description: "Stability control tuned for highway duty cycles." },
      { title: "Standing Headroom", description: "High-roof cabin for comfortable boarding." },
      { title: "Dual-Zone Climate", description: "Separate front/rear climate control." },
    ],
    stockNumber: "PF-MB-2024-003",
    vin: "WD3PE7CD5RP123456",
    exteriorColor: "Arctic White",
    interiorColor: "Titanium Black",
    cta: { label: "Request a Quote", secondaryLabel: "Talk to Fleet Sales" },
  },
  {
    slug: "ram-1500-tradesman",
    brand: "RAM",
    model: "1500 Tradesman",
    year: 2024,
    type: "Pickup Truck",
    price: 51988,
    priceLabel: "$51,988",
    availability: "available",
    isNew: true,
    location: "Kitchener, ON",
    images: vehicleImageSet(PHOTO_IDS.pickupFront, PHOTO_IDS.pickupSide, PHOTO_IDS.pickupInterior, "RAM 1500 Tradesman"),
    specs: [
      { label: "Transmission", value: "Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Gas", icon: "fuel" },
      { label: "Seats", value: "6", icon: "seats" },
      { label: "Mileage", value: "12 km", icon: "mileage" },
      { label: "Body Type", value: "Crew Cab, 6'4\" Bed", icon: "body" },
      { label: "Drivetrain", value: "4WD", icon: "drivetrain" },
      { label: "Towing Capacity", value: "11,050 lb", icon: "dimensions" },
      { label: "Engine", value: "5.7L HEMI V8", icon: "engine" },
      { label: "Exterior Color", value: "Bright White", icon: "color" },
      { label: "Interior Color", value: "Diesel Gray/Black", icon: "color" },
      { label: "Stock Number", value: "PF-RM-2024-004", icon: "identifier" },
      { label: "VIN", value: "1C6SRFFT5RN123456", icon: "identifier" },
    ],
    features: [
      "Tow/haul mode",
      "Spray-in bedliner",
      "Trailer brake controller",
      "Remote start",
      "Bed-mounted tie-downs",
      "Upfit-ready wiring",
      "Backup camera with hitch guidance",
      "Skid plates",
    ],
    description:
      "A dependable crew-cab workhorse for trades, utilities and field-service teams. The Tradesman ships upfit-ready with pre-wired accessory circuits, so racks, toolboxes and lighting go on fast without custom electrical work.",
    whyChoose: [
      "11,050 lb towing capacity for trailers and equipment",
      "Upfit-ready wiring for racks, toolboxes and lighting",
      "Backed by RAM's commercial-duty reliability",
      "Financing and upfitting options available",
    ],
    keyFeatures: [
      { title: "Tow/Haul Mode", description: "Trailer brake controller and hitch-guided backup camera." },
      { title: "Spray-In Bedliner", description: "Protects the bed under daily job-site loads." },
      { title: "Crew Cab Comfort", description: "Seating for six with remote start." },
      { title: "Skid Plates", description: "Underbody protection for rough-terrain job sites." },
    ],
    stockNumber: "PF-RM-2024-004",
    vin: "1C6SRFFT5RN123456",
    exteriorColor: "Bright White",
    interiorColor: "Diesel Gray/Black",
    cta: { label: "Request a Quote", secondaryLabel: "Talk to Fleet Sales" },
  },
  {
    slug: "isuzu-npr-box-truck",
    brand: "Isuzu",
    model: "NPR Box Truck 16'",
    year: 2023,
    type: "Box Truck",
    price: 68500,
    priceLabel: "$68,500",
    availability: "available",
    location: "Cambridge, ON",
    images: vehicleImageSet(
      PHOTO_IDS.boxTruckFront,
      PHOTO_IDS.boxTruckSide,
      PHOTO_IDS.boxTruckInterior,
      "Isuzu NPR Box Truck 16 foot"
    ),
    specs: [
      { label: "Transmission", value: "Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Diesel", icon: "fuel" },
      { label: "Seats", value: "3", icon: "seats" },
      { label: "Mileage", value: "3,610 km", icon: "mileage" },
      { label: "Body Type", value: "16' Dry Van Box", icon: "body" },
      { label: "Drivetrain", value: "RWD", icon: "drivetrain" },
      { label: "Payload", value: "7,650 lb", icon: "dimensions" },
      { label: "Engine", value: "3.0L I4 Turbo Diesel", icon: "engine" },
      { label: "Exterior Color", value: "Oxford White", icon: "color" },
      { label: "Interior Color", value: "Gray Vinyl", icon: "color" },
      { label: "Stock Number", value: "PF-IS-2023-005", icon: "identifier" },
      { label: "VIN", value: "JALC4B168P7012345", icon: "identifier" },
    ],
    features: [
      "16 ft aluminum dry box",
      "Roll-up rear door",
      "Load lock rails",
      "Backup camera",
      "Air-ride driver seat",
      "Liftgate-ready chassis",
      "Bluetooth handsfree",
      "Fleet telematics ready",
    ],
    description:
      "A dry-freight box truck sized for regional distribution and moving/logistics operators. Load lock rails and a roll-up rear door keep loading fast, and the chassis is liftgate-ready if your route needs one.",
    whyChoose: [
      "16 ft aluminum box with 7,650 lb payload",
      "Liftgate-ready chassis for route flexibility",
      "Backed by Isuzu's proven diesel reliability",
      "Financing and upfitting options available",
    ],
    keyFeatures: [
      { title: "16 ft Dry Box", description: "Load lock rails and a roll-up rear door for fast loading." },
      { title: "Liftgate-Ready", description: "Chassis pre-configured for a liftgate install." },
      { title: "Air-Ride Seat", description: "Driver comfort on long regional routes." },
      { title: "Fleet Telematics Ready", description: "Wired for tracking and diagnostics add-ons." },
    ],
    stockNumber: "PF-IS-2023-005",
    vin: "JALC4B168P7012345",
    exteriorColor: "Oxford White",
    interiorColor: "Gray Vinyl",
    cta: { label: "Request a Quote", secondaryLabel: "Talk to Fleet Sales" },
  },
  {
    slug: "toyota-rav4-fleet",
    brand: "Toyota",
    model: "RAV4 Fleet",
    year: 2024,
    type: "SUV",
    price: 38900,
    priceLabel: "$38,900",
    availability: "available",
    isNew: true,
    location: "Waterloo, ON",
    images: vehicleImageSet(PHOTO_IDS.suvFront, PHOTO_IDS.suvSide, PHOTO_IDS.suvInterior, "Toyota RAV4 Fleet"),
    specs: [
      { label: "Transmission", value: "Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Hybrid", icon: "fuel" },
      { label: "Seats", value: "5", icon: "seats" },
      { label: "Mileage", value: "20 km", icon: "mileage" },
      { label: "Body Type", value: "Compact SUV", icon: "body" },
      { label: "Drivetrain", value: "AWD", icon: "drivetrain" },
      { label: "Cargo Volume", value: "37.6 cu ft", icon: "dimensions" },
      { label: "Engine", value: "2.5L Hybrid I4", icon: "engine" },
      { label: "Exterior Color", value: "Magnetic Gray Metallic", icon: "color" },
      { label: "Interior Color", value: "Black SofTex", icon: "color" },
      { label: "Stock Number", value: "PF-TY-2024-006", icon: "identifier" },
      { label: "VIN", value: "2T3P1RFV8RW123456", icon: "identifier" },
    ],
    features: [
      "Toyota Safety Sense 3.0",
      "Hybrid fuel efficiency",
      "Apple CarPlay & Android Auto",
      "Blind spot monitor",
      "Heated front seats",
      "Power liftgate",
      "AWD traction",
      "Wireless charging pad",
    ],
    description:
      "A fuel-efficient AWD SUV for field reps, inspectors and management fleets that need comfort and reliability without cargo-van bulk. Hybrid drivetrain keeps fuel costs down across high-mileage territories.",
    whyChoose: [
      "Hybrid fuel efficiency across high-mileage territories",
      "AWD traction for year-round Ontario driving",
      "Backed by Toyota Safety Sense 3.0",
      "Financing options available for fleet accounts",
    ],
    keyFeatures: [
      { title: "Hybrid Efficiency", description: "Lower fuel cost-per-km across territory routes." },
      { title: "Toyota Safety Sense 3.0", description: "Full active-safety suite standard." },
      { title: "AWD Traction", description: "Confident handling in all conditions." },
      { title: "Wireless CarPlay", description: "Apple CarPlay & Android Auto, no cables needed." },
    ],
    stockNumber: "PF-TY-2024-006",
    vin: "2T3P1RFV8RW123456",
    exteriorColor: "Magnetic Gray Metallic",
    interiorColor: "Black SofTex",
    cta: { label: "Request a Quote", secondaryLabel: "Talk to Fleet Sales" },
  },
  {
    slug: "honda-accord-sedan",
    brand: "Honda",
    model: "Accord Sedan",
    year: 2024,
    type: "Sedan",
    price: 34500,
    priceLabel: "$34,500",
    availability: "available",
    isNew: true,
    location: "Hamilton, ON",
    images: vehicleImageSet(PHOTO_IDS.sedanFront, PHOTO_IDS.sedanSide, PHOTO_IDS.sedanInterior, "Honda Accord Sedan"),
    specs: [
      { label: "Transmission", value: "CVT Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Gas", icon: "fuel" },
      { label: "Seats", value: "5", icon: "seats" },
      { label: "Mileage", value: "15 km", icon: "mileage" },
      { label: "Body Type", value: "Mid-Size Sedan", icon: "body" },
      { label: "Drivetrain", value: "FWD", icon: "drivetrain" },
      { label: "Trunk Volume", value: "16.7 cu ft", icon: "dimensions" },
      { label: "Engine", value: "1.5L Turbo I4", icon: "engine" },
      { label: "Exterior Color", value: "Platinum White Pearl", icon: "color" },
      { label: "Interior Color", value: "Black Cloth", icon: "color" },
      { label: "Stock Number", value: "PF-HD-2024-007", icon: "identifier" },
      { label: "VIN", value: "1HGCV1F34RA123456", icon: "identifier" },
    ],
    features: [
      "Honda Sensing suite",
      "Lane keep assist",
      "Adaptive cruise control",
      "Wireless Apple CarPlay",
      "Remote engine start",
      "Heated front seats",
      "Low cost-per-km",
      "Corporate lease terms",
    ],
    description:
      "A low cost-per-km sedan for daily-use business fleets — sales territory coverage, executive pool cars and corporate lease programs where fuel economy and reliability matter most.",
    whyChoose: [
      "Low cost-per-km for daily territory coverage",
      "Honda Sensing suite standard on every trim",
      "Backed by Honda's proven reliability",
      "Corporate lease terms available",
    ],
    keyFeatures: [
      { title: "Honda Sensing", description: "Adaptive cruise control and lane keep assist standard." },
      { title: "Fuel Economy", description: "Low cost-per-km for high-mileage territory reps." },
      { title: "Wireless CarPlay", description: "Apple CarPlay & Android Auto, no cables needed." },
      { title: "Corporate Lease Ready", description: "Terms structured for pool-car programs." },
    ],
    stockNumber: "PF-HD-2024-007",
    vin: "1HGCV1F34RA123456",
    exteriorColor: "Platinum White Pearl",
    interiorColor: "Black Cloth",
    cta: { label: "Request a Quote", secondaryLabel: "Talk to Fleet Sales" },
  },
  {
    slug: "ford-e-series-cutaway",
    brand: "Ford",
    model: "E-Series Cutaway",
    year: 2023,
    type: "Box Truck",
    price: 58900,
    priceLabel: "$58,900",
    availability: "coming-soon",
    location: "Toronto, ON",
    images: vehicleImageSet(PHOTO_IDS.evFront, PHOTO_IDS.evSide, PHOTO_IDS.evInterior, "Ford E-Series Cutaway refrigerated body"),
    specs: [
      { label: "Transmission", value: "Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Gas", icon: "fuel" },
      { label: "Seats", value: "2", icon: "seats" },
      { label: "Range", value: "N/A", icon: "mileage" },
      { label: "Body Type", value: "Refrigerated Truck", icon: "body" },
      { label: "Drivetrain", value: "RWD", icon: "drivetrain" },
      { label: "Cargo Volume", value: "12' Reefer Box", icon: "dimensions" },
      { label: "Engine", value: "7.3L V8", icon: "engine" },
      { label: "Exterior Color", value: "Oxford White", icon: "color" },
      { label: "Interior Color", value: "Vinyl Gray", icon: "color" },
      { label: "Stock Number", value: "PF-FD-2023-008", icon: "identifier" },
      { label: "VIN", value: "1FDXE4FS5PDA12345", icon: "identifier" },
    ],
    features: [
      "Insulated reefer body",
      "Rear swing doors",
      "Load lock rails",
      "Backup camera",
      "Fleet telematics ready",
      "Bluetooth handsfree",
      "Diamond-plate flooring",
      "Curbside walk-in door",
    ],
    description:
      "A refrigerated cutaway van built for cold-chain delivery — food service, catering and pharmaceutical distribution. Arriving next month; reserve now to lock in early allocation.",
    whyChoose: [
      "Insulated reefer body for cold-chain delivery",
      "Curbside walk-in door speeds multi-stop routes",
      "Backed by Ford's commercial cutaway platform",
      "Reserve now to lock in early allocation",
    ],
    keyFeatures: [
      { title: "Insulated Reefer Body", description: "12 ft cold-chain box with rear swing doors." },
      { title: "Curbside Walk-In Door", description: "Faster multi-stop food-service deliveries." },
      { title: "Diamond-Plate Flooring", description: "Durable footing for daily loading." },
      { title: "Fleet Telematics Ready", description: "Wired for tracking and diagnostics add-ons." },
    ],
    stockNumber: "PF-FD-2023-008",
    vin: "1FDXE4FS5PDA12345",
    exteriorColor: "Oxford White",
    interiorColor: "Vinyl Gray",
    cta: { label: "Reserve This Vehicle", secondaryLabel: "Talk to Fleet Sales" },
  },
  {
    slug: "chevrolet-express-cargo",
    brand: "Chevrolet",
    model: "Express Cargo 2500",
    year: 2023,
    type: "Cargo Van",
    price: 39800,
    priceLabel: "$39,800",
    availability: "reserved",
    location: "Hamilton, ON",
    images: vehicleImageSet(
      PHOTO_IDS.cargoVanSide,
      PHOTO_IDS.cargoVanFront,
      PHOTO_IDS.cargoVanInterior,
      "Chevrolet Express Cargo 2500"
    ),
    specs: [
      { label: "Transmission", value: "Automatic", icon: "transmission" },
      { label: "Fuel Type", value: "Gas", icon: "fuel" },
      { label: "Seats", value: "2", icon: "seats" },
      { label: "Mileage", value: "410 km", icon: "mileage" },
      { label: "Body Type", value: "Standard Cargo Van", icon: "body" },
      { label: "Drivetrain", value: "RWD", icon: "drivetrain" },
      { label: "Cargo Volume", value: "284.4 cu ft", icon: "dimensions" },
      { label: "Engine", value: "4.3L V6", icon: "engine" },
      { label: "Exterior Color", value: "Summit White", icon: "color" },
      { label: "Interior Color", value: "Medium Pewter", icon: "color" },
      { label: "Stock Number", value: "PF-CH-2023-009", icon: "identifier" },
      { label: "VIN", value: "1GCWGAFP5P1123456", icon: "identifier" },
    ],
    features: [
      "Heavy-duty suspension",
      "Rear parking assist",
      "Bulkhead divider",
      "Bluetooth handsfree",
      "Trailering package",
      "Vinyl work-grade flooring",
      "Keyless entry",
      "Fleet telematics ready",
    ],
    description:
      "A proven, budget-friendly cargo van platform. This unit is currently reserved for an existing fleet contract — join the waitlist and our team will notify you the moment the next allocation lands in Hamilton.",
    whyChoose: [
      "Proven, budget-friendly cargo van platform",
      "Heavy-duty suspension for daily work loads",
      "Backed by Chevrolet's commercial reliability",
      "Join the waitlist for the next Hamilton allocation",
    ],
    keyFeatures: [
      { title: "Heavy-Duty Suspension", description: "Built for daily work-grade loads." },
      { title: "Bulkhead Divider", description: "Separates cab from cargo for safety and quiet." },
      { title: "Trailering Package", description: "Ready for a trailer hitch add-on." },
      { title: "Fleet Telematics Ready", description: "Wired for tracking and diagnostics add-ons." },
    ],
    stockNumber: "PF-CH-2023-009",
    vin: "1GCWGAFP5P1123456",
    exteriorColor: "Summit White",
    interiorColor: "Medium Pewter",
    cta: { label: "Join Waitlist", secondaryLabel: "Talk to Fleet Sales" },
  },
];

export function getAllVehicles(): Vehicle[] {
  return vehicles;
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getFeaturedVehicles(limit = 4): Vehicle[] {
  return vehicles.filter((v) => v.availability !== "reserved").slice(0, limit);
}

/**
 * Mock recommendation logic (design.md §9 of the VDP spec): same type
 * first, then similar price, excluding the current vehicle.
 */
export function getRelatedVehicles(slug: string, limit = 3): Vehicle[] {
  const current = getVehicleBySlug(slug);
  if (!current) return [];

  const others = vehicles.filter((v) => v.slug !== slug);
  const sameType = others.filter((v) => v.type === current.type);
  const byPriceProximity = [...others].sort(
    (a, b) => Math.abs(a.price - current.price) - Math.abs(b.price - current.price)
  );

  const combined = [...sameType, ...byPriceProximity];
  const seen = new Set<string>();
  const result: Vehicle[] = [];
  for (const vehicle of combined) {
    if (!seen.has(vehicle.slug)) {
      seen.add(vehicle.slug);
      result.push(vehicle);
    }
    if (result.length === limit) break;
  }
  return result;
}

export interface VehicleSearchFilters {
  query?: string;
  type?: string;
  make?: string;
  location?: string;
  availability?: string;
}

/** Local, backend-free search across name, brand, model, type and location. */
export function searchVehicles(filters: VehicleSearchFilters): Vehicle[] {
  const query = filters.query?.trim().toLowerCase() ?? "";

  return vehicles.filter((vehicle) => {
    const haystack = `${vehicle.brand} ${vehicle.model} ${vehicle.type} ${vehicle.location} ${vehicle.year}`.toLowerCase();
    const matchesQuery = query.length === 0 || haystack.includes(query);
    const matchesType = !filters.type || filters.type === "All" || vehicle.type === filters.type;
    const matchesMake = !filters.make || filters.make === "All" || vehicle.brand === filters.make;
    const matchesLocation =
      !filters.location || filters.location === "All" || vehicle.location === filters.location;
    const matchesAvailability =
      !filters.availability ||
      filters.availability === "All" ||
      vehicle.availability === filters.availability;

    return matchesQuery && matchesType && matchesMake && matchesLocation && matchesAvailability;
  });
}

export const vehicleTypes: string[] = Array.from(new Set(vehicles.map((v) => v.type)));
export const vehicleMakes: string[] = Array.from(new Set(vehicles.map((v) => v.brand))).sort();
export const vehicleLocations: string[] = Array.from(new Set(vehicles.map((v) => v.location)));
export const vehicleYears: number[] = Array.from(new Set(vehicles.map((v) => v.year))).sort((a, b) => b - a);

/** Parses a mileage spec value like "12,500 km" into a plain number, or null if not numeric (e.g. "N/A"). */
export function getMileageKm(vehicle: Vehicle): number | null {
  const raw = vehicle.specs.find((spec) => spec.icon === "mileage")?.value ?? "";
  const digits = raw.replace(/[^0-9]/g, "");
  return digits.length > 0 ? Number(digits) : null;
}

export const PRICE_BUCKETS = [
  { value: "Any", label: "Any Price" },
  { value: "under-40000", label: "Under $40,000" },
  { value: "40000-60000", label: "$40,000 – $60,000" },
  { value: "over-60000", label: "Over $60,000" },
] as const;

export const MILEAGE_BUCKETS = [
  { value: "Any", label: "Any Mileage" },
  { value: "under-5000", label: "Under 5,000 km" },
  { value: "5000-25000", label: "5,000 – 25,000 km" },
  { value: "over-25000", label: "Over 25,000 km" },
] as const;

export const CONDITIONS = [
  { value: "Any", label: "Any Condition" },
  { value: "New", label: "New" },
  { value: "Used", label: "Used" },
] as const;

export const AVAILABILITY_OPTIONS = [
  { value: "Any", label: "Any Availability" },
  { value: "available", label: "Available Now" },
  { value: "limited", label: "Limited Availability" },
  { value: "coming-soon", label: "Coming Soon" },
] as const;

export interface AdvancedSearchFilters {
  type: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  condition: string;
  location: string;
  availability: string;
}

export const EMPTY_ADVANCED_FILTERS: AdvancedSearchFilters = {
  type: "Any",
  make: "Any",
  model: "",
  year: "Any",
  price: "Any",
  mileage: "Any",
  condition: "Any",
  location: "Any",
  availability: "Any",
};

/** True once the visitor has actually changed at least one field from its default — distinguishes "no search yet" from "0 results". */
export function isAdvancedFiltered(filters: AdvancedSearchFilters): boolean {
  return (
    filters.type !== "Any" ||
    filters.make !== "Any" ||
    filters.model.trim() !== "" ||
    filters.year !== "Any" ||
    filters.price !== "Any" ||
    filters.mileage !== "Any" ||
    filters.condition !== "Any" ||
    filters.location !== "Any" ||
    filters.availability !== "Any"
  );
}

/** Full Advanced Search filter set (page-01-homepage.md §8). */
export function advancedSearchVehicles(filters: AdvancedSearchFilters): Vehicle[] {
  return vehicles.filter((vehicle) => {
    if (filters.type !== "Any" && vehicle.type !== filters.type) return false;
    if (filters.make !== "Any" && vehicle.brand !== filters.make) return false;
    if (filters.model.trim() && !vehicle.model.toLowerCase().includes(filters.model.trim().toLowerCase())) return false;
    if (filters.year !== "Any" && String(vehicle.year) !== filters.year) return false;
    if (filters.location !== "Any" && vehicle.location !== filters.location) return false;
    if (filters.availability !== "Any" && vehicle.availability !== filters.availability) return false;
    if (filters.condition !== "Any") {
      const isNew = Boolean(vehicle.isNew);
      if (filters.condition === "New" && !isNew) return false;
      if (filters.condition === "Used" && isNew) return false;
    }
    if (filters.price !== "Any") {
      if (filters.price === "under-40000" && vehicle.price >= 40000) return false;
      if (filters.price === "40000-60000" && (vehicle.price < 40000 || vehicle.price > 60000)) return false;
      if (filters.price === "over-60000" && vehicle.price <= 60000) return false;
    }
    if (filters.mileage !== "Any") {
      const km = getMileageKm(vehicle);
      if (km === null) return false;
      if (filters.mileage === "under-5000" && km >= 5000) return false;
      if (filters.mileage === "5000-25000" && (km < 5000 || km > 25000)) return false;
      if (filters.mileage === "over-25000" && km <= 25000) return false;
    }
    return true;
  });
}

/* -------------------------------------------------------------------- */
/* Vehicle Results Page (VRP) — page-02-vrp.md                          */
/* -------------------------------------------------------------------- */

/**
 * Category strip (page-02-vrp.md §6). Types beyond what the mock dataset
 * models ("Service Truck", "Refrigerated", "Specialty Vehicle") are kept
 * here deliberately — clicking them is honest, real filtering (0 results
 * today) rather than a removed/dead category, and they'll resolve
 * immediately once real inventory of those types is added.
 */
export const VRP_CATEGORIES: { label: string; type: string | null }[] = [
  { label: "All Vehicles", type: null },
  { label: "Cargo Vans", type: "Cargo Van" },
  { label: "Cube / Box Trucks", type: "Box Truck" },
  { label: "Service Trucks", type: "Service Truck" },
  { label: "Pickup Trucks", type: "Pickup Truck" },
  { label: "Passenger Vans", type: "Passenger Van" },
  { label: "Refrigerated", type: "Refrigerated" },
  { label: "Specialty Vehicles", type: "Specialty Vehicle" },
];

export interface VrpFilters {
  q: string;
  types: string[];
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  mileage: string;
  location: string;
  conditions: string[];
  /** Reuses AVAILABILITY_OPTIONS' values so the Homepage's Advanced Search can hand off to the VRP without losing this criterion. */
  availability: string;
}

export const EMPTY_VRP_FILTERS: VrpFilters = {
  q: "",
  types: [],
  make: "Any",
  model: "Any",
  yearMin: "",
  yearMax: "",
  priceMin: "",
  priceMax: "",
  mileage: "Any",
  location: "Any",
  conditions: [],
  availability: "Any",
};

export function isVrpFiltered(filters: VrpFilters): boolean {
  return (
    filters.q.trim().length > 0 ||
    filters.types.length > 0 ||
    filters.make !== "Any" ||
    filters.model !== "Any" ||
    filters.yearMin.trim() !== "" ||
    filters.yearMax.trim() !== "" ||
    filters.priceMin.trim() !== "" ||
    filters.priceMax.trim() !== "" ||
    filters.mileage !== "Any" ||
    filters.location !== "Any" ||
    filters.conditions.length > 0 ||
    filters.availability !== "Any"
  );
}

/** Unique models, optionally narrowed to one make — feeds the sidebar's "Model" select. */
export function getVehicleModels(make = "Any"): string[] {
  const scoped = make === "Any" ? vehicles : vehicles.filter((v) => v.brand === make);
  return Array.from(new Set(scoped.map((v) => v.model))).sort();
}

/** Real, data-driven counts for the sidebar's Vehicle Type checkboxes (never invented — page-02-vrp.md §27). */
export function getVehicleTypeCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of VRP_CATEGORIES) {
    if (!category.type) continue;
    counts[category.type] = vehicles.filter((v) => v.type === category.type).length;
  }
  return counts;
}

/** Real, data-driven counts for the sidebar's Condition checkboxes. */
export function getConditionCounts(): { New: number; Used: number } {
  return {
    New: vehicles.filter((v) => v.isNew).length,
    Used: vehicles.filter((v) => !v.isNew).length,
  };
}

/** Full VRP filter set: search + category/type + make/model + year/price range + mileage + location + condition. */
export function filterVehiclesForVrp(filters: VrpFilters): Vehicle[] {
  const query = filters.q.trim().toLowerCase();
  const yearMin = filters.yearMin.trim() ? Number(filters.yearMin) : null;
  const yearMax = filters.yearMax.trim() ? Number(filters.yearMax) : null;
  const priceMin = filters.priceMin.trim() ? Number(filters.priceMin) : null;
  const priceMax = filters.priceMax.trim() ? Number(filters.priceMax) : null;

  return vehicles.filter((vehicle) => {
    if (query) {
      const haystack = `${vehicle.brand} ${vehicle.model} ${vehicle.type} ${vehicle.location} ${vehicle.year}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.types.length > 0 && !filters.types.includes(vehicle.type)) return false;
    if (filters.make !== "Any" && vehicle.brand !== filters.make) return false;
    if (filters.model !== "Any" && vehicle.model !== filters.model) return false;
    if (yearMin !== null && vehicle.year < yearMin) return false;
    if (yearMax !== null && vehicle.year > yearMax) return false;
    if (priceMin !== null && vehicle.price < priceMin) return false;
    if (priceMax !== null && vehicle.price > priceMax) return false;
    if (filters.location !== "Any" && vehicle.location !== filters.location) return false;
    if (filters.availability !== "Any" && vehicle.availability !== filters.availability) return false;
    if (filters.conditions.length > 0) {
      const condition = vehicle.isNew ? "New" : "Used";
      if (!filters.conditions.includes(condition)) return false;
    }
    if (filters.mileage !== "Any") {
      const km = getMileageKm(vehicle);
      if (km === null) return false;
      if (filters.mileage === "under-5000" && km >= 5000) return false;
      if (filters.mileage === "5000-25000" && (km < 5000 || km > 25000)) return false;
      if (filters.mileage === "over-25000" && km <= 25000) return false;
    }
    return true;
  });
}

/**
 * Builds the VRP's URL query string from a `VrpFilters` object — the one
 * shared place this mapping exists, used both by the VRP page itself
 * (VrpPageClient) and by the Homepage's Buy search / Advanced Search when
 * they hand off to `/vehicles` (page-02-vrp.md §10, page-01-homepage.md
 * §8 — "search + filters must land on real, filtered results, not a
 * generic listing").
 */
export function vrpFiltersToSearchParams(filters: VrpFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.types.length) params.set("type", filters.types.join(","));
  if (filters.make !== "Any") params.set("make", filters.make);
  if (filters.model !== "Any") params.set("model", filters.model);
  if (filters.yearMin.trim()) params.set("yearMin", filters.yearMin.trim());
  if (filters.yearMax.trim()) params.set("yearMax", filters.yearMax.trim());
  if (filters.priceMin.trim()) params.set("priceMin", filters.priceMin.trim());
  if (filters.priceMax.trim()) params.set("priceMax", filters.priceMax.trim());
  if (filters.mileage !== "Any") params.set("mileage", filters.mileage);
  if (filters.location !== "Any") params.set("location", filters.location);
  if (filters.conditions.length) params.set("condition", filters.conditions.join(","));
  if (filters.availability !== "Any") params.set("availability", filters.availability);
  return params;
}

/**
 * Maps the Homepage's free-text-friendly `AdvancedSearchFilters` onto the
 * VRP's stricter `VrpFilters` shape. `model` is free text there (partial
 * match) but an exact dropdown on the VRP, so it's carried over as the
 * free-text `q` instead of `model` to avoid a value the VRP's own Model
 * select wouldn't recognize. Price buckets are converted to the equivalent
 * min/max the VRP already understands.
 */
export function advancedFiltersToVrpFilters(filters: AdvancedSearchFilters): VrpFilters {
  const priceRange: { priceMin: string; priceMax: string } =
    filters.price === "under-40000"
      ? { priceMin: "", priceMax: "39999" }
      : filters.price === "40000-60000"
        ? { priceMin: "40000", priceMax: "60000" }
        : filters.price === "over-60000"
          ? { priceMin: "60001", priceMax: "" }
          : { priceMin: "", priceMax: "" };

  return {
    ...EMPTY_VRP_FILTERS,
    q: filters.model.trim(),
    types: filters.type !== "Any" ? [filters.type] : [],
    make: filters.make,
    yearMin: filters.year !== "Any" ? filters.year : "",
    yearMax: filters.year !== "Any" ? filters.year : "",
    ...priceRange,
    mileage: filters.mileage,
    location: filters.location,
    conditions: filters.condition !== "Any" ? [filters.condition] : [],
    availability: filters.availability,
  };
}

export const VRP_SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
  { value: "mileage-desc", label: "Mileage: High to Low" },
] as const;

export type VrpSort = (typeof VRP_SORT_OPTIONS)[number]["value"];

export function sortVehiclesForVrp(list: Vehicle[], sort: VrpSort): Vehicle[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "mileage-asc":
      return sorted.sort((a, b) => (getMileageKm(a) ?? Infinity) - (getMileageKm(b) ?? Infinity));
    case "mileage-desc":
      return sorted.sort((a, b) => (getMileageKm(b) ?? -Infinity) - (getMileageKm(a) ?? -Infinity));
    case "newest":
    default:
      return sorted.sort((a, b) => b.year - a.year);
  }
}

/* -------------------------------------------------------------------- */
/* Vehicle Detail Page (VDP) — page-03-vdp.md                           */
/* -------------------------------------------------------------------- */

/** Breadcrumb's category crumb — reuses the VRP's own category labels so the two pages never disagree. */
export function getBreadcrumbCategory(type: string): { label: string; href: string } {
  const category = VRP_CATEGORIES.find((c) => c.type === type);
  return {
    label: category?.label ?? type,
    href: category?.type ? `/vehicles?type=${encodeURIComponent(category.type)}` : "/vehicles",
  };
}

/**
 * Static, company-wide warranty/protection copy (page-03-vdp.md §16) — like
 * the trust strip, this describes Paradigm Fleet's general coverage
 * policies rather than a per-vehicle claim, so it's approved copy rather
 * than mock inventory data.
 */
export const WARRANTY_ITEMS = [
  { label: "Manufacturer Warranty", value: "3 years / 60,000 km", icon: "shield" as const },
  { label: "Extended Warranty", value: "Options Available", icon: "shield" as const },
  { label: "Roadside Assistance", value: "24/7 support", icon: "wrench" as const },
  { label: "Service & Maintenance", value: "Flexible plans", icon: "wrench" as const },
];
