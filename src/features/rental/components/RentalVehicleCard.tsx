"use client";

import { buttonClassName } from "@/components/ui/Button";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import type { RentalFleetVehicle } from "@/features/rental/types/booking.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * The one rental vehicle card component (spec §9/§15/§16) — used by "Our
 * Rental Fleet," Find Your Fleet's result, AND Search Results, so every
 * entry point converges on the same visual system and the same page flow,
 * never a second card system. Real photo (see booking.config.ts for
 * provenance), real name/descriptor/attributes, one primary CTA.
 *
 * "Rent It" never opens a modal and never starts the booking process
 * immediately — it always sets this vehicle as the selected context and
 * navigates:
 *  - `destination="search"` (default — Landing/Find Your Fleet): to
 *    `/rentals/search`, so the visitor still fills in the Reservation
 *    Search before anything else (spec §7).
 *  - `destination="book"` (Search Results only): straight to
 *    `/rentals/book`, since Search → Results already collected dates/
 *    location (spec §16).
 */
export function RentalVehicleCard({
  vehicle,
  priority = false,
  destination = "search",
}: {
  vehicle: RentalFleetVehicle;
  priority?: boolean;
  destination?: "search" | "book";
}) {
  const setVehicle = useRentalBookingStore((state) => state.setVehicle);
  const track = useTrackEvent();
  const router = useRouter();

  const handleRentIt = () => {
    track({ name: "rental_vehicle_click", vehicleSlug: vehicle.slug });
    setVehicle(vehicle);
    if (destination === "book") {
      track({ name: "rental_vehicle_selected", vehicleSlug: vehicle.slug });
      router.push("/rentals/book");
    } else {
      router.push("/rentals/search");
    }
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-[transform,box-shadow] duration-[var(--duration-micro)] ease-[var(--ease-out-standard)] hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-soft-gray">
        <Image
          src={vehicle.image.url}
          alt={vehicle.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-300 ease-[var(--ease-out-standard)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="text-heading-m text-primary-black">{vehicle.name}</h3>
          <p className="text-caption-s mt-0.5 text-dark-neutral/60">{vehicle.descriptor}</p>
        </div>

        <ul className="text-label-m flex flex-wrap items-center gap-x-3.5 gap-y-1.5 leading-snug text-dark-neutral/80">
          {vehicle.attributes.map((attr) => (
            <li key={attr.label}>
              {attr.label}: {attr.value}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <button type="button" onClick={handleRentIt} className={buttonClassName({ variant: "primary", size: "md", className: "w-full" })}>
            Rent It →
          </button>
        </div>
      </div>
    </div>
  );
}
