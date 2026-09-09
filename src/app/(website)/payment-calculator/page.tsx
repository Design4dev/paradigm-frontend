import { PaymentCalculatorClient } from "@/features/finance/components/PaymentCalculatorClient";
import { getVehicleBySlug } from "@/features/vehicles/services/vehicles.service";
import { siteConfig } from "@/config/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Calculator",
  description: `Estimate your vehicle payment based on price, down payment, loan term, payment frequency and APR — ${siteConfig.legalName}.`,
  alternates: { canonical: "/payment-calculator" },
};

interface PaymentCalculatorPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Payment Calculator (page-04-payment-calculator.md). Server component so a
 * VDP link's `?vehicle=<slug>` context resolves to a real vehicle on first
 * paint — an unknown/missing slug just falls back to the standalone
 * calculator (§53 "Vehicle context invalid → fall back to standalone
 * calculator") rather than a broken page.
 */
export default async function PaymentCalculatorPage({ searchParams }: PaymentCalculatorPageProps) {
  const params = await searchParams;
  const vehicleSlug = firstValue(params.vehicle);
  const vehicle = vehicleSlug ? (getVehicleBySlug(vehicleSlug) ?? null) : null;

  return <PaymentCalculatorClient initialVehicle={vehicle} />;
}
