import { CheckIcon } from "@/components/ui/Icons";
import { QuoteCTA } from "@/features/vehicles/components/QuoteCTA";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/** Vehicle Overview section (page-03-vdp.md §12) — real description + a data-backed "Why Choose This Vehicle?" checklist. */
export function VehicleOverview({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section aria-labelledby="overview-heading" className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <h2 id="overview-heading" className="text-heading-l mb-4">
          Vehicle Overview
        </h2>
        <p className="text-body-l text-dark-neutral/80">{vehicle.description}</p>
      </div>

      {vehicle.whyChoose && vehicle.whyChoose.length > 0 && (
        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-soft-gray p-6">
          <h3 className="text-heading-m">Why Choose This Vehicle?</h3>
          <ul className="flex flex-col gap-2.5">
            {vehicle.whyChoose.map((reason) => (
              <li key={reason} className="text-body-m flex items-start gap-2 text-primary-black">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-red" />
                {reason}
              </li>
            ))}
          </ul>
          <QuoteCTA vehicle={vehicle} className="mt-1 w-full" />
        </div>
      )}
    </section>
  );
}
