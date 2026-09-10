"use client";

import { SearchEmpty } from "@/features/search/components/SearchEmpty";
import { SearchResults } from "@/features/search/components/SearchResults";
import { useSearch } from "@/features/search/components/SearchProvider";
import { CloseIcon, SearchIcon, SpinnerIcon } from "@/components/ui/Icons";
import { FeedbackCard } from "@/components/ui/FeedbackCard";
import { IconButton } from "@/components/ui/IconButton";
import { Dialog } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { getAllVehicles, searchVehicles, vehicleTypes } from "@/features/vehicles/services/vehicles.service";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import { useEffect, useRef, useState } from "react";

/** "idle" is derived straight from the query text, not tracked as state. */
type AsyncStatus = "loading" | "results" | "empty" | "error";

/** Free-text search overlay — the VDP 404 page's "Search Vehicles" fallback (§23). */
export function SearchOverlay() {
  const { isOpen, initialQuery, closeSearch, triggerRef } = useSearch();
  const [query, setQuery] = useState("");
  const [asyncStatus, setAsyncStatus] = useState<AsyncStatus>("loading");
  const [results, setResults] = useState<Vehicle[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset to whatever opened the overlay. Adjusting state in response to a
  // changed prop belongs in render, not an effect — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [trackedIsOpen, setTrackedIsOpen] = useState(isOpen);
  if (isOpen !== trackedIsOpen) {
    setTrackedIsOpen(isOpen);
    if (isOpen) {
      setQuery(initialQuery);
    }
  }

  const trimmed = query.trim();
  const isIdle = trimmed.length === 0;
  // Real current inventory, shown immediately on open rather than leaving
  // the overlay empty until the visitor types something.
  const defaultResults = getAllVehicles();

  useEffect(() => {
    if (!isOpen || isIdle) return;

    // This effect intentionally sets "loading" synchronously so the
    // spinner appears the instant a query changes, then resolves it
    // asynchronously after the debounce delay below — a standard
    // debounced-search pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAsyncStatus("loading");

    // Prototype-only recovery-path trigger: search "error" to see and test
    // the Error state + Retry affordance without a real backend.
    if (trimmed.toLowerCase() === "error") {
      const timeout = setTimeout(() => setAsyncStatus("error"), 500);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      const matches = searchVehicles({ query });
      setResults(matches);
      setAsyncStatus(matches.length === 0 ? "empty" : "results");
    }, 380);

    return () => clearTimeout(timeout);
  }, [query, isOpen, isIdle, trimmed]);

  const retry = () => {
    setAsyncStatus("loading");
    setTimeout(() => {
      const matches = searchVehicles({ query });
      setResults(matches);
      setAsyncStatus(matches.length === 0 ? "empty" : "results");
    }, 300);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={closeSearch}
      labelledBy="search-overlay-title"
      variant="fullscreen"
      returnFocusRef={triggerRef}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-border">
          <div className="container-page flex items-center gap-3 py-4">
            <h2 id="search-overlay-title" className="sr-only">
              Search the fleet
            </h2>
            <SearchIcon className="h-5 w-5 shrink-0 opacity-50" />
            <label htmlFor="overlay-search-input" className="sr-only">
              Search by vehicle, brand, type or location
            </label>
            <input
              id="overlay-search-input"
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Transit vans, RAV4, Hamilton…"
              className="focus-ring text-heading-m h-12 flex-1 rounded-[var(--radius-control)] bg-transparent text-primary-black placeholder:text-dark-neutral/30"
            />
            <IconButton aria-label="Close search" onClick={closeSearch}>
              <CloseIcon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>

        <div className="container-page flex-1 overflow-y-auto py-8">
          {isIdle && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-label-m mb-3 text-dark-neutral/60">Browse by type</p>
                <div className="flex flex-wrap gap-2">
                  {vehicleTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setQuery(type)}
                      className="focus-ring text-label-m rounded-full border border-border px-4 py-2 text-primary-black transition-colors duration-[var(--duration-micro)] hover:border-primary-red hover:text-primary-red"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-label-m mb-4 text-dark-neutral/60">All current inventory</p>
                <SearchResults results={defaultResults} />
              </div>
            </div>
          )}

          {!isIdle && asyncStatus === "loading" && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-dark-neutral/60" role="status" aria-live="polite">
              <SpinnerIcon className="h-6 w-6 text-primary-red" />
              <p className="text-body-m">Searching the fleet…</p>
            </div>
          )}

          {!isIdle && asyncStatus === "results" && <SearchResults results={results} query={query} />}

          {!isIdle && asyncStatus === "empty" && <SearchEmpty query={query} onClear={() => setQuery("")} />}

          {!isIdle && asyncStatus === "error" && (
            <div className="mx-auto max-w-md py-16">
              <FeedbackCard
                status="error"
                title="Something went wrong"
                message="We couldn't complete that search. Please try again."
                action={
                  <Button variant="primary" onClick={retry} className="mx-auto">
                    Retry
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
