import type { StateCreator } from "zustand";

const MAX_RECENTLY_VIEWED = 6;

export interface RecentlyViewedSlice {
  recentlyViewedSlugs: string[];
  markVehicleViewed: (slug: string) => void;
}

export const createRecentlyViewedSlice: StateCreator<RecentlyViewedSlice> = (set) => ({
  recentlyViewedSlugs: [],
  markVehicleViewed: (slug) =>
    set((state) => ({
      recentlyViewedSlugs: [slug, ...state.recentlyViewedSlugs.filter((s) => s !== slug)].slice(
        0,
        MAX_RECENTLY_VIEWED
      ),
    })),
});
