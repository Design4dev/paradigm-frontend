"use client";

import { Button } from "@/components/ui/Button";
import { SearchIcon } from "@/components/ui/Icons";
import { useSearch } from "@/features/search/components/SearchProvider";

/** Opens the same header search overlay used site-wide — used by the VDP's 404 state. */
export function SearchVehiclesButton() {
  const { openSearch } = useSearch();

  return (
    <Button variant="secondary" size="lg" onClick={(event) => openSearch(undefined, event.currentTarget)}>
      <SearchIcon className="h-4 w-4 opacity-70" />
      Search Vehicles
    </Button>
  );
}
