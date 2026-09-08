"use client";

import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/Icons";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  AVAILABILITY_OPTIONS,
  CONDITIONS,
  MILEAGE_BUCKETS,
  PRICE_BUCKETS,
  vehicleLocations,
  vehicleMakes,
  vehicleTypes,
  vehicleYears,
  type AdvancedSearchFilters,
} from "@/features/vehicles/services/vehicles.service";

const toOptions = (values: string[], allLabel = "Any") => [
  { label: allLabel, value: "Any" },
  ...values.map((value) => ({ label: value, value })),
];

interface AdvancedSearchPanelProps {
  filters: AdvancedSearchFilters;
  onChange: (patch: Partial<AdvancedSearchFilters>) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
  resultCount: number;
  /** "inline" renders as an expanded card under the hero search (desktop/tablet); "sheet" is the mobile full-screen layout. */
  variant?: "inline" | "sheet";
  titleId?: string;
}

/**
 * Advanced Search — page-01-homepage.md §8. Shared between the inline
 * desktop/tablet expansion and the mobile bottom-sheet/full-screen Dialog,
 * so the field set and filtering logic only exist once.
 */
export function AdvancedSearchPanel({
  filters,
  onChange,
  onApply,
  onClear,
  onClose,
  resultCount,
  variant = "inline",
  titleId,
}: AdvancedSearchPanelProps) {
  const fields = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Select
        label="Vehicle Type"
        options={toOptions(vehicleTypes, "Any Type")}
        value={filters.type}
        onChange={(event) => onChange({ type: event.target.value })}
      />
      <Select
        label="Make"
        options={toOptions(vehicleMakes, "Any Make")}
        value={filters.make}
        onChange={(event) => onChange({ make: event.target.value })}
      />
      <Input
        label="Model"
        placeholder="e.g. Transit"
        value={filters.model}
        onChange={(event) => onChange({ model: event.target.value })}
      />
      <Select
        label="Year"
        options={toOptions(vehicleYears.map(String), "Any Year")}
        value={filters.year}
        onChange={(event) => onChange({ year: event.target.value })}
      />
      <Select
        label="Price"
        options={PRICE_BUCKETS.map((bucket) => ({ label: bucket.label, value: bucket.value }))}
        value={filters.price}
        onChange={(event) => onChange({ price: event.target.value })}
      />
      <Select
        label="Mileage"
        options={MILEAGE_BUCKETS.map((bucket) => ({ label: bucket.label, value: bucket.value }))}
        value={filters.mileage}
        onChange={(event) => onChange({ mileage: event.target.value })}
      />
      <Select
        label="Condition"
        options={CONDITIONS.map((condition) => ({ label: condition.label, value: condition.value }))}
        value={filters.condition}
        onChange={(event) => onChange({ condition: event.target.value })}
      />
      <Select
        label="Location"
        options={toOptions(vehicleLocations, "Any Location")}
        value={filters.location}
        onChange={(event) => onChange({ location: event.target.value })}
      />
      <Select
        label="Availability"
        options={AVAILABILITY_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
        value={filters.availability}
        onChange={(event) => onChange({ availability: event.target.value })}
      />
    </div>
  );

  const actions = (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
      <p className="text-label-m text-dark-neutral/60" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "vehicle matches" : "vehicles match"}
      </p>
      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" onClick={onClear}>
          Clear All
        </Button>
        <Button type="button" variant="primary" onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );

  if (variant === "sheet") {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id={titleId} className="text-heading-m">
            Advanced Search
          </h2>
          <IconButton aria-label="Close advanced search" onClick={onClose}>
            <CloseIcon className="h-6 w-6" />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{fields}</div>
        <div className="border-t border-border px-5 py-4">{actions}</div>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 id={titleId} className="text-heading-m">
          Advanced Search
        </h3>
        <IconButton aria-label="Collapse advanced search" onClick={onClose}>
          <CloseIcon className="h-5 w-5" />
        </IconButton>
      </div>
      {fields}
      {actions}
    </div>
  );
}
