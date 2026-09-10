import { RENTAL_FLEET_VEHICLES } from "@/features/rental/config/booking.config";
import type { RentalAddOn, RentalFleetVehicle } from "@/features/rental/types/booking.types";

/**
 * Availability/catalog adapter boundary (spec §23/§32/§33). `getVehicles()`
 * returns the real, verified fleet catalog (see booking.config.ts),
 * optionally filtered by category — this project has no per-unit, per-date
 * availability calendar or real-time filtering logic, so this only ever
 * represents "categories this fleet offers," never a live inventory count
 * or date-aware availability. Swap the body for a real availability API
 * once one exists — every call site already reads through this boundary.
 *
 * `getAddons()` / `getCoverageOptions()` return an empty catalog
 * deliberately: no real add-on or coverage products/pricing were verified
 * from the client's actual booking engine content this pass (Apprentall's
 * own stepper confirms these stages exist, but their contents were never
 * reached/observed). Per the brief's explicit instruction ("do not invent
 * real add-ons/coverage or prices... show an honest empty/integration
 * state"), the corresponding steps render an honest "not yet available"
 * state instead of guessed line items.
 */
export function getVehicles(filter?: { category?: string | null }): RentalFleetVehicle[] {
  if (!filter?.category) return RENTAL_FLEET_VEHICLES;
  return RENTAL_FLEET_VEHICLES.filter((vehicle) => vehicle.slug === filter.category);
}

export function getVehicleBySlug(slug: string): RentalFleetVehicle | null {
  return RENTAL_FLEET_VEHICLES.find((vehicle) => vehicle.slug === slug) ?? null;
}

export function getAddons(): RentalAddOn[] {
  return [];
}

export function getCoverageOptions(): RentalAddOn[] {
  return [];
}
