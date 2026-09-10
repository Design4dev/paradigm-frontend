"use client";

import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { useEffect, useRef } from "react";

/** Fires `rental_landing_view` once on mount — kept as a tiny client leaf so `/rentals/page.tsx` can stay a server component. */
export function RentalLandingViewTracker() {
  const track = useTrackEvent();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    track({ name: "rental_landing_view" });
  }, [track]);

  return null;
}
