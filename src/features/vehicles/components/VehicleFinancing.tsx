"use client";

import { Button } from "@/components/ui/Button";
import { PaymentEstimator } from "@/features/vehicles/components/PaymentEstimator";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import Link from "next/link";
import { useState } from "react";

/** Financing section (page-03-vdp.md §17) — connects to a real inline calculator rather than a disconnected one. */
export function VehicleFinancing({ vehicle }: { vehicle: Vehicle }) {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <section aria-labelledby="financing-heading" className="flex flex-col gap-5">
      <h2 id="financing-heading" className="text-heading-l">
        Financing
      </h2>
      <p className="text-body-m max-w-2xl text-dark-neutral/80">
        Paradigm Fleet works with commercial lenders across Southern Ontario on lease and loan options for fleet and
        owner-operator purchases. Estimate a monthly payment below, or talk to our team about a tailored quote.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Link href="/services#leasing-financing" className="focus-ring text-label-m rounded text-primary-red hover:underline">
          View Financing Options →
        </Link>
        <Button variant="secondary" onClick={() => setShowCalculator((value) => !value)} aria-expanded={showCalculator}>
          {showCalculator ? "Hide Estimate Payments" : "Estimate Payments →"}
        </Button>
      </div>

      {showCalculator && <PaymentEstimator vehicle={vehicle} />}
    </section>
  );
}
