import { VrpPageClient, type VrpInitialState } from "@/features/vehicles/components/VrpPageClient";
import { EMPTY_VRP_FILTERS, VRP_SORT_OPTIONS, type VrpFilters, type VrpSort } from "@/features/vehicles/services/vehicles.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Browse Paradigm Fleet's commercial vehicle inventory — cargo vans, box trucks, pickups and more.",
};

interface VehiclesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function csv(value: string | string[] | undefined): string[] {
  const raw = firstValue(value);
  return raw ? raw.split(",").filter(Boolean) : [];
}

function filtersFromSearchParams(params: Record<string, string | string[] | undefined>): VrpFilters {
  return {
    q: firstValue(params.q) ?? EMPTY_VRP_FILTERS.q,
    types: csv(params.type),
    make: firstValue(params.make) ?? EMPTY_VRP_FILTERS.make,
    model: firstValue(params.model) ?? EMPTY_VRP_FILTERS.model,
    yearMin: firstValue(params.yearMin) ?? EMPTY_VRP_FILTERS.yearMin,
    yearMax: firstValue(params.yearMax) ?? EMPTY_VRP_FILTERS.yearMax,
    priceMin: firstValue(params.priceMin) ?? EMPTY_VRP_FILTERS.priceMin,
    priceMax: firstValue(params.priceMax) ?? EMPTY_VRP_FILTERS.priceMax,
    mileage: firstValue(params.mileage) ?? EMPTY_VRP_FILTERS.mileage,
    location: firstValue(params.location) ?? EMPTY_VRP_FILTERS.location,
    conditions: csv(params.condition),
  };
}

const SORT_VALUES = new Set(VRP_SORT_OPTIONS.map((option) => option.value));

function sortFromSearchParams(params: Record<string, string | string[] | undefined>): VrpSort {
  const raw = firstValue(params.sort);
  return raw && SORT_VALUES.has(raw as VrpSort) ? (raw as VrpSort) : "newest";
}

/**
 * Vehicle Results Page (VRP) — page-02-vrp.md. A server component so a
 * direct/shared link (nav, category cards, Featured Fleet's "View All
 * Inventory", Homepage search) renders the right filtered view on first
 * paint; all further interaction (category strip, filter sidebar/drawer,
 * sort, grid/list, pagination) is owned by the client orchestrator below,
 * which keeps the URL in sync.
 */
export default async function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const params = await searchParams;
  const view = firstValue(params.view) === "list" ? "list" : "grid";
  const page = Number(firstValue(params.page) ?? "1") || 1;

  const initial: VrpInitialState = {
    filters: filtersFromSearchParams(params),
    sort: sortFromSearchParams(params),
    view,
    page,
  };

  return <VrpPageClient initial={initial} />;
}
