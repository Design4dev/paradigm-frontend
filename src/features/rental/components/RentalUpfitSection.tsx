import { buttonClassName } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { RENTAL_UPFIT_HIGHLIGHTS } from "@/features/rental/config/rental.config";
import Link from "next/link";

/**
 * "More Than a Rental" (spec §9) — connects the rental flow to Paradigm
 * Fleet's real, existing Upfitting offering rather than inventing a
 * rental-only upfit product. CTA goes to the same `/services#upfitting`
 * anchor used by primary nav's "Upfitting" and ServicesGrid's card.
 */
export function RentalUpfitSection() {
  return (
    <section aria-labelledby="rental-upfit-heading" className="border-y border-border bg-soft-gray py-16 sm:py-20">
      <div className="container-page grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <p className="text-label-m mb-3 text-primary-red">More Than a Rental</p>
          <h2 id="rental-upfit-heading" className="text-heading-l mb-3">
            Need more than a vehicle?
          </h2>
          <p className="text-body-m max-w-lg text-dark-neutral/65">
            Paradigm Fleet supports businesses with commercial vehicle sales, leasing, rentals, service and custom
            upfitting.
          </p>
          <Link href="/services#upfitting" className={buttonClassName({ variant: "primary", size: "lg", className: "mt-6" })}>
            Explore Upfitting
          </Link>
        </div>

        <ul className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-6">
          {RENTAL_UPFIT_HIGHLIGHTS.map((item) => (
            <li key={item} className="text-body-m flex items-center gap-3 text-primary-black">
              <CheckIcon className="h-4 w-4 shrink-0 text-primary-red" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
