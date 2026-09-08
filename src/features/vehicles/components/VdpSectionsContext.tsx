"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface VdpSectionsContextValue {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  /** Sets the active section and scrolls the section nav into view — for cross-links outside the nav itself (e.g. "View Pricing Details"). */
  goToSection: (id: string) => void;
}

const VdpSectionsContext = createContext<VdpSectionsContextValue | null>(null);

/**
 * Shares "which VDP section is active" between `VehicleSectionNav` (desktop
 * tabs / tablet-mobile accordion) and cross-links elsewhere on the page
 * (VehiclePrice's "View Pricing Details" → Financing) so both can drive the
 * same state instead of relying on anchor scrolling, which stopped working
 * once the desktop nav switched from "scroll to section" to true tabs.
 */
export function VdpSectionsProvider({ defaultId, children }: { defaultId: string; children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(defaultId);

  const value = useMemo<VdpSectionsContextValue>(
    () => ({
      activeId,
      setActiveId,
      goToSection: (id) => {
        setActiveId(id);
        document.getElementById("vdp-sections")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
