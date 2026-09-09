"use client";

import { IconButton } from "@/components/ui/IconButton";
import { CheckIcon, HeartIcon, ShareIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { QuoteCTA } from "@/features/vehicles/components/QuoteCTA";
import { VehicleContactActions } from "@/features/vehicles/components/VehicleContactActions";
import { VehicleMeta } from "@/features/vehicles/components/VehicleMeta";
import { VehiclePrice } from "@/features/vehicles/components/VehiclePrice";
import { VehicleSpecSummary } from "@/features/vehicles/components/VehicleSpecSummary";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import { useAppStore } from "@/store";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import { useState } from "react";

export function VehicleSummary({ vehicle }: { vehicle: Vehicle }) {
  const [copied, setCopied] = useState(false);
  const saved = useAppStore((state) => state.favoriteSlugs.includes(vehicle.slug));
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const { openQuote } = useQuote();

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: `${vehicle.brand} ${vehicle.model}`, url });
        return;
      } catch {
        // user cancelled — fall through silently
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op in this prototype
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <VehicleMeta vehicle={vehicle} />
        <div className="flex items-center gap-1">
          <IconButton
            aria-label={saved ? `Remove ${vehicle.brand} ${vehicle.model} from saved vehicles` : `Save ${vehicle.brand} ${vehicle.model}`}
            aria-pressed={saved}
            onClick={() => toggleFavorite(vehicle.slug)}
          >
            <HeartIcon active={saved} className="h-5 w-5" />
          </IconButton>
          <IconButton aria-label={copied ? "Link copied" : "Share this vehicle"} onClick={handleShare}>
            {copied ? <CheckIcon className="h-5 w-5" /> : <ShareIcon className="h-5 w-5" />}
          </IconButton>
        </div>
      </div>

      <h1 className="text-heading-l text-primary-black">
        {vehicle.year} {vehicle.brand} {vehicle.model}
      </h1>

      <VehicleSpecSummary vehicle={vehicle} />

      <VehiclePrice vehicle={vehicle} />

      <div id="vdp-primary-cta" className="flex flex-wrap items-center gap-3 pt-2">
        <QuoteCTA vehicle={vehicle} />
        <Button
          variant="secondary"
          size="lg"
          onClick={(event) =>
            openQuote(
              {
                slug: vehicle.slug,
                name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
                stockNumber: vehicle.stockNumber,
                priceLabel: vehicle.priceLabel,
                intent: "test-drive",
              },
              event.currentTarget
            )
          }
        >
          Book a Test Drive
        </Button>
      </div>

      <VehicleContactActions vehicle={vehicle} />
    </div>
  );
}
