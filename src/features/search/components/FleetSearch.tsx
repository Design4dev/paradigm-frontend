"use client";

import { Button } from "@/components/ui/Button";
import { ClipboardIcon, ResourceIcon, VehicleTypeIcon } from "@/components/ui/Icons";
import { Select } from "@/components/ui/Select";
import { GlobalSearchBar } from "@/features/search/components/GlobalSearchBar";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import { BOOKING_LOCATIONS, RENTAL_CATEGORIES } from "@/features/rental/config/booking.config";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import {
  EMPTY_ADVANCED_FILTERS,
  advancedFiltersToVrpFilters,
  vehicleLocations,
  vehicleMakes,
  vehicleTypes,
  vrpFiltersToSearchParams,
  type AdvancedSearchFilters,
} from "@/features/vehicles/services/vehicles.service";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
 * searches navigate straight to the real, filtered Vehicle Listing (VRP —
 * never a generic listing that ignores the selection); Service/Parts are
 * direct actions, not vehicle search.
 */
export function FleetSearch() {
  const router = useRouter();
  const { openQuote } = useQuote();
  const setRentalCategory = useRentalBookingStore((s) => s.setCategory);
  const [tab, setTab] = useState<SearchTab>("buy");
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [type, setType] = useState("Any");
  const [make, setMake] = useState("Any");
  const [location, setLocation] = useState("Any");
  // Rentals are a separate catalog/taxonomy from sales inventory (own
  // categories, own single verified location) — kept as its own state
  // rather than reusing Buy's `type`/`location`, which are sales-inventory
  // values and would be meaningless on the rental side.
  const [rentCategory, setRentCategory] = useState("Any");

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

  /**
   * Rentals live entirely under `/rentals`, never the sales inventory
   * listing — this hands off to the real Rental Search page (the same one
   * every "Rent It" uses), carrying the chosen category into the shared
   * rental store rather than a sales VRP query string.
   */
  const submitRent = (event: React.FormEvent) => {
    event.preventDefault();
    if (rentCategory !== "Any") {
      setRentalCategory(rentCategory);
    }
    router.push("/rentals/search");
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Buy/Rent/Service/Parts — a true segmented control: one rounded outer shell, no gaps between segments. Only the top corners carry the outer radius (Buy's bottom-left and Parts's bottom-right are square) so the bar sits flush against the card below. Hidden completely while Advanced Search is open. */}
      {!advancedSearchOpen && (
        <div role="tablist" aria-label="Search by" className="flex w-fit overflow-hidden rounded-t-[var(--radius-card)] border border-primary-white/25">
          {TABS.map((item, index) => {
            const active = item.id === tab;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`search-tab-${item.id}`}
                aria-selected={active}
                aria-controls={`search-tabpanel-${item.id}`}
                onClick={() => {
                  setTab(item.id);
                  setAdvancedSearchOpen(false);
                }}
                className={cn(
                  "focus-ring text-label-m px-5 py-2.5 transition-colors duration-[var(--duration-micro)]",
                  index > 0 && "border-l border-primary-white/25",
                  active ? "bg-primary-red text-primary-white" : "bg-primary-white/10 text-primary-white hover:bg-primary-white/20"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Panel — two independent cards, not one shape toggled by tab state. With the tab bar showing (any of Buy/Rent/Service/Parts), the panel's top-left corner is always square so it sits flush under the tab bar. With Advanced Search open (tab bar hidden), the panel always keeps the full/default radius on all corners. Explicit per-corner classes rather than "rounded + override" so there's no reliance on Tailwind's utility generation order. */}
      <div
        className={cn(
          "bg-surface p-5 shadow-lg sm:p-6",
          !advancedSearchOpen
            ? "rounded-tr-[var(--radius-card)] rounded-br-[var(--radius-card)] rounded-bl-[var(--radius-card)]"
            : "rounded-[var(--radius-card)]"
        )}
      >
        {advancedSearchOpen && (
          <div className="flex flex-col gap-4">
            <GlobalSearchBar
              label="Advanced Search"
              expanded
              showSearchButton
              onExpandedChange={(next) => !next && setAdvancedSearchOpen(false)}
            />
            {/* Same row/position the collapsed "Advanced Search" trigger occupied in the normal Buy view below. */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-label-m text-dark-neutral/60">{INVENTORY_HEADLINE}</p>
              <button
                type="button"
                onClick={() => setAdvancedSearchOpen(false)}
                className="focus-ring text-label-m rounded text-primary-red hover:underline"
              >
                Normal Search
              </button>
            </div>
          </div>
        )}

        {!advancedSearchOpen && tab === "buy" && (
          <div id="search-tabpanel-buy" role="tabpanel" aria-labelledby="search-tab-buy">
            <form onSubmit={submitBuy} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end lg:grid-cols-[1fr_1fr_1fr_auto]">
              <Select label="Vehicle Type" options={toOptions(vehicleTypes, "Any Type")} value={type} onChange={(e) => setType(e.target.value)} />
              <Select label="Make" options={toOptions(vehicleMakes, "Any Make")} value={make} onChange={(e) => setMake(e.target.value)} />
              <Select label="Location" options={toOptions(vehicleLocations, "Any Location")} value={location} onChange={(e) => setLocation(e.target.value)} containerClassName="sm:col-span-2 lg:col-span-1" />
              <Button type="submit" variant="primary" size="md" className="w-full sm:col-span-2 lg:w-auto">
                Search Vehicles
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-label-m text-dark-neutral/60">{INVENTORY_HEADLINE}</p>
              <GlobalSearchBar label="Advanced Search" expanded={false} onExpandedChange={(next) => next && setAdvancedSearchOpen(true)} />
            </div>
          </div>
        )}

        {!advancedSearchOpen && tab === "rent" && (
          <div id="search-tabpanel-rent" role="tabpanel" aria-labelledby="search-tab-rent">
            <form onSubmit={submitRent} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end">
              <Select
                label="Vehicle Type"
                options={[{ label: "Any Type", value: "Any" }, ...RENTAL_CATEGORIES.map((category) => ({ label: category.name, value: category.slug }))]}
                value={rentCategory}
                onChange={(e) => setRentCategory(e.target.value)}
              />
              {/* Only one pickup location is verified (design.md §7) — shown, not offered as a fake choice. */}
              <Select
                label="Location"
                options={BOOKING_LOCATIONS.map((loc) => ({ label: loc.label, value: loc.value }))}
                value={BOOKING_LOCATIONS[0].value}
                disabled
              />
              <Button type="submit" variant="primary" size="md" className="w-full sm:col-span-2">
                Search Rentals
              </Button>
            </form>
            <p className="text-body-m mt-4 text-dark-neutral/60">
              Flexible short-term rentals and multi-year leases for Southern Ontario businesses.{" "}
              <Link href="/rentals" className="focus-ring rounded text-primary-red hover:underline">
                Learn about rentals →
              </Link>
            </p>
          </div>
        )}

        {!advancedSearchOpen && tab === "service" && (
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

        {!advancedSearchOpen && tab === "parts" && (
          <div id="search-tabpanel-parts" role="tabpanel" aria-labelledby="search-tab-parts" className="flex flex-col gap-2">
            {/*
              Real Parts journeys for a single-location dealer that funnels
              all parts inquiries through one contact channel — no fabricated
              parts catalog/category pages (page-03-vdp.md §31-style content
              rule). "Find Parts by Vehicle" reuses the real inventory
              browse; "Request a Part" reuses the real lead form with parts
              context; "Parts & Service Support" is the real contact path —
              matching footerServiceNav's own "Service & Parts" destination.
            */}
            <Link
              href="/vehicles"
              className="focus-ring flex items-center gap-3 rounded-[var(--radius-control)] border border-border px-4 py-3 transition-colors hover:border-primary-red"
            >
              <VehicleTypeIcon className="h-5 w-5 shrink-0 text-primary-red" />
              <span>
                <span className="text-label-m block text-primary-black">Find Parts by Vehicle</span>
                <span className="text-caption-s block text-dark-neutral/60">Browse inventory to identify your vehicle first</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={(event) => openQuote({ slug: "parts-request", name: "Parts Request" }, event.currentTarget)}
              className="focus-ring flex items-center gap-3 rounded-[var(--radius-control)] border border-border px-4 py-3 text-left transition-colors hover:border-primary-red"
            >
              <ClipboardIcon className="h-5 w-5 shrink-0 text-primary-red" />
              <span>
                <span className="text-label-m block text-primary-black">Request a Part</span>
                <span className="text-caption-s block text-dark-neutral/60">Tell us the part and vehicle — we&apos;ll confirm availability</span>
              </span>
            </button>
            <Link
              href="/contact"
              className="focus-ring flex items-center gap-3 rounded-[var(--radius-control)] border border-border px-4 py-3 transition-colors hover:border-primary-red"
            >
              <ResourceIcon className="h-5 w-5 shrink-0 text-primary-red" />
              <span>
                <span className="text-label-m block text-primary-black">Parts &amp; Service Support</span>
                <span className="text-caption-s block text-dark-neutral/60">Talk to our Service &amp; Parts team directly</span>
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
