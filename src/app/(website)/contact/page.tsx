import { ContactForm } from "@/features/contact/components/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.legalName} — fleet sales, rentals, leasing and upfitting.`,
};

export default function ContactPage() {
  return (
    <section className="container-page grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <Reveal>
        <p className="text-label-m mb-4 text-primary-red">Contact</p>
        <h1 className="text-display-l mb-4">Let&apos;s talk about your fleet.</h1>
        <p className="text-body-l mb-8 text-dark-neutral/70">
          Whether you need one vehicle or fifty, our team will follow up within one business day with availability,
          pricing and next steps.
        </p>
        <ul className="flex flex-col gap-4 text-dark-neutral/70">
          <li className="flex items-center gap-3">
            <PhoneIcon className="h-5 w-5 text-primary-red" />
            <a href={siteConfig.contact.phoneHref} className="focus-ring text-body-m rounded hover:text-primary-red">
              {siteConfig.contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MailIcon className="h-5 w-5 text-primary-red" />
            <a href={`mailto:${siteConfig.contact.email}`} className="focus-ring text-body-m rounded hover:text-primary-red">
              {siteConfig.contact.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-red" />
            <span className="text-body-m">Hubs in {siteConfig.contact.hubs.join(", ")}</span>
          </li>
        </ul>
      </Reveal>

      <Reveal>
        <ContactForm />
      </Reveal>
    </section>
  );
}
