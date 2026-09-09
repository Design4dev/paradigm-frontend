"use client";

import { AvailabilityBadge, Pill } from "@/components/ui/Badge";
import { HeartIcon, ImageOffIcon, SpecIcon } from "@/components/ui/Icons";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import type { Vehicle, SpecIconName } from "@/features/vehicles/types/vehicle.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/** Order the card's spec row pulls from `vehicle.specs`, matching the reference screenshot. */
const CARD_SPEC_ORDER: SpecIconName[] = ["mileage", "engine", "transmission", "fuel"];

export function VehicleCard({ vehicle, priority = false }: { vehicle: Vehicle; priority?: boolean }) {
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const saved = useAppStore((state) => state.favoriteSlugs.includes(vehicle.slug));
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const { openQuote } = useQuote();
  const primaryImage = vehicle.images[0];
  const cardSpecs = CARD_SPEC_ORDER.map((icon) => vehicle.specs.find((spec) => spec.icon === icon)).filter(
    (spec): spec is Vehicle["specs"][number] => Boolean(spec)
  );

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-[transform,box-shadow] duration-[var(--duration-micro)] ease-[var(--ease-out-standard)] hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-soft-gray">
        <Link href={`/vehicles/${vehicle.slug}`} className="focus-ring absolute inset-0 block" aria-label={`View ${vehicle.year} ${vehicle.brand} ${vehicle.model}`}>
          {imageStatus !== "failed" ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
              className={cn(
                "object-contain p-3 transition-transform duration-300 ease-[var(--ease-out-standard)] group-hover:scale-[1.04]",
                imageStatus === "loading" && "opacity-0"
              )}
              onLoad={() => setImageStatus("loaded")}
              onError={() => setImageStatus("failed")}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-dark-neutral/40">
              <ImageOffIcon className="h-8 w-8 opacity-40" />
              <span className="text-caption-s">Image unavailable</span>
            </div>
          )}
          {imageStatus === "loading" && <div className="absolute inset-0 animate-pulse bg-soft-gray" aria-hidden="true" />}
        </Link>

        {vehicle.isNew && (
          <Pill tone="red" className="pointer-events-none absolute left-3 top-3">
            New
          </Pill>
        )}

        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${vehicle.brand} ${vehicle.model} from saved vehicles` : `Save ${vehicle.brand} ${vehicle.model}`}
          onClick={() => toggleFavorite(vehicle.slug)}
          className="focus-ring absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-white/90 text-primary-black shadow-sm transition-colors duration-[var(--duration-micro)] hover:bg-primary-white"
        >
          <HeartIcon active={saved} className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <Link href={`/vehicles/${vehicle.slug}`} className="focus-ring rounded">
            <h3 className="text-heading-m text-primary-black">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </h3>
          </Link>
          <span className="text-heading-m shrink-0 text-primary-red">{vehicle.priceLabel}</span>
        </div>

        <AvailabilityBadge status={vehicle.availability} className="w-fit" />

        <ul className="text-label-m flex flex-wrap items-center gap-x-3.5 gap-y-2 leading-snug text-dark-neutral/80">
          {cardSpecs.map((spec) => (
            <li key={spec.label} className="flex items-center gap-1.5">
              <SpecIcon name={spec.icon} className="h-4 w-4 shrink-0 text-dark-neutral/70" />
              {spec.value}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="focus-ring flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-[var(--radius-control)] bg-primary-red px-2 text-label-m text-primary-white transition-colors duration-[var(--duration-micro)] hover:bg-accent-red-dark"
          >
            View Vehicle
          </Link>
          <button
            type="button"
            onClick={(event) =>
              openQuote({ slug: vehicle.slug, name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}` }, event.currentTarget)
            }
            className="focus-ring flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-[var(--radius-control)] border border-primary-black px-2 text-label-m text-primary-black transition-colors duration-[var(--duration-micro)] hover:bg-primary-black hover:text-primary-white"
          >
            Request a Quote
          </button>
        </div>
      </div>
    </div>
  );
}
