import {
  EMPTY_VRP_FILTERS,
  filterVehiclesForVrp,
  vrpFiltersToSearchParams,
} from "@/features/vehicles/services/vehicles.service";
import type { CalculatorResult } from "@/features/finance/types/calculator.types";

export interface VehicleMatches {
  count: number;
  /** `/vehicles?priceMax=…` — the real, filtered VRP query (§25/§26), never a static/invented count. */
  href: string;
}

/** Connects the calculator's estimated budget to real inventory data — one shared mapping so VRP's filter shape is never duplicated. */
export function getVehicleMatches(result: CalculatorResult): VehicleMatches {
  const filters = { ...EMPTY_VRP_FILTERS, priceMax: String(Math.round(result.vehicleBudget)) };
  const count = filterVehiclesForVrp(filters).length;
  const href = `/vehicles?${vrpFiltersToSearchParams(filters).toString()}`;
  return { count, href };
}
