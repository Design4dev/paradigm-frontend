import { SpecIcon } from "@/components/ui/Icons";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

export function VehicleSpecs({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section aria-labelledby="specs-heading">
      <h2 id="specs-heading" className="text-heading-l mb-5">
        Specifications
      </h2>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {vehicle.specs.map((spec) => (
          <div key={spec.label} className="flex items-start gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-gray text-primary-red">
              <SpecIcon name={spec.icon} className="h-5 w-5" />
            </span>
            <div>
              <dt className="text-caption-s text-dark-neutral/75">{spec.label}</dt>
              <dd className="text-label-m text-primary-black">{spec.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
