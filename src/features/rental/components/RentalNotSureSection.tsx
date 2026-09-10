import { buttonClassName } from "@/components/ui/Button";
import Link from "next/link";

/**
 * "Not Sure What You Need?" (spec §7) — a dedicated section, kept AFTER the
 * fleet section and secondary to the direct Rent It path (spec §2's
 * primary goal is See Vehicles → Choose Vehicle → Rent It). Only entry
 * point to the finder on this page — no duplicate CTA elsewhere.
 */
export function RentalNotSureSection() {
  return (
    <section aria-labelledby="rental-not-sure-heading" className="container-page py-10 sm:py-12">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <h2 id="rental-not-sure-heading" className="text-heading-l text-primary-black">
          Not Sure What You Need?
        </h2>
        <p className="text-body-m text-dark-neutral/65">
          Tell us what you&apos;re carrying, how you use your vehicle and how long you need it. We&apos;ll help you find
          the right rental.
        </p>
        <Link href="/rentals/find-your-fleet" className={buttonClassName({ variant: "secondary", size: "lg", className: "mt-2" })}>
          Find Your Fleet
        </Link>
      </div>
    </section>
  );
}
