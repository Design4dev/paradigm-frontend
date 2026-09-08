import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createFavoritesSlice, type FavoritesSlice } from "@/store/slices/favorites.slice";
import { createRecentlyViewedSlice, type RecentlyViewedSlice } from "@/store/slices/recentlyViewed.slice";

type AppState = RecentlyViewedSlice & FavoritesSlice;

/**
 * Single app-wide client store, composed from per-domain slices (the
 * "slices" pattern zustand's own docs recommend once a store grows past one
 * concern). Add a new slice file under `store/slices/` and spread it in
 * here — nothing else needs to change.
 */
export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createRecentlyViewedSlice(...a),
      ...createFavoritesSlice(...a),
    }),
    { name: "paradigm-fleet-store" }
  )
);
