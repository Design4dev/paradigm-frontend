import {
  emptyDocumentSlot,
  EMPTY_ADDITIONAL_DRIVER,
  EMPTY_CONTACT_INFO,
  EMPTY_PERSONAL_ADDRESS,
  EMPTY_PRIMARY_LICENSE,
  type BookingStepperPosition,
  type RentalBookingState,
  type RentalCategory,
  type RentalFleetVehicle,
} from "@/features/rental/types/booking.types";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClipboardIcon,
  CustomerIcon,
  ExtrasIcon,
  PaymentIcon,
  ShieldIcon,
  type IconProps,
} from "@/components/ui/Icons";

/** The 5-position stepper shown on both `/rentals/book` (steps 1-4) and `/rentals/confirmation` (step 5). */
export const BOOKING_STEPPER: { id: BookingStepperPosition; index: number; label: string; icon: React.ComponentType<IconProps> }[] = [
  { id: "addons", index: 1, label: "Add-ons", icon: ExtrasIcon },
  { id: "coverage", index: 2, label: "Coverage", icon: ShieldIcon },
  { id: "information", index: 3, label: "Information", icon: CustomerIcon },
  { id: "payment", index: 4, label: "Payment", icon: PaymentIcon },
  { id: "confirmation", index: 5, label: "Confirmation", icon: CheckCircleIcon },
];

/** Icon kept for reference in a couple of places that want a generic "form" glyph (e.g. Terms note inside Payment). */
export const TERMS_ICON = ClipboardIcon;
export const CALENDAR_ICON = CalendarIcon;

/**
 * The real rental fleet catalog — verified this pass directly from the
 * client's live Apprentall booking engine (book.apprentall.cloud/?clientid=1923)
 * and paradigmtruckrental.com. Real photography downloaded to
 * `public/images/rental/` from Apprentall's own asset CDN (see
 * docs/pages/page-06-rental.md for full provenance). Per-day pricing is
 * deliberately NOT included here — see `rentalPricing.service.ts`.
 */
export const RENTAL_FLEET_VEHICLES: RentalFleetVehicle[] = [
  {
    slug: "refrigerated-van",
    name: "Refrigerated Van",
    descriptor: "Similar to Ford Transit Medium Roof with Reefer",
    image: { url: "/images/rental/refrigerated-van.jpg", alt: "Refrigerated Van — Paradigm Fleet rental" },
    attributes: [
      { label: "Doors", value: "5" },
      { label: "Seats", value: "2" },
      { label: "Baggage", value: "1" },
    ],
  },
  {
    slug: "16ft-cube-van",
    name: "16FT Cube Van",
    descriptor: "Similar to Ford E-450",
    image: { url: "/images/rental/16ft-cube-van.jpg", alt: "16FT Cube Van — Paradigm Fleet rental" },
    attributes: [
      { label: "Doors", value: "2" },
      { label: "Seats", value: "2" },
      { label: "Baggage", value: "1" },
    ],
  },
  {
    slug: "dump-truck",
    name: "Dump Truck",
    descriptor: "Similar to Ford F-550 Superduty",
    image: { url: "/images/rental/dump-truck.jpg", alt: "Dump Truck — Paradigm Fleet rental" },
    attributes: [
      { label: "Doors", value: "2" },
      { label: "Seats", value: "2" },
      { label: "Baggage", value: "2" },
    ],
  },
  {
    slug: "hd-truck",
    name: "HD Truck",
    descriptor: "Similar to Chevrolet Silverado Custom 2500HD",
    image: { url: "/images/rental/hd-truck.jpg", alt: "HD Truck — Paradigm Fleet rental" },
    attributes: [
      { label: "Doors", value: "4" },
      { label: "Seats", value: "6" },
      { label: "Baggage", value: "1" },
    ],
  },
  {
    slug: "mid-roof-cargo-van",
    name: "Mid Roof Cargo Van",
    descriptor: "Similar to Ford Transit Mid Roof",
    image: { url: "/images/rental/mid-roof-cargo-van.jpg", alt: "Mid Roof Cargo Van — Paradigm Fleet rental" },
    attributes: [
      { label: "Doors", value: "4" },
      { label: "Seats", value: "2" },
      { label: "Baggage", value: "1" },
    ],
  },
  {
    slug: "high-roof-cargo-van",
    name: "High Roof Cargo Van",
    descriptor: "Similar to Ram Promaster 3500",
    image: { url: "/images/rental/high-roof-cargo-van.jpg", alt: "High Roof Cargo Van — Paradigm Fleet rental" },
    attributes: [
      { label: "Doors", value: "4" },
      { label: "Seats", value: "2" },
      { label: "Baggage", value: "1" },
    ],
  },
  {
    slug: "half-ton-pickup-truck",
    name: "1/2 Ton Pickup Truck",
    descriptor: "Similar to Ford F-150",
    image: { url: "/images/rental/half-ton-pickup-truck.jpg", alt: "1/2 Ton Pickup Truck — Paradigm Fleet rental" },
    attributes: [
      { label: "Doors", value: "4" },
      { label: "Seats", value: "5" },
      { label: "Baggage", value: "1" },
    ],
  },
];

/**
 * "Rental Vehicle Categories" (spec §5) — the same real catalog above, shown
 * as compact filter tiles so a visitor can answer "what type do I need?"
 * before browsing full vehicle cards. No second, invented taxonomy.
 */
export const RENTAL_CATEGORIES: RentalCategory[] = RENTAL_FLEET_VEHICLES.map(({ slug, name, image }) => ({ slug, name, image }));

/** Only one pickup/drop-off location is verified — see design.md §7. Additional locations are VERIFY / INTEGRATION DEPENDENT. */
export const BOOKING_LOCATIONS = [{ label: "Stoney Creek — 339 Dosco Drive, Stoney Creek, Ontario", value: "stoney-creek" }] as const;

/** Plain age bands — not a verified legal/insurance rule; real minimum-age policy is the booking provider's, not invented here. */
export const BOOKING_AGE_OPTIONS = ["21–24", "25+"] as const;

export function createEmptyBookingState(): RentalBookingState {
  return {
    selectedCategory: null,
    selectedVehicle: null,
    pickupLocation: BOOKING_LOCATIONS[0].value,
    differentDropoff: false,
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    age: "",
    promoCode: "",
    searchSubmitted: false,
    currentStep: "addons",
    furthestStepIndex: 1,
    selectedAddonIds: [],
    selectedCoverageId: null,
    contact: { ...EMPTY_CONTACT_INFO },
    primaryLicense: { ...EMPTY_PRIMARY_LICENSE },
    additionalDriverEnabled: false,
    additionalDriver: { ...EMPTY_ADDITIONAL_DRIVER },
    address: { ...EMPTY_PERSONAL_ADDRESS },
    documents: {
      licenseFront: emptyDocumentSlot(),
      licenseBack: emptyDocumentSlot(),
      insuranceCardFront: emptyDocumentSlot(),
      insuranceCardBack: emptyDocumentSlot(),
    },
    termsAccepted: false,
    submission: { status: "idle", referenceId: null, error: null },
  };
}
