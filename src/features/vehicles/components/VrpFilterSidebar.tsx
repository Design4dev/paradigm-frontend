"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  AVAILABILITY_OPTIONS,
  MILEAGE_BUCKETS,
  VRP_CATEGORIES,
  getVehicleModels,
  vehicleLocations,
  vehicleMakes,
  type VrpFilters,
} from "@/features/vehicles/services/vehicles.service";

interface VrpFilterSidebarProps {
  draft: VrpFilters;
  onChange: (patch: Partial<VrpFilters>) => void;
  onApply: () => void;
  onReset: () => void;
  typeCounts: Record<string, number>;
  conditionCounts: { New: number; Used: number };
  /** "sidebar" = persistent desktop panel; "drawer" = mobile/tablet Dialog content with its own header/footer. */
  variant?: "sidebar" | "drawer";
  onClose?: () => void;
  titleId?: string;
}

const toOptions = (values: string[], allLabel: string) => [
  { label: allLabel, value: "Any" },
  ...values.map((value) => ({ label: value, value })),
];

/**
 * Desktop filter sidebar / mobile filter drawer (page-02-vrp.md §8/§9).
 * One implementation shared between both contexts so the field set can
 * never drift between breakpoints.
 */
export function VrpFilterSidebar({
  draft,
  onChange,
  onApply,
  onReset,
  typeCounts,
  conditionCounts,
  variant = "sidebar",
  onClose,
  titleId,
}: VrpFilterSidebarProps) {
  const toggleType = (type: string) => {
    const next = draft.types.includes(type) ? draft.types.filter((t) => t !== type) : [...draft.types, type];
    onChange({ types: next });
  };

  const toggleCondition = (condition: "New" | "Used") => {
    const next = draft.conditions.includes(condition)
      ? draft.conditions.filter((c) => c !== condition)
      : [...draft.conditions, condition];
    onChange({ conditions: next });
  };

  const models = getVehicleModels(draft.make);

  const fields = (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="vrp-search" className="text-label-m mb-1.5 block text-primary-black">
          Search
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
          <input
            id="vrp-search"
            type="search"
            value={draft.q}
            onChange={(event) => onChange({ q: event.target.value })}
            placeholder="Make, model or keyword"
            className="focus-ring h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface py-2 pl-10 pr-4 text-body-m leading-tight text-primary-black placeholder:text-dark-neutral/40 focus:border-primary-black"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-label-m mb-2 text-primary-black">Vehicle Type</legend>
        <div className="flex flex-col gap-1">
          {VRP_CATEGORIES.filter((c) => c.type).map((category) => (
            <Checkbox
              key={category.type}
              label={category.label}
              checked={draft.types.includes(category.type as string)}
              onChange={() => toggleType(category.type as string)}
              trailing={`(${typeCounts[category.type as string] ?? 0})`}
            />
          ))}
        </div>
      </fieldset>

      <Select
        label="Make"
        options={toOptions(vehicleMakes, "Any Make")}
        value={draft.make}
        onChange={(event) => onChange({ make: event.target.value, model: "Any" })}
      />

      <Select label="Model" options={toOptions(models, "Any Model")} value={draft.model} onChange={(event) => onChange({ model: event.target.value })} />

      <div>
        <p className="text-label-m mb-1.5 text-primary-black">Year</p>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Min Year"
            hideLabel
            type="number"
            inputMode="numeric"
            placeholder="Min Year"
            value={draft.yearMin}
            onChange={(event) => onChange({ yearMin: event.target.value })}
          />
          <Input
            label="Max Year"
            hideLabel
            type="number"
            inputMode="numeric"
            placeholder="Max Year"
            value={draft.yearMax}
            onChange={(event) => onChange({ yearMax: event.target.value })}
          />
        </div>
      </div>

      <div>
        <p className="text-label-m mb-1.5 text-primary-black">Price</p>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Min Price"
            hideLabel
            type="number"
            inputMode="numeric"
            placeholder="Min Price"
            value={draft.priceMin}
            onChange={(event) => onChange({ priceMin: event.target.value })}
          />
          <Input
            label="Max Price"
            hideLabel
            type="number"
            inputMode="numeric"
            placeholder="Max Price"
            value={draft.priceMax}
            onChange={(event) => onChange({ priceMax: event.target.value })}
          />
        </div>
      </div>

      <Select
        label="Mileage"
        options={MILEAGE_BUCKETS.map((bucket) => ({ label: bucket.label, value: bucket.value }))}
        value={draft.mileage}
        onChange={(event) => onChange({ mileage: event.target.value })}
      />

      <Select
        label="Location"
        options={toOptions(vehicleLocations, "Any Location")}
        value={draft.location}
        onChange={(event) => onChange({ location: event.target.value })}
      />

      <Select
        label="Availability"
        options={AVAILABILITY_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
        value={draft.availability}
        onChange={(event) => onChange({ availability: event.target.value })}
      />

      <fieldset>
        <legend className="text-label-m mb-2 text-primary-black">Condition</legend>
        <div className="flex flex-col gap-1">
          {(["New", "Used"] as const).map((condition) => (
            <Checkbox
              key={condition}
              label={condition}
              checked={draft.conditions.includes(condition)}
              onChange={() => toggleCondition(condition)}
              trailing={`(${conditionCounts[condition]})`}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );

  if (variant === "drawer") {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id={titleId} className="text-heading-m">
            Filters
          </h2>
          <IconButton aria-label="Close filters" onClick={onClose}>
            <CloseIcon className="h-6 w-6" />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{fields}</div>
        <div className="flex gap-3 border-t border-border px-5 py-4">
          <Button variant="ghost" onClick={onReset} className="flex-1">
            Reset All
          </Button>
          <Button variant="primary" onClick={onApply} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-m">Filters</h2>
        <button type="button" onClick={onReset} className="focus-ring text-label-m rounded text-primary-red hover:underline">
          Reset All
        </button>
      </div>
      {fields}
      <Button variant="primary" size="lg" onClick={onApply} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
}
