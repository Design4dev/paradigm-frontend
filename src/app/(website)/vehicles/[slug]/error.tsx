"use client";

import { Button } from "@/components/ui/Button";
import { AlertIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { useEffect } from "react";

/** VDP-scoped error boundary (page-03-vdp.md §25) — "Back to Inventory" instead of the generic error page's "Back to Homepage". */
export default function VehicleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-red/10">
        <AlertIcon className="h-6 w-6 text-primary-red" />
      </span>
      <h1 className="text-display-l">We couldn&apos;t load this vehicle</h1>
      <p className="text-body-l max-w-md text-dark-neutral/60">
        Something went wrong fetching this vehicle&apos;s details. You can try again, or head back to inventory.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="primary" size="lg" onClick={reset}>
          Try Again
        </Button>
        <Link href="/vehicles">
          <Button variant="secondary" size="lg">
            Back to Inventory
          </Button>
        </Link>
      </div>
    </div>
  );
}
