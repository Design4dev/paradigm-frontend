import { PaymentEstimator } from "@/features/vehicles/components/PaymentEstimator";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import Link from "next/link";

/**
 * Financing — a standalone VDP section (not one of the tab-nav sections)
 * per the reference's request that it stand on its own. The payment
 * estimator always renders, no click required to reveal it.
 */
export function VehicleFinancing({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section aria-labelledby="financing-heading" className="flex flex-col gap-5">
      <h2 id="financing-heading" className="text-heading-l">
        Financing
      </h2>
      <p className="text-body-m max-w-2xl text-dark-neutral/80">
        Paradigm Fleet works with commercial lenders across Southern Ontario on lease and loan options for fleet and
        owner-operator purchases. Estimate a monthly payment below, or talk to our team about a tailored quote.
      </p>

      <Link href="/services#leasing-financing" className="focus-ring text-label-m w-fit rounded text-primary-red hover:underline">
        View Financing Options →
      </Link>

      <PaymentEstimator vehicle={vehicle} />
    </section>
  );
}
