"use client";

import { ImageOffIcon, MapPinIcon, SpecIcon, ThumbsUpIcon } from "@/components/ui/Icons";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import type { SpecIconName, Vehicle } from "@/features/vehicles/types/vehicle.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CARD_SPEC_ORDER: SpecIconName[] = ["mileage", "engine", "transmission", "fuel"];

/** VRP "List" view row (page-02-vrp.md §7 grid/list toggle) — same data/actions as VehicleCard, laid out horizontally. */
export function VehicleListRow({ vehicle, priority = false }: { vehicle: Vehicle; priority?: boolean }) {
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const saved = useAppStore((state) => state.favoriteSlugs.includes(vehicle.slug));
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const { openQuote } = useQuote();
  const primaryImage = vehicle.images[0];
  const cardSpecs = CARD_SPEC_ORDER.map((icon) => vehicle.specs.find((spec) => spec.icon === icon)).filter(
    (spec): spec is Vehicle["specs"][number] => Boolean(spec)
  );

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-4 transition-shadow duration-[var(--duration-micro)] hover:shadow-lg sm:flex-row sm:p-5">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[var(--radius-control)] bg-soft-gray sm:w-56">
        <Link href={`/vehicles/${vehicle.slug}`} className="focus-ring absolute inset-0 block" aria-label={`View ${vehicle.year} ${vehicle.brand} ${vehicle.model}`}>
          {imageStatus !== "failed" ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              priority={priority}
              sizes="(min-width: 640px) 224px, 100vw"
              className={cn("object-cover", imageStatus === "loading" && "opacity-0")}
              onLoad={() => setImageStatus("loaded")}
              onError={() => setImageStatus("failed")}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-dark-neutral/40">
              <ImageOffIcon className="h-8 w-8 opacity-40" />
            </div>
          )}
        </Link>
        {vehicle.isNew && (
          <span className="text-label-m pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center rounded-full bg-primary-red px-3 py-1 text-xs text-primary-white">
            New
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <Link href={`/vehicles/${vehicle.slug}`} className="focus-ring rounded">
            <h3 className="text-heading-m text-primary-black">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </h3>
          </Link>
          <button
            type="button"
            aria-pressed={saved}
            aria-label={saved ? `Remove ${vehicle.brand} ${vehicle.model} from saved vehicles` : `Save ${vehicle.brand} ${vehicle.model}`}
            onClick={() => toggleFavorite(vehicle.slug)}
            className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-dark-neutral/50 hover:bg-soft-gray"
          >
            <ThumbsUpIcon active={saved} className="h-4 w-4" />
          </button>
        </div>

        <ul className="text-caption-s flex flex-wrap items-center gap-x-3 gap-y-1.5 text-dark-neutral/60">
          {cardSpecs.map((spec) => (
            <li key={spec.label} className="flex items-center gap-1.5">
              <SpecIcon name={spec.icon} className="h-3.5 w-3.5 shrink-0 opacity-50" />
              {spec.value}
            </li>
          ))}
        </ul>

        <p className="text-caption-s flex items-center gap-1.5 text-dark-neutral/60">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0 opacity-50" />
          {vehicle.location}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="text-heading-l text-primary-red">{vehicle.priceLabel}</span>
          <div className="flex items-center gap-2">
            <Link
              href={`/vehicles/${vehicle.slug}`}
              className="focus-ring flex h-10 items-center justify-center whitespace-nowrap rounded-[var(--radius-control)] bg-primary-red px-4 text-label-m text-primary-white transition-colors duration-[var(--duration-micro)] hover:bg-accent-red-dark"
            >
              View Vehicle
            </Link>
            <button
              type="button"
              onClick={(event) =>
                openQuote({ slug: vehicle.slug, name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}` }, event.currentTarget)
              }
              className="focus-ring flex h-10 items-center justify-center whitespace-nowrap rounded-[var(--radius-control)] border border-primary-black px-4 text-label-m text-primary-black transition-colors duration-[var(--duration-micro)] hover:bg-primary-black hover:text-primary-white"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
