"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CloseIcon } from "@/components/ui/Icons";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { BOOKING_AGE_OPTIONS, BOOKING_LOCATIONS } from "@/features/rental/config/booking.config";
import { hasBookingErrors, validateSearchStep } from "@/features/rental/lib/validateBooking";
import { getVehicleBySlug } from "@/features/rental/services/rentalAvailability.service";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import type { BookingStepErrors } from "@/features/rental/types/booking.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LOCATION_OPTIONS = BOOKING_LOCATIONS.map((loc) => ({ label: loc.label, value: loc.value }));
const AGE_SELECT_OPTIONS = [{ label: "Select your age", value: "" }, ...BOOKING_AGE_OPTIONS.map((a) => ({ label: a, value: a }))];

/**
 * Reservation Search (spec §12/§13) — the verified field set, unchanged
 * from every previous pass's own client-supplied-screenshot verification.
 * Submitting never redirects externally and never shows a "connection
 * pending" state — it records the search in the centralized store and
 * takes the visitor to the internal Results page.
 */
export function RentalSearchForm() {
  const state = useRentalBookingStore((s) => s);
  const updateSearch = useRentalBookingStore((s) => s.updateSearch);
  const submitSearch = useRentalBookingStore((s) => s.submitSearch);
  const clearVehicle = useRentalBookingStore((s) => s.clearVehicle);
  const track = useTrackEvent();
  const router = useRouter();

  const [errors, setErrors] = useState<BookingStepErrors>({});
  const contextVehicle = state.selectedVehicle ?? (state.selectedCategory ? getVehicleBySlug(state.selectedCategory) : null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    track({ name: "rental_search_start" });

    const nextErrors = validateSearchStep(state);
    if (hasBookingErrors(nextErrors)) {
      setErrors(nextErrors);
      track({ name: "rental_search_error" });
      return;
    }
    setErrors({});
    submitSearch();
    track({ name: "rental_search_success" });
    router.push("/rentals/search/results");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
      {contextVehicle && (
        <div className="flex items-center gap-3 rounded-[var(--radius-control)] bg-soft-gray p-3">
          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[6px] bg-border">
            <Image src={contextVehicle.image.url} alt={contextVehicle.image.alt} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-caption-s text-dark-neutral/60">Searching for</p>
            <p className="text-label-m truncate text-primary-black">{contextVehicle.name}</p>
          </div>
          <button
            type="button"
            aria-label="Clear selected vehicle"
            onClick={clearVehicle}
            className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-dark-neutral/50 hover:bg-border hover:text-primary-black"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      <Select
        label="Pickup / Drop-off Location"
        options={LOCATION_OPTIONS}
        value={state.pickupLocation}
        error={errors.pickupLocation}
        onChange={(event) => updateSearch({ pickupLocation: event.target.value })}
      />

      <Checkbox
        label="Add a different drop-off location"
        checked={state.differentDropoff}
        onChange={(event) => updateSearch({ differentDropoff: event.target.checked, dropoffLocation: event.target.checked ? state.dropoffLocation : "" })}
      />

      {state.differentDropoff && (
        <Select
          label="Drop-off Location"
          options={LOCATION_OPTIONS}
          value={state.dropoffLocation}
          error={errors.dropoffLocation}
          onChange={(event) => updateSearch({ dropoffLocation: event.target.value })}
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Pickup Date" type="date" value={state.pickupDate} error={errors.pickupDate} onChange={(event) => updateSearch({ pickupDate: event.target.value })} />
        <Input label="Pickup Time" type="time" value={state.pickupTime} error={errors.pickupTime} onChange={(event) => updateSearch({ pickupTime: event.target.value })} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Return Date" type="date" value={state.returnDate} error={errors.returnDate} onChange={(event) => updateSearch({ returnDate: event.target.value })} />
        <Input label="Return Time" type="time" value={state.returnTime} error={errors.returnTime} onChange={(event) => updateSearch({ returnTime: event.target.value })} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select label="Age" options={AGE_SELECT_OPTIONS} value={state.age} error={errors.age} onChange={(event) => updateSearch({ age: event.target.value })} />
        <Input
          label="Promotion Code (Optional)"
          placeholder="Enter promo code"
          value={state.promoCode}
          onChange={(event) => updateSearch({ promoCode: event.target.value })}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Search
      </Button>
    </form>
  );
}
