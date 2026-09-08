"use client";

import { useAppStore } from "@/store";
import { useEffect } from "react";

/** Invisible — records the current VDP visit into the recently-viewed store. */
export function RecentlyViewedTracker({ slug }: { slug: string }) {
  const markVehicleViewed = useAppStore((state) => state.markVehicleViewed);

  useEffect(() => {
    markVehicleViewed(slug);
  }, [slug, markVehicleViewed]);

  return null;
}
