import { Button } from "@/components/ui/Button";
import { ShieldIcon } from "@/components/ui/Icons";
import Link from "next/link";

/** Supporting finance reassurance banner (§5.8) above the footer. */
export function CalculatorSupportingSection() {
  return (
    <div className="container-page pb-12 sm:pb-16">
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-border bg-soft-gray p-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-red/15">
            <ShieldIcon className="h-6 w-6 text-primary-red" />
          </span>
          <div>
            <p className="text-heading-m">Flexible Financing for Your Business</p>
            <p className="text-body-m mt-1 text-dark-neutral/60">
              We work with multiple lenders to get you the best rates and terms for your fleet needs.
            </p>
          </div>
        </div>
        <Link href="/services#leasing-financing" className="shrink-0">
          <Button type="button" variant="secondary" size="lg">
            Learn About Financing
          </Button>
        </Link>
      </div>
    </div>
  );
}
