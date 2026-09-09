import { Button } from "@/components/ui/Button";
import { getVehicleMatches } from "@/features/finance/lib/vehicleMatches";
import type { CalculatorResult } from "@/features/finance/types/calculator.types";
import Link from "next/link";

/**
 * Vehicle match count + primary/secondary CTAs (§25/§26/§27/§36). The count
 * and the "View Vehicles" query are both derived from the real inventory
 * data via `getVehicleMatches` — never a static/invented number.
 */
export function VehicleMatchCTA({ result, onTalkToFinance }: { result: CalculatorResult; onTalkToFinance: () => void }) {
  const matches = getVehicleMatches(result);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-caption-s text-center text-dark-neutral/60">
        {matches.count > 0
          ? `${matches.count} vehicle${matches.count === 1 ? "" : "s"} found at this budget`
          : "No vehicles currently match this budget."}
      </p>
      <Link href={matches.href} className="w-full">
        <Button type="button" variant="primary" size="lg" className="w-full">
          {matches.count > 0 ? "View Matching Vehicles" : "View All Vehicles"} →
        </Button>
      </Link>
      <Button type="button" variant="secondary" size="lg" className="w-full" onClick={onTalkToFinance}>
        Talk to Our Finance Experts
      </Button>
    </div>
  );
}
