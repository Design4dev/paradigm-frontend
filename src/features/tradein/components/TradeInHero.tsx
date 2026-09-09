import { BenefitStrip } from "@/components/sections/BenefitStrip";
import { ChevronRightIcon, GaugeIcon, ShieldIcon, SwatchIcon, VehicleTypeIcon } from "@/components/ui/Icons";
import { heroImage } from "@/features/vehicles/config/images.config";
import Image from "next/image";
import Link from "next/link";

const TRADE_IN_BENEFITS = [
  { icon: GaugeIcon, title: "Quick & Easy", body: "Get an estimate in minutes" },
  { icon: ShieldIcon, title: "No Obligation", body: "Free and confidential" },
  { icon: SwatchIcon, title: "Use It Towards Any Vehicle", body: "Buy, lease or finance" },
  { icon: VehicleTypeIcon, title: "Expert Support", body: "Our team is here to help" },
];

/**
 * Compact page hero (§7) — same dark image-banner-with-breadcrumb shell as
 * CalculatorHero/VrpHero, plus the page's own 4-point BenefitStrip row
 * underneath, matching the approved reference exactly.
 */
export function TradeInHero() {
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
          <span className="text-primary-white" aria-current="page">
            Trade-In Appraisal
          </span>
        </nav>

        <div>
          <p className="text-label-m mb-1 text-primary-red">Trade-In Appraisal</p>
          <h1 className="text-display-l text-primary-white">Trade-In Appraisal</h1>
          <p className="text-body-l mt-1 text-primary-white/80">Get an estimated value for your current vehicle.</p>
          <p className="text-body-m mt-2 max-w-xl text-primary-white/65">
            It&apos;s quick, easy and free. Use your trade-in value towards your next commercial vehicle and keep your
            business moving.
          </p>
        </div>
      </div>

      <BenefitStrip tone="dark" items={TRADE_IN_BENEFITS} className="relative border-primary-white/10 bg-primary-black/40" />
    </section>
  );
}
