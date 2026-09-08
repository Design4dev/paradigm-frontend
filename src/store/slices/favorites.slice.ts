import type { StateCreator } from "zustand";

export interface FavoritesSlice {
  favoriteSlugs: string[];
  toggleFavorite: (slug: string) => void;
}

/**
 * Persisted "Save" state (page-02-vrp.md "favorites" / page-03-vdp.md §6
 * Save control) — shared across VehicleCard, VehicleListRow and the VDP so
 * saving a vehicle from any of the three stays in sync everywhere, and
 * survives a reload via the store's existing `persist` middleware.
 */
export const createFavoritesSlice: StateCreator<FavoritesSlice> = (set) => ({
  favoriteSlugs: [],
  toggleFavorite: (slug) =>
    set((state) => ({
      favoriteSlugs: state.favoriteSlugs.includes(slug)
        ? state.favoriteSlugs.filter((s) => s !== slug)
        : [...state.favoriteSlugs, slug],
    })),
});
