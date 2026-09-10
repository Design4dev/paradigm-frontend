"use client";

import { buttonClassName } from "@/components/ui/Button";
import { RentalVehicleCard } from "@/features/rental/components/RentalVehicleCard";
import { BOOKING_LOCATIONS } from "@/features/rental/config/booking.config";
import { getVehicles } from "@/features/rental/services/rentalAvailability.service";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function locationLabel(value: string): string {
  return BOOKING_LOCATIONS.find((loc) => loc.value === value)?.label ?? value;
}

/**
 * Rental Results (spec §14/§15). Guards against a direct/refreshed visit
 * with no submitted search (state is non-persisted — see `booking.types.ts`)
 * by redirecting back to `/rentals/search` rather than rendering an empty/
 * broken page. Filters the real fleet catalog by the preserved category
 * (spec §33) — no fake availability/filtering logic beyond that, since this
 * project has no real per-date availability data.
 */
export function RentalSearchResults() {
  const searchSubmitted = useRentalBookingStore((s) => s.searchSubmitted);
  const selectedCategory = useRentalBookingStore((s) => s.selectedCategory);
  const pickupLocation = useRentalBookingStore((s) => s.pickupLocation);
  const pickupDate = useRentalBookingStore((s) => s.pickupDate);
  const pickupTime = useRentalBookingStore((s) => s.pickupTime);
  const returnDate = useRentalBookingStore((s) => s.returnDate);
  const returnTime = useRentalBookingStore((s) => s.returnTime);
  const router = useRouter();

  useEffect(() => {
    if (!searchSubmitted) router.replace("/rentals/search");
  }, [searchSubmitted, router]);

  if (!searchSubmitted) return null;

  const vehicles = getVehicles({ category: selectedCategory });

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-[var(--radius-card)] border border-border bg-soft-gray p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-caption-s text-dark-neutral/50">Search Summary</p>
            <p className="text-label-m text-primary-black">
              {locationLabel(pickupLocation)} · {pickupDate || "—"} {pickupTime} → {returnDate || "—"} {returnTime}
            </p>
          </div>
          <Link href="/rentals/search" className={buttonClassName({ variant: "secondary", size: "md" })}>
            Edit Search
          </Link>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <p className="text-body-m text-dark-neutral/70">No matching rental vehicles found for that category. Try a different search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {vehicles.map((vehicle, i) => (
            <RentalVehicleCard key={vehicle.slug} vehicle={vehicle} destination="book" priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
