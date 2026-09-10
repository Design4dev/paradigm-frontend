import { create } from "zustand";
import { BOOKING_STEPPER, createEmptyBookingState } from "@/features/rental/config/booking.config";
import { emptyDocumentSlot } from "@/features/rental/types/booking.types";
import type {
  BookingStepId,
  RentalAdditionalDriver,
  RentalBookingState,
  RentalContactInfo,
  RentalDocuments,
  RentalFleetVehicle,
  RentalPersonalAddress,
  RentalPrimaryLicense,
} from "@/features/rental/types/booking.types";

/** Only the 4 in-page steps — Confirmation lives on its own route, not part of step-to-step navigation. */
const IN_PAGE_STEPS = BOOKING_STEPPER.filter((s): s is typeof BOOKING_STEPPER[number] & { id: BookingStepId } => s.id !== "confirmation");

interface RentalBookingActions {
  reset: () => void;

  // Category / vehicle context
  setCategory: (slug: string) => void;
  setVehicle: (vehicle: RentalFleetVehicle) => void;
  clearVehicle: () => void;

  // Reservation Search
  updateSearch: (
    patch: Partial<
      Pick<RentalBookingState, "pickupLocation" | "differentDropoff" | "dropoffLocation" | "pickupDate" | "pickupTime" | "returnDate" | "returnTime" | "age" | "promoCode">
    >
  ) => void;
  submitSearch: () => void;

  // Booking process
  goToStep: (step: BookingStepId) => void;
  advanceFrom: (step: BookingStepId) => void;
  goBackFrom: (step: BookingStepId) => void;
  toggleAddon: (id: string) => void;
  setCoverage: (id: string | null) => void;
  updateContact: (patch: Partial<RentalContactInfo>) => void;
  updatePrimaryLicense: (patch: Partial<RentalPrimaryLicense>) => void;
  setAdditionalDriverEnabled: (enabled: boolean) => void;
  updateAdditionalDriver: (patch: Partial<RentalAdditionalDriver>) => void;
  updateAddress: (patch: Partial<RentalPersonalAddress>) => void;
  setDocument: (slot: keyof RentalDocuments, file: File | null) => void;
  setTermsAccepted: (accepted: boolean) => void;
  setSubmission: (patch: Partial<RentalBookingState["submission"]>) => void;
}

type RentalBookingStore = RentalBookingState & RentalBookingActions;

/**
 * Central booking-flow state (spec §31) — one store, not scattered across
 * page components. Deliberately NOT persisted; see `booking.types.ts`'s
 * `RentalBookingState` doc comment for why.
 */
export const useRentalBookingStore = create<RentalBookingStore>()((set) => ({
  ...createEmptyBookingState(),

  reset: () => set(createEmptyBookingState()),

  setCategory: (slug) => set({ selectedCategory: slug }),
  setVehicle: (vehicle) => set({ selectedVehicle: vehicle, selectedCategory: vehicle.slug }),
  clearVehicle: () => set({ selectedVehicle: null, selectedCategory: null }),

  updateSearch: (patch) => set((state) => ({ ...state, ...patch })),
  submitSearch: () => set({ searchSubmitted: true }),

  goToStep: (step) => set({ currentStep: step }),

  advanceFrom: (step) => {
    const current = IN_PAGE_STEPS.find((s) => s.id === step);
    const next = IN_PAGE_STEPS.find((s) => s.index === (current?.index ?? 0) + 1);
    if (!next) return;
    set((state) => ({ currentStep: next.id, furthestStepIndex: Math.max(state.furthestStepIndex, next.index) }));
  },

  goBackFrom: (step) => {
    const current = IN_PAGE_STEPS.find((s) => s.id === step);
    const prev = IN_PAGE_STEPS.find((s) => s.index === (current?.index ?? 0) - 1);
    if (!prev) return;
    set({ currentStep: prev.id });
  },

  toggleAddon: (id) =>
    set((state) => ({
      selectedAddonIds: state.selectedAddonIds.includes(id) ? state.selectedAddonIds.filter((x) => x !== id) : [...state.selectedAddonIds, id],
    })),
  setCoverage: (id) => set({ selectedCoverageId: id }),
  updateContact: (patch) => set((state) => ({ contact: { ...state.contact, ...patch } })),
  updatePrimaryLicense: (patch) => set((state) => ({ primaryLicense: { ...state.primaryLicense, ...patch } })),
  setAdditionalDriverEnabled: (enabled) => set({ additionalDriverEnabled: enabled }),
  updateAdditionalDriver: (patch) => set((state) => ({ additionalDriver: { ...state.additionalDriver, ...patch } })),
  updateAddress: (patch) => set((state) => ({ address: { ...state.address, ...patch } })),

  setDocument: (slot, file) =>
    set((state) => {
      // Revoke the previous object URL (if any) before creating a new one, so we don't leak blob URLs.
      const previous = state.documents[slot];
      if (previous.previewUrl) URL.revokeObjectURL(previous.previewUrl);

      const nextSlot = file
        ? { file, fileName: file.name, previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null }
        : emptyDocumentSlot();

      return { documents: { ...state.documents, [slot]: nextSlot } };
    }),

  setTermsAccepted: (accepted) => set({ termsAccepted: accepted }),
  setSubmission: (patch) => set((state) => ({ submission: { ...state.submission, ...patch } })),
}));
