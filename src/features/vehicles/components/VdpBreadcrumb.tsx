"use client";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { getBreadcrumbCategory } from "@/features/vehicles/services/vehicles.service";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import { useState } from "react";

/** Reads the referring VRP search (if any) once, at mount — see the component doc comment below. */
function inventoryHrefFromReferrer(): string {
  if (typeof document === "undefined") return "/vehicles";
  const referrer = document.referrer;
  if (referrer && referrer.startsWith(`${window.location.origin}/vehicles`)) {
    return referrer.slice(window.location.origin.length);
  }
  return "/vehicles";
}

/**
 * VDP breadcrumb (page-03-vdp.md §5). The "Inventory" crumb points back at
 * the visitor's actual filtered VRP search when they arrived from one
 * (§21 — "Back to Inventory should preserve the relevant result state"),
 * falling back to the plain `/vehicles` listing otherwise. Read once via a
 * lazy `useState` initializer (not an effect) since `document.referrer`
 * never changes for the life of this page — the same pattern `useMediaQuery`
 * uses for its own browser-API initial read.
 */
export function VdpBreadcrumb({ vehicle }: { vehicle: Vehicle }) {
  const category = getBreadcrumbCategory(vehicle.type);
  const [inventoryHref] = useState(inventoryHrefFromReferrer);

  return (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Inventory", href: inventoryHref },
        { label: category.label, href: category.href },
        { label: `${vehicle.year} ${vehicle.brand} ${vehicle.model}` },
      ]}
    />
  );
}
