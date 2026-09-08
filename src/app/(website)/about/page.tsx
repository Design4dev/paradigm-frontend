import { ContactSection } from "@/components/sections/ContactSection";
import { TrustStats } from "@/components/sections/TrustStats";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.legalName} — fleet sales, rentals, leasing and upfitting across ${siteConfig.contact.hubs.length} regional hubs.`,
};

export default function AboutPage() {
  return (
    <>
      <section id="history" className="container-page scroll-mt-24 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-label-m mb-4 text-primary-red">About Us</p>
          <h1 className="text-display-l mb-6">Built to keep your fleet moving, not just fill it.</h1>
          <p className="text-body-l text-dark-neutral/70">
            {siteConfig.legalName} sells, rents, leases and upfits work-ready vehicles for businesses that depend on
            their fleet every day. We work across sales, financing, upfitting and ongoing fleet support so a customer
            never has to coordinate five different vendors to get one vehicle on the road.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <Reveal>
          <TrustStats />
        </Reveal>
      </section>

      <section className="container-page grid grid-cols-1 gap-8 pb-16 sm:grid-cols-3 sm:pb-20">
        {[
          {
            title: "One partner, every stage",
            body: "Sales, rentals, leasing and upfitting under one team, so handoffs between vendors don't slow your fleet down.",
          },
          {
            title: "Regional hubs",
            body: `Vehicles staged and upfit locally across ${siteConfig.contact.hubs.join(", ")}.`,
          },
          {
            title: "Built for operations",
            body: "We price and stock for how fleets are actually run day to day, not for a showroom floor.",
          },
        ].map((item) => (
          <Reveal key={item.title}>
            <h2 className="text-heading-m mb-2">{item.title}</h2>
            <p className="text-body-m text-dark-neutral/65">{item.body}</p>
          </Reveal>
        ))}
      </section>

      <ContactSection />
    </>
  );
}
