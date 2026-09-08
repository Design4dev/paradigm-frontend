"use client";

import { useEffect, useState } from "react";

/** Reactively tracks a CSS media query (e.g. `"(min-width: 1024px)"`). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);

  // If `query` itself changes after mount, resync immediately during render
  // rather than one tick later in an effect — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [trackedQuery, setTrackedQuery] = useState(query);
  if (query !== trackedQuery) {
    setTrackedQuery(query);
    setMatches(typeof window !== "undefined" && window.matchMedia(query).matches);
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
