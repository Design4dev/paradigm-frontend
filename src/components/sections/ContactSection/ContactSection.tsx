import { Button } from "@/components/ui/Button";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";

/** Compact "get in touch" band reused on About/Services — the full form lives on /contact. */
export function ContactSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[var(--radius-card)] border border-border bg-surface p-8 sm:p-10 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-heading-l mb-2">Talk to our fleet team</h2>
          <p className="text-body-m max-w-md text-dark-neutral/65">
            Questions about pricing, availability or upfitting lead time? Reach us directly, or send a message and
            we&apos;ll follow up within one business day.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-dark-neutral/70 sm:flex-row sm:items-center sm:gap-6">
            <a href={siteConfig.contact.phoneHref} className="focus-ring text-body-m flex items-center gap-2 rounded hover:text-primary-red">
              <PhoneIcon className="h-4 w-4 text-primary-red" />
              {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="focus-ring text-body-m flex items-center gap-2 rounded hover:text-primary-red">
              <MailIcon className="h-4 w-4 text-primary-red" />
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
        <Link href="/contact" className="shrink-0">
          <Button variant="primary" size="lg">
            Contact Us
          </Button>
        </Link>
      </Reveal>
    </section>
  );
}
