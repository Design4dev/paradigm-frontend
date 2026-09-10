"use client";

import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import type { RentalCategory } from "@/features/rental/types/booking.types";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * "Rental Vehicle Categories" (spec §5/§6) — a compact, tappable tile so a
 * visitor can answer "what type of rental vehicle do I need?" before
 * browsing full vehicle cards. Clicking a category does NOT open a
 * popup/booking process — it preserves the category in the centralized
 * booking state and takes the visitor to the Reservation Search page,
 * where they still fill in dates/location before anything else.
 */
export function RentalCategoryTile({ category }: { category: RentalCategory }) {
  const setCategory = useRentalBookingStore((state) => state.setCategory);
  const track = useTrackEvent();
  const router = useRouter();

  const handleClick = () => {
    track({ name: "rental_category_click", categorySlug: category.slug });
    setCategory(category.slug);
    router.push("/rentals/search");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="focus-ring group flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-border bg-surface p-3 text-center transition-colors duration-[var(--duration-micro)] hover:border-primary-black/30"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[6px] bg-soft-gray">
        <Image
          src={category.image.url}
          alt={category.image.alt}
          fill
          sizes="(min-width: 1024px) 140px, 30vw"
          className="object-cover transition-transform duration-300 ease-[var(--ease-out-standard)] group-hover:scale-[1.04]"
        />
      </div>
      <span className="text-label-m text-primary-black">{category.name}</span>
    </button>
  );
}
