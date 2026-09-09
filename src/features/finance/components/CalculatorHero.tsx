import { BenefitStrip } from "@/components/sections/BenefitStrip";
import { ChevronRightIcon, GaugeIcon, SeatsIcon, SwatchIcon, VehicleTypeIcon } from "@/components/ui/Icons";
import { heroImage } from "@/features/vehicles/config/images.config";
import Image from "next/image";
import Link from "next/link";

const CALCULATOR_BENEFITS = [
  { icon: GaugeIcon, title: "Quick & Easy", body: "Get an estimate in minutes" },
  { icon: SwatchIcon, title: "Multiple Options", body: "Flexible terms and payments" },
  { icon: VehicleTypeIcon, title: "Real Vehicle Inventory", body: "See matching vehicles" },
  { icon: SeatsIcon, title: "Expert Support", body: "Talk to our finance team" },
];

/**
 * Compact page hero (§7) — the same dark image-banner-with-breadcrumb shell
 * as VrpHero, shortened further per the reference, plus the calculator's own
 * 4-point BenefitStrip row underneath (§54).
 */
export function CalculatorHero() {
  return (
    <section className="relative overflow-hidden bg-primary-black">
      <Image src={heroImage.url} alt={heroImage.alt} fill priority sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/75 to-primary-black/50" aria-hidden="true" />

      <div className="container-page relative flex flex-col gap-3 py-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="text-caption-s flex items-center gap-1.5 text-primary-white/70">
          <Link href="/" className="focus-ring rounded hover:text-primary-white">
            Home
          </Link>
          <ChevronRightIcon className="h-3 w-3 opacity-60" />
          <Link href="/services#leasing-financing" className="focus-ring rounded hover:text-primary-white">
            Financing
          </Link>
          <ChevronRightIcon className="h-3 w-3 opacity-60" />
          <span className="text-primary-white" aria-current="page">
            Payment Calculator
          </span>
        </nav>

        <div>
          <p className="text-label-m mb-1 text-primary-red">Finance Tools</p>
          <h1 className="text-display-l text-primary-white">Payment Calculator</h1>
          <p className="text-body-l mt-1 text-primary-white/80">Calculate Your New Or Used Vehicle Loan Payment</p>
          <p className="text-body-m mt-2 max-w-xl text-primary-white/65">
            Estimate your vehicle payment based on price, down payment, loan term, payment frequency, and APR.
          </p>
        </div>
      </div>

      <BenefitStrip tone="dark" items={CALCULATOR_BENEFITS} className="relative border-primary-white/10 bg-primary-black/40" />
    </section>
  );
}
