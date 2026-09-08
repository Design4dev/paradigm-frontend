"use client";

import { Button } from "@/components/ui/Button";
import { ImageOffIcon } from "@/components/ui/Icons";
import { Dialog } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { BenefitStrip } from "@/components/sections/BenefitStrip";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { VehicleListRow } from "@/features/vehicles/components/VehicleListRow";
import { VrpCategoryStrip } from "@/features/vehicles/components/VrpCategoryStrip";
import { VrpFilterSidebar } from "@/features/vehicles/components/VrpFilterSidebar";
import { VrpHero } from "@/features/vehicles/components/VrpHero";
import { VrpPagination } from "@/features/vehicles/components/VrpPagination";
import { VrpToolbar } from "@/features/vehicles/components/VrpToolbar";
import {
  EMPTY_VRP_FILTERS,
  filterVehiclesForVrp,
  getConditionCounts,
  getVehicleTypeCounts,
  isVrpFiltered,
  sortVehiclesForVrp,
  vrpFiltersToSearchParams,
  type VrpFilters,
  type VrpSort,
} from "@/features/vehicles/services/vehicles.service";
import { usePathname, useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 6;

export interface VrpInitialState {
  filters: VrpFilters;
  sort: VrpSort;
  view: "grid" | "list";
  page: number;
}

function buildSearch(filters: VrpFilters, sort: VrpSort, view: "grid" | "list", page: number): string {
  const params = vrpFiltersToSearchParams(filters);
  if (sort !== "newest") params.set("sort", sort);
  if (view !== "grid") params.set("view", view);
  if (page !== 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `?${query}` : "";
}

/**
 * VRP orchestrator (page-02-vrp.md). Owns all interactive state — category,
 * sidebar filters (staged/"draft" until Apply, per the reference's Apply
 * Filters button), sort, grid/list view and pagination — and mirrors it into
 * the URL on every change so results are refreshable/shareable/back-forward
 * navigable (§10), without needing the whole page to be a client-fetching
 * route (the underlying data is still synchronous mock data today; a real
 * backend would swap `filterVehiclesForVrp`/`sortVehiclesForVrp` for a
 * fetch keyed off the same query params).
 */
export function VrpPageClient({ initial }: { initial: VrpInitialState }) {
  const router = useRouter();
  const pathname = usePathname();

  const [appliedFilters, setAppliedFilters] = useState<VrpFilters>(initial.filters);
  const [draftFilters, setDraftFilters] = useState<VrpFilters>(initial.filters);
  const [sort, setSort] = useState<VrpSort>(initial.sort);
  const [view, setView] = useState<"grid" | "list">(initial.view);
  const [page, setPage] = useState(initial.page);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const drawerTitleId = useId();

  const typeCounts = useMemo(() => getVehicleTypeCounts(), []);
  const conditionCounts = useMemo(() => getConditionCounts(), []);

  const filtered = useMemo(() => filterVehiclesForVrp(appliedFilters), [appliedFilters]);
  const sorted = useMemo(() => sortVehiclesForVrp(filtered, sort), [filtered, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageResults = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const activeType = appliedFilters.types.length === 1 ? appliedFilters.types[0] : null;
  const hasFilters = isVrpFiltered(appliedFilters);

  const sync = (next: { filters?: VrpFilters; sort?: VrpSort; view?: "grid" | "list"; page?: number }) => {
    const nextFilters = next.filters ?? appliedFilters;
    const nextSort = next.sort ?? sort;
    const nextView = next.view ?? view;
    const nextPage = next.page ?? page;
    router.push(`${pathname}${buildSearch(nextFilters, nextSort, nextView, nextPage)}`, { scroll: false });
  };

  const selectCategory = (type: string | null) => {
    const nextFilters: VrpFilters = { ...appliedFilters, types: type ? [type] : [] };
    setAppliedFilters(nextFilters);
    setDraftFilters(nextFilters);
    setPage(1);
    sync({ filters: nextFilters, page: 1 });
  };

  const applyDraft = () => {
    setAppliedFilters(draftFilters);
    setPage(1);
    setDrawerOpen(false);
    sync({ filters: draftFilters, page: 1 });
  };

  const resetDraft = () => {
    setDraftFilters(EMPTY_VRP_FILTERS);
    setAppliedFilters(EMPTY_VRP_FILTERS);
    setPage(1);
    sync({ filters: EMPTY_VRP_FILTERS, page: 1 });
  };

  const changeSort = (nextSort: VrpSort) => {
    setSort(nextSort);
    sync({ sort: nextSort });
  };

  const changeView = (nextView: "grid" | "list") => {
    setView(nextView);
    sync({ view: nextView });
  };

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    sync({ page: nextPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeFilterCount =
    draftFilters.types.length +
    draftFilters.conditions.length +
    (draftFilters.make !== "Any" ? 1 : 0) +
    (draftFilters.model !== "Any" ? 1 : 0) +
    (draftFilters.location !== "Any" ? 1 : 0) +
    (draftFilters.mileage !== "Any" ? 1 : 0) +
    (draftFilters.availability !== "Any" ? 1 : 0) +
    (draftFilters.yearMin || draftFilters.yearMax ? 1 : 0) +
    (draftFilters.priceMin || draftFilters.priceMax ? 1 : 0);

  return (
    <>
      <VrpHero />
      <VrpCategoryStrip activeType={activeType} onSelect={selectCategory} />

      <div className="container-page py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[var(--radius-card)] border border-border bg-surface p-6">
              <VrpFilterSidebar
                draft={draftFilters}
                onChange={(patch) => setDraftFilters((prev) => ({ ...prev, ...patch }))}
                onApply={applyDraft}
                onReset={resetDraft}
                typeCounts={typeCounts}
                conditionCounts={conditionCounts}
              />
            </div>
          </aside>

          <div>
            <VrpToolbar
              resultCount={sorted.length}
              sort={sort}
              onSortChange={changeSort}
              view={view}
              onViewChange={changeView}
              activeFilterCount={activeFilterCount}
              onOpenFilters={() => setDrawerOpen(true)}
              filterButtonRef={filterButtonRef}
            />

            {pageResults.length > 0 ? (
              <>
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-4"
                  }
                >
                  {pageResults.map((vehicle, index) =>
                    view === "grid" ? (
                      <Reveal key={vehicle.slug} className="h-full">
                        <VehicleCard vehicle={vehicle} priority={index < 3} />
                      </Reveal>
                    ) : (
                      <Reveal key={vehicle.slug}>
                        <VehicleListRow vehicle={vehicle} priority={index < 3} />
                      </Reveal>
                    )
                  )}
                </div>

                <div className="mt-10">
                  <VrpPagination page={currentPage} totalPages={totalPages} onPageChange={changePage} />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-border bg-surface py-20 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-soft-gray">
                  <ImageOffIcon className="h-6 w-6 opacity-50" />
                </span>
                <div>
                  <p className="text-heading-m">No vehicles match your current filters.</p>
                  <p className="text-body-m mt-1 text-dark-neutral/60">Try widening your search or clearing filters.</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {hasFilters && (
                    <Button variant="secondary" onClick={resetDraft}>
                      Clear Filters
                    </Button>
                  )}
                  <Button variant="primary" onClick={() => selectCategory(null)}>
                    View All Vehicles
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BenefitStrip tone="light" />

      {/* Mobile/tablet filter drawer — same field set as the desktop sidebar. */}
      <Dialog isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} labelledBy={drawerTitleId} variant="fullscreen" returnFocusRef={filterButtonRef}>
        <VrpFilterSidebar
          draft={draftFilters}
          onChange={(patch) => setDraftFilters((prev) => ({ ...prev, ...patch }))}
          onApply={applyDraft}
          onReset={resetDraft}
          typeCounts={typeCounts}
          conditionCounts={conditionCounts}
          variant="drawer"
          onClose={() => setDrawerOpen(false)}
          titleId={drawerTitleId}
        />
      </Dialog>
    </>
  );
}
