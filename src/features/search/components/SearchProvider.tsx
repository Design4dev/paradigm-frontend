"use client";

import type { AdvancedSearchFilters } from "@/features/vehicles/services/vehicles.service";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

interface SearchContextValue {
  isOpen: boolean;
  initialQuery: string;
  /** When set, the overlay shows these structured results instead of running the free-text query. */
  initialFilters: AdvancedSearchFilters | null;
  openSearch: (initialQuery?: string, trigger?: HTMLElement | null, filters?: AdvancedSearchFilters | null) => void;
  closeSearch: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const SearchContext = createContext<SearchContextValue | null>(null);

/**
 * Backs the single, always-in-page search experience (Header icon, Hero
 * Buy/Rent tabs, Advanced Search) — every entry point opens the same
 * overlay instead of navigating to a separate page/route.
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");
  const [initialFilters, setInitialFilters] = useState<AdvancedSearchFilters | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openSearch = useCallback((query?: string, trigger?: HTMLElement | null, filters?: AdvancedSearchFilters | null) => {
    triggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setInitialQuery(query ?? "");
    setInitialFilters(filters ?? null);
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, initialQuery, initialFilters, openSearch, closeSearch, triggerRef }),
    [isOpen, initialQuery, initialFilters, openSearch, closeSearch]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
