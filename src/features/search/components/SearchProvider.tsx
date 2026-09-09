"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

interface SearchContextValue {
  isOpen: boolean;
  initialQuery: string;
  openSearch: (initialQuery?: string, trigger?: HTMLElement | null) => void;
  closeSearch: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const SearchContext = createContext<SearchContextValue | null>(null);

/**
 * Backs the free-text SearchOverlay — the Hero's Buy/Rent search and the
 * Global Search bar now navigate straight to the real, filtered Vehicle
 * Listing instead of opening this overlay (page-01-homepage.md §8), so its
 * remaining real use is the VDP 404 page's "Search Vehicles" fallback.
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");
  const triggerRef = useRef<HTMLElement | null>(null);

  const openSearch = useCallback((query?: string, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setInitialQuery(query ?? "");
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, initialQuery, openSearch, closeSearch, triggerRef }),
    [isOpen, initialQuery, openSearch, closeSearch]
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
