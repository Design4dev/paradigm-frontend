"use client";

import { ChatIcon } from "@/components/ui/Icons";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/** Floating mobile-only chat affordance (VDP reference, mobile screenshot) — opens the same real lead form as "Chat with Us". */
export function VdpChatBubble({ vehicle }: { vehicle: Vehicle }) {
  const { openQuote } = useQuote();

  return (
    <button
      type="button"
      aria-label="Chat with us"
      onClick={(event) =>
        openQuote(
          { slug: vehicle.slug, name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`, stockNumber: vehicle.stockNumber, priceLabel: vehicle.priceLabel },
          event.currentTarget
        )
      }
      className="focus-ring fixed bottom-24 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-primary-red text-primary-white shadow-lg transition-transform active:scale-95 sm:hidden"
    >
      <ChatIcon tone="white" className="h-5 w-5" />
    </button>
  );
}
