"use client";

import { trackEvent, type AnalyticsEvent } from "@/features/analytics/services/tracking.service";
import { useCallback } from "react";

export function useTrackEvent() {
  return useCallback((event: AnalyticsEvent) => trackEvent(event), []);
}
