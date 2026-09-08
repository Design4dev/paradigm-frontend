"use client";

import { Button } from "@/components/ui/Button";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

export function QuoteCTA({ vehicle, className }: { vehicle: Vehicle; className?: string }) {
  const { openQuote } = useQuote();

  return (
    <Button
      variant="primary"
      size="lg"
      className={className}
      onClick={(event) =>
        openQuote(
          {
            slug: vehicle.slug,
            name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
            stockNumber: vehicle.stockNumber,
            priceLabel: vehicle.priceLabel,
          },
          event.currentTarget
        )
      }
    >
      {vehicle.cta.label}
    </Button>
  );
}
