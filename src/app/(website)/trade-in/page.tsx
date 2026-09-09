import { TradeInClient } from "@/features/tradein/components/TradeInClient";
import { getVehicleBySlug } from "@/features/vehicles/services/vehicles.service";
import { siteConfig } from "@/config/site.config";
import type { TradeInReplacementVehicle } from "@/features/tradein/types/tradein.types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade-In Appraisal",
  description: `Get an estimated value for your current vehicle — it's quick, easy and free. Use your trade-in value towards your next commercial vehicle with ${siteConfig.legalName}.`,
  alternates: { canonical: "/trade-in" },
};

interface TradeInPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Trade-In Appraisal (page-05-trade-in-appraisal.md §4/§5). Server component
 * so a VDP link's `?vehicle=<slug>` replacement-vehicle context resolves on
 * first paint — same pattern as the Payment Calculator page. An unknown or
 * missing slug just falls back to the standalone flow.
 */
export default async function TradeInPage({ searchParams }: TradeInPageProps) {
  const params = await searchParams;
  const vehicleSlug = firstValue(params.vehicle);
  const vehicle = vehicleSlug ? (getVehicleBySlug(vehicleSlug) ?? null) : null;

  const replacementVehicle: TradeInReplacementVehicle | null = vehicle
    ? {
        slug: vehicle.slug,
        name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
        priceLabel: vehicle.priceLabel,
        imageUrl: vehicle.images[0]?.url,
      }
    : null;

  return <TradeInClient initialReplacementVehicle={replacementVehicle} />;
}
