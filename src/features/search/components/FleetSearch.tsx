"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Select } from "@/components/ui/Select";
import { Dialog } from "@/components/ui/Modal";
import { AdvancedSearchPanel } from "@/features/search/components/AdvancedSearchPanel";
import { useSearch } from "@/features/search/components/SearchProvider";
import {
  EMPTY_ADVANCED_FILTERS,
  advancedFiltersToVrpFilters,
  advancedSearchVehicles,
  vehicleLocations,
  vehicleMakes,
  vehicleTypes,
  vrpFiltersToSearchParams,
  type AdvancedSearchFilters,
} from "@/features/vehicles/services/vehicles.service";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";

type SearchTab = "buy" | "rent" | "service" | "parts";

const TABS: { id: SearchTab; label: string }[] = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "service", label: "Service" },
  { id: "parts", label: "Parts" },
];

const toOptions = (values: string[], allLabel: string) => [
  { label: allLabel, value: "Any" },
  ...values.map((value) => ({ label: value, value })),
];

/**
 * Approved marketing copy from the homepage design reference (§6) — this is
 * a real inventory-scale claim, not derived from the small mock dataset
 * (`vehicles.length`), which exists only to illustrate card/filter behavior.
 */
const INVENTORY_HEADLINE = "500+ Commercial Vehicles Available";

/**
 * The Hero's primary search module (page-01-homepage.md §6). Buy/Rent
 * searches open the shared, in-page SearchOverlay (never navigate away —
 * see SearchProvider); Service/Parts are direct actions, not vehicle
 * search, so they go to /contact.
 */
export function FleetSearch() {
  const router = useRouter();
  const { openSearch } = useSearch();
  const [tab, setTab] = useState<SearchTab>("buy");
  const [type, setType] = useState("Any");
  const [make, setMake] = useState("Any");
  const [location, setLocation] = useState("Any");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedSearchFilters>(EMPTY_ADVANCED_FILTERS);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const advancedTriggerRef = useRef<HTMLButtonElement>(null);
  const isSmUp = useMediaQuery(MEDIA_QUERIES.smUp);
  const panelTitleId = useId();

  const resultCount = advancedSearchVehicles(advancedFilters).length;

  /** Navigates to the real, filtered Vehicle Listing (VRP) — never a generic listing that ignores the selection. */
  const goToListing = (filters: AdvancedSearchFilters) => {
    const params = vrpFiltersToSearchParams(advancedFiltersToVrpFilters(filters));
    const query = params.toString();
    router.push(query ? `/vehicles?${query}` : "/vehicles");
  };

  const submitBuy = (event: React.FormEvent) => {
    event.preventDefault();
    goToListing({ ...EMPTY_ADVANCED_FILTERS, type, make, location });
  };

  const submitRent = (event: React.FormEvent) => {
    event.preventDefault();
    openSearch(undefined, searchButtonRef.current, { ...EMPTY_ADVANCED_FILTERS, type, location });
  };

  const applyAdvanced = () => {
    setAdvancedOpen(false);
    goToListing(advancedFilters);
  };

  const clearAdvanced = () => setAdvancedFilters(EMPTY_ADVANCED_FILTERS);

  return (
    <div className="w-full max-w-2xl">
      {/* Tabs */}
      <div role="tablist" aria-label="Search by" className="flex gap-1">
        {TABS.map((item) => {
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`search-tab-${item.id}`}
              aria-selected={active}
              aria-controls={`search-tabpanel-${item.id}`}
              onClick={() => setTab(item.id)}
              className={cn(
                "focus-ring text-label-m relative rounded-t-[var(--radius-control)] px-5 py-2.5 transition-colors duration-[var(--duration-micro)]",
                active
                  ? "bg-surface text-primary-red"
                  : "bg-primary-white/10 text-primary-white hover:bg-primary-white/20"
              )}
            >
              {item.label}
              {active && <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 bg-primary-red" />}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="rounded-b-[var(--radius-card)] rounded-tr-[var(--radius-card)] bg-surface p-5 shadow-lg sm:p-6">
        {tab === "buy" && (
          <div id="search-tabpanel-buy" role="tabpanel" aria-labelledby="search-tab-buy">
            <form onSubmit={submitBuy} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end lg:grid-cols-[1fr_1fr_1fr_auto]">
              <Select label="Vehicle Type" options={toOptions(vehicleTypes, "Any Type")} value={type} onChange={(e) => setType(e.target.value)} />
              <Select label="Make" options={toOptions(vehicleMakes, "Any Make")} value={make} onChange={(e) => setMake(e.target.value)} />
              <Select label="Location" options={toOptions(vehicleLocations, "Any Location")} value={location} onChange={(e) => setLocation(e.target.value)} containerClassName="sm:col-span-2 lg:col-span-1" />
              <Button ref={searchButtonRef} type="submit" variant="primary" size="md" className="w-full sm:col-span-2 lg:w-auto">
                Search Vehicles
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-label-m text-dark-neutral/60">{INVENTORY_HEADLINE}</p>
              <button
                ref={advancedTriggerRef}
                type="button"
                aria-expanded={advancedOpen}
                onClick={() => setAdvancedOpen(true)}
                className="focus-ring text-label-m inline-flex items-center gap-1 rounded text-primary-red hover:underline"
              >
                Advanced Search
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            {isSmUp && advancedOpen && (
              <AdvancedSearchPanel
                filters={advancedFilters}
                onChange={(patch) => setAdvancedFilters((prev) => ({ ...prev, ...patch }))}
                onApply={applyAdvanced}
                onClear={clearAdvanced}
                onClose={() => setAdvancedOpen(false)}
                resultCount={resultCount}
                variant="inline"
                titleId={panelTitleId}
              />
            )}
          </div>
        )}

        {tab === "rent" && (
          <div id="search-tabpanel-rent" role="tabpanel" aria-labelledby="search-tab-rent">
            <form onSubmit={submitRent} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end">
              <Select label="Vehicle Type" options={toOptions(vehicleTypes, "Any Type")} value={type} onChange={(e) => setType(e.target.value)} />
              <Select label="Location" options={toOptions(vehicleLocations, "Any Location")} value={location} onChange={(e) => setLocation(e.target.value)} />
              <Button ref={searchButtonRef} type="submit" variant="primary" size="md" className="w-full sm:col-span-2">
                Search Rentals
              </Button>
            </form>
            <p className="text-body-m mt-4 text-dark-neutral/60">
              Flexible short-term rentals and multi-year leases for Southern Ontario businesses.{" "}
              <a href="/services#rentals" className="focus-ring rounded text-primary-red hover:underline">
                Learn about rentals →
              </a>
            </p>
          </div>
        )}

        {tab === "service" && (
          <div id="search-tabpanel-service" role="tabpanel" aria-labelledby="search-tab-service">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push("/contact");
              }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end"
            >
              <Select label="Location" options={toOptions(vehicleLocations, "Any Location")} value={location} onChange={(e) => setLocation(e.target.value)} />
              <Button type="submit" variant="primary" size="md" className="w-full">
                Book Service
              </Button>
            </form>
            <p className="text-body-m mt-4 text-dark-neutral/60">
              Maintenance, repairs and upfit servicing for your whole fleet — our team will confirm the nearest bay.
            </p>
          </div>
        )}

        {tab === "parts" && (
          <div id="search-tabpanel-parts" role="tabpanel" aria-labelledby="search-tab-parts">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push("/contact");
              }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end"
            >
              <Select label="Vehicle Type" options={toOptions(vehicleTypes, "Any Type")} value={type} onChange={(e) => setType(e.target.value)} />
              <Button type="submit" variant="primary" size="md" className="w-full">
                Request Parts Quote
              </Button>
            </form>
            <p className="text-body-m mt-4 text-dark-neutral/60">
              OEM and upfit parts for the makes we service. Tell us the vehicle and we&apos;ll confirm availability.
            </p>
          </div>
        )}
      </div>

      {/* Mobile: Advanced Search opens as a full-screen drawer instead of expanding inline. */}
      {!isSmUp && (
        <Dialog
          isOpen={advancedOpen}
          onClose={() => setAdvancedOpen(false)}
          labelledBy={panelTitleId}
          variant="fullscreen"
          returnFocusRef={advancedTriggerRef}
        >
          <AdvancedSearchPanel
            filters={advancedFilters}
            onChange={(patch) => setAdvancedFilters((prev) => ({ ...prev, ...patch }))}
            onApply={applyAdvanced}
            onClear={clearAdvanced}
            onClose={() => setAdvancedOpen(false)}
            resultCount={resultCount}
            variant="sheet"
            titleId={panelTitleId}
          />
        </Dialog>
      )}
    </div>
  );
}
