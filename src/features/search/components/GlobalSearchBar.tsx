"use client";

import { Button } from "@/components/ui/Button";
import { CloseIcon, MapPinIcon, ResourceIcon, SearchIcon, SpinnerIcon, VehicleTypeIcon, WrenchIcon, NoResultsIcon } from "@/components/ui/Icons";
import {
  getGlobalSearchSuggestions,
  groupSuggestions,
  type GlobalSearchSuggestion,
  type SearchCategory,
} from "@/features/search/services/globalSearch.service";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

const CATEGORY_ICON: Record<SearchCategory, (props: { className?: string }) => React.ReactElement> = {
  Vehicles: VehicleTypeIcon,
  Services: WrenchIcon,
  Locations: MapPinIcon,
  Resources: ResourceIcon,
};

type Status = "idle" | "loading" | "results";

export interface GlobalSearchBarProps {
  /** Trigger button text — defaults to "Search"; the Hero's Advanced Search entry point passes "Advanced Search". */
  label?: string;
  /** Controlled mode: when provided (with `onExpandedChange`), the expand/collapse state is driven by these instead of internal state — same controlled/uncontrolled pattern as `AccordionItem`. */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Adds an explicit "Search" button after the field (the Hero's Advanced Search view) — off by default so the plain expanded field is unchanged elsewhere. */
  showSearchButton?: boolean;
}

/**
 * Global Search — replaces the old "Advanced Search" trigger/panel
 * (page-01-homepage.md §8). Expands in place into a real search input with
 * live, categorized suggestions across every real content type on the
 * site (Vehicles/Services/Locations/Resources), rather than a 9-field
 * structured filter form — the VRP's own filter sidebar already covers
 * exhaustive structured filtering once a visitor is browsing inventory.
 */
export function GlobalSearchBar({
  label = "Search",
  expanded: controlledExpanded,
  onExpandedChange,
  showSearchButton = false,
}: GlobalSearchBarProps = {}) {
  const router = useRouter();
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(false);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : uncontrolledExpanded;
  const setExpanded = useCallback(
    (value: boolean) => {
      if (isControlled) onExpandedChange?.(value);
      else setUncontrolledExpanded(value);
    },
    [isControlled, onExpandedChange]
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [suggestions, setSuggestions] = useState<GlobalSearchSuggestion[]>([]);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  // Click-outside collapses the search back to its trigger button.
  useEffect(() => {
    if (!expanded) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [expanded, setExpanded]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clearing back to idle is part of the same debounced-search state machine as the "loading" set below.
      setSuggestions([]);
      setStatus("idle");
      return;
    }
    // Intentionally synchronous — the spinner should appear the instant the
    // query changes, resolved asynchronously after the debounce below (same
    // pattern as SearchOverlay's debounced search).
    setStatus("loading");
    const timeout = setTimeout(() => {
      getGlobalSearchSuggestions(trimmed).then((results) => {
        setSuggestions(results);
        setStatus("results");
        setHighlighted(-1);
      });
    }, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  const groups = useMemo(() => groupSuggestions(suggestions), [suggestions]);

  const collapse = () => {
    setExpanded(false);
    setQuery("");
    setSuggestions([]);
    setStatus("idle");
  };

  const go = (suggestion: GlobalSearchSuggestion) => {
    collapse();
    router.push(suggestion.href);
  };

  /** Same fallback used by the Enter key and the explicit Search button (§ Advanced Search "Search" button) — navigates to the real, filtered inventory search rather than a generic listing. */
  const runQuerySearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    collapse();
    router.push(`/vehicles?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      if (query) {
        setQuery("");
      } else {
        collapse();
      }
      return;
    }
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      setHighlighted((index) => Math.min(index + 1, suggestions.length - 1));
      return;
    }
    if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      setHighlighted((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const target = suggestions[highlighted] ?? suggestions[0];
      if (target) {
        go(target);
      } else {
        runQuerySearch();
      }
    }
  };

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="focus-ring text-label-m inline-flex items-center gap-1.5 rounded text-primary-red hover:underline"
      >
        <SearchIcon className="h-4 w-4" />
        {label}
      </button>
    );
  }

  const showDropdown = query.trim().length > 0;
  let flatIndex = -1;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2">
        <div className="focus-within:border-primary-black flex h-11 min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-control)] border border-border bg-surface px-3">
          <SearchIcon className="h-4 w-4 shrink-0 opacity-50" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={listboxId}
            aria-autocomplete="list"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search vehicles, services, locations…"
            className="text-body-m flex-1 bg-transparent text-primary-black placeholder:text-dark-neutral/40 focus:outline-none"
          />
          {status === "loading" && <SpinnerIcon className="h-4 w-4 shrink-0" />}
          {/* Only shown once there's something to clear — an empty field has nothing to close via this icon (Escape/click-outside still collapse it). */}
          {showDropdown && (
            <button type="button" onClick={collapse} aria-label="Close search" className="focus-ring shrink-0 rounded text-dark-neutral/50 hover:text-primary-black">
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        {showSearchButton && (
          <Button type="button" variant="primary" size="md" onClick={runQuerySearch} className="shrink-0">
            Search
          </Button>
        )}
      </div>

      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute inset-x-0 top-full z-[var(--z-dropdown)] mt-2 max-h-96 overflow-y-auto rounded-[var(--radius-card)] border border-border bg-surface p-2 shadow-lg"
        >
          {status === "loading" && suggestions.length === 0 ? (
            <div className="flex items-center justify-center gap-2 py-8 text-dark-neutral/60">
              <SpinnerIcon className="h-4 w-4" />
              <span className="text-body-m">Searching…</span>
            </div>
          ) : groups.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center text-dark-neutral/60">
              <NoResultsIcon className="h-6 w-6 opacity-50" />
              <p className="text-body-m">No results for &ldquo;{query.trim()}&rdquo;</p>
              <p className="text-caption-s">Try a vehicle make/model, a service, or a city.</p>
            </div>
          ) : (
            groups.map((group) => {
              const Icon = CATEGORY_ICON[group.category];
              return (
                <div key={group.category} className="mb-1 last:mb-0">
                  <p className="text-caption-s px-2 pb-1 pt-2 font-semibold uppercase tracking-wide text-dark-neutral/50">
                    {group.category}
                  </p>
                  {group.items.map((suggestion) => {
                    flatIndex += 1;
                    const isActive = flatIndex === highlighted;
                    return (
                      <button
                        key={suggestion.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onMouseEnter={() => setHighlighted(flatIndex)}
                        onClick={() => go(suggestion)}
                        className={cn(
                          "focus-ring flex w-full items-start gap-3 rounded-[var(--radius-control)] px-2 py-2 text-left transition-colors duration-[var(--duration-micro)]",
                          isActive ? "bg-soft-gray" : "hover:bg-soft-gray"
                        )}
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-red" />
                        <span className="min-w-0">
                          <span className="text-label-m block truncate text-primary-black">{suggestion.label}</span>
                          {suggestion.sublabel && (
                            <span className="text-caption-s block truncate text-dark-neutral/60">{suggestion.sublabel}</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
