import { Button } from "@/components/ui/Button";
import { heroImage } from "@/features/vehicles/config/images.config";
import Image from "next/image";
import Link from "next/link";

/**
 * Final dark commercial-vehicle CTA band (§26) — full-bleed image banner
 * with left copy / right action, matching the approved reference's layout
 * (distinct from the generic centered `CTA` shared component — same
 * precedent as the Payment Calculator's own CalculatorSupportingSection
 * having its own tailored final section rather than forcing a mismatched
 * shared layout).
 */
export function TradeInFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-primary-black">
      <Image src={heroImage.url} alt={heroImage.alt} fill sizes="100vw" className="object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/85 to-primary-black/50" aria-hidden="true" />

      <div className="container-page relative flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center sm:py-10">
        <div>
          <h2 className="text-heading-l text-primary-white">Ready to See What Your Vehicle Is Worth?</h2>
          <p className="text-body-m mt-1 text-primary-white/70">Get started now or talk to our team for personalized assistance.</p>
        </div>
        <Link href="/contact" className="shrink-0">
          <Button type="button" variant="primary" size="lg">
            Contact Our Team →
          </Button>
        </Link>
      </div>
    </section>
  );
}
