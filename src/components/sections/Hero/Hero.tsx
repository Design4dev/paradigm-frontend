import { BenefitStrip } from "@/components/sections/BenefitStrip";
import { FleetSearch } from "@/features/search/components/FleetSearch";
import { heroImage } from "@/features/vehicles/config/images.config";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-black">
      <Image
        src={heroImage.url}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/70 to-primary-black/30" aria-hidden="true" />

      <div className="container-page relative flex flex-col gap-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-4xl">
          <p className="text-label-m mb-4 uppercase tracking-wide text-primary-white/80">
            {siteConfig.location} <span aria-hidden="true">|</span> Commercial Fleet Specialists
          </p>
          <h1 className="text-display-l text-balance text-primary-white">
            Commercial Vehicles.
            <br />
            Built Around <span className="text-primary-red">Your Business.</span>
          </h1>
          <p className="text-body-l mt-5 max-w-xl text-primary-white/80">
            Sales, rentals, leasing and upfitting for businesses across Southern Ontario.
          </p>
        </div>

        <FleetSearch />
      </div>

      <BenefitStrip tone="dark" className="relative" />
    </section>
  );
}
