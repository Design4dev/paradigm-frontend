"use client";

import { StarIcon, VehicleTypeIcon } from "@/components/ui/Icons";
import { VRP_CATEGORIES } from "@/features/vehicles/services/vehicles.service";
import { cn } from "@/lib/utils";

/**
 * Category navigation strip (page-02-vrp.md §6), immediately below the VRP
 * hero. "Specialty Vehicles" reuses the existing star icon; every other
 * category shares one generic vehicle glyph — the label carries the
 * distinction rather than a bespoke pictogram per category, matching this
 * project's icon system (raster only, reused wherever reasonable instead of
 * generating a large one-off icon set — see Icons.tsx).
 */
/** Approved marketing figure from the design reference — see FleetSearch's INVENTORY_HEADLINE for the same convention. */
const ALL_VEHICLES_HEADLINE_COUNT = "500+";

export function VrpCategoryStrip({
  activeType,
  onSelect,
}: {
  activeType: string | null;
  onSelect: (type: string | null) => void;
}) {
  return (
    <nav aria-label="Vehicle categories" className="border-b border-border bg-surface">
      <div className="container-page flex gap-2 overflow-x-auto py-4">
        {VRP_CATEGORIES.map((category) => {
          const active = activeType === category.type;
          const Icon = category.type === "Specialty Vehicle" ? StarIcon : VehicleTypeIcon;
          return (
            <button
              key={category.label}
              type="button"
              onClick={() => onSelect(category.type)}
              aria-pressed={active}
              className={cn(
                "focus-ring flex shrink-0 flex-col items-center gap-1.5 rounded-[var(--radius-control)] border px-4 py-2.5 transition-colors duration-[var(--duration-micro)]",
                active
                  ? "border-primary-red bg-surface text-primary-red shadow-sm"
                  : "border-transparent bg-soft-gray text-dark-neutral/70 hover:border-border"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "opacity-100" : "opacity-50")} />
              <span className="text-label-m whitespace-nowrap">
                {category.label}
                {category.type === null && ` (${ALL_VEHICLES_HEADLINE_COUNT})`}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
