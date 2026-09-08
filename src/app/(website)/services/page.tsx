import { ContactSection } from "@/components/sections/ContactSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Reveal } from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Fleet sales, rentals, leasing and upfitting services from Paradigm Fleet.",
};

const DETAILS = [
  {
    id: "sales",
    title: "Sales",
    body: "New and pre-inspected vehicles across cargo vans, passenger vans, pickups, box trucks, SUVs and sedans — sourced and prepped for immediate business use.",
  },
  {
    id: "rentals",
    title: "Rentals",
    body: "Short-term rentals for seasonal spikes, delivered ready to work with transparent, predictable terms.",
  },
  {
    id: "leasing-financing",
    title: "Leasing & Financing",
    body: "Multi-year leases and financing programs for steady-state fleets, structured around how your business actually runs.",
  },
  {
    id: "upfitting",
    title: "Upfitting",
    body: "Shelving, racking, ladder racks, wraps and equipment installs handled in-house before delivery, so vehicles arrive ready to work.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="container-page py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-label-m mb-4 text-primary-red">Services</p>
          <h1 className="text-display-l">Everything your fleet needs, from one partner.</h1>
        </Reveal>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <Reveal>
          <ServicesGrid />
        </Reveal>
      </section>

      <section className="container-page flex flex-col gap-10 pb-16 sm:pb-20">
        {DETAILS.map((detail) => (
          <Reveal
            key={detail.title}
            id={`${detail.id}-detail`}
            className="scroll-mt-24 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-[220px_1fr]"
          >
            <h2 className="text-heading-m">{detail.title}</h2>
            <p className="text-body-m max-w-2xl text-dark-neutral/65">{detail.body}</p>
          </Reveal>
        ))}
      </section>

      <ContactSection />
    </>
  );
}
