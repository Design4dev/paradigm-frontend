"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface VdpSectionsContextValue {
  /** Which tab-nav section is currently active — driven by scroll-spy on desktop, by the open accordion row on tablet/mobile. */
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  /** Smoothly scrolls any element by id into view — used by tab clicks and by cross-links (e.g. VehiclePrice's "View Pricing Details" → the standalone Financing section, which isn't a tab at all). */
  scrollToSection: (id: string) => void;
}

const VdpSectionsContext = createContext<VdpSectionsContextValue | null>(null);

/**
 * Shares "which VDP tab section is active" between `VehicleSectionNav`
 * (desktop scroll-spy tabs / tablet-mobile accordion) and cross-links
 * elsewhere on the page, and exposes one shared smooth-scroll helper so
 * every "jump to a section" action behaves identically (accounting for the
 * sticky nav's height via each section's own `scroll-mt-*`).
 */
export function VdpSectionsProvider({ defaultId, children }: { defaultId: string; children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(defaultId);

  const value = useMemo<VdpSectionsContextValue>(
    () => ({
      activeId,
      setActiveId,
      scrollToSection: (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    }),
    [activeId]
  );

  return <VdpSectionsContext.Provider value={value}>{children}</VdpSectionsContext.Provider>;
}

export function useVdpSections() {
  const context = useContext(VdpSectionsContext);
  if (!context) {
    throw new Error("useVdpSections must be used within a VdpSectionsProvider");
  }
  return context;
}
