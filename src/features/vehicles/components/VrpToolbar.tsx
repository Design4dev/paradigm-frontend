"use client";

import { Button } from "@/components/ui/Button";
import { FilterIcon, GridIcon, ListIcon } from "@/components/ui/Icons";
import { Select } from "@/components/ui/Select";
import { VRP_SORT_OPTIONS, type VrpSort } from "@/features/vehicles/services/vehicles.service";
import { cn } from "@/lib/utils";

interface VrpToolbarProps {
  resultCount: number;
  sort: VrpSort;
  onSortChange: (sort: VrpSort) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  activeFilterCount: number;
  onOpenFilters: () => void;
  filterButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

/** Result count + sort + grid/list toggle + mobile "Filters (N)" trigger (page-02-vrp.md §7). */
export function VrpToolbar({
  resultCount,
  sort,
  onSortChange,
  view,
  onViewChange,
  activeFilterCount,
  onOpenFilters,
  filterButtonRef,
}: VrpToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Button ref={filterButtonRef} variant="primary" onClick={onOpenFilters} className="lg:hidden">
          <FilterIcon tone="white" className="h-4 w-4" />
          Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
        </Button>
        <p className="text-body-m text-dark-neutral/70" role="status" aria-live="polite">
          <span className="text-heading-m text-primary-black">{resultCount}</span>{" "}
          {resultCount === 1 ? "Vehicle" : "Vehicles"} Found
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select
          label="Sort by"
          hideLabel
          options={VRP_SORT_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
          value={sort}
          onChange={(event) => onSortChange(event.target.value as VrpSort)}
          containerClassName="w-44"
        />
        <div className="flex items-center gap-1 rounded-[var(--radius-control)] border border-border p-1">
          <button
            type="button"
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            onClick={() => onViewChange("grid")}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-[calc(var(--radius-control)-2px)] transition-colors duration-[var(--duration-micro)]",
              view === "grid" ? "bg-primary-red" : "hover:bg-soft-gray"
            )}
          >
            <GridIcon tone={view === "grid" ? "white" : "dark"} className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            aria-label="List view"
            onClick={() => onViewChange("list")}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-[calc(var(--radius-control)-2px)] transition-colors duration-[var(--duration-micro)]",
              view === "list" ? "bg-primary-red" : "hover:bg-soft-gray"
            )}
          >
            <ListIcon tone={view === "list" ? "white" : "dark"} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
