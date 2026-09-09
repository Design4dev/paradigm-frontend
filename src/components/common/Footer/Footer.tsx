"use client";

import { AccordionItem } from "@/components/ui/Accordion";
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/Icons";
import { useTooltip } from "@/components/ui/Tooltip";
import { footerCompanyNav, footerInventoryNav, footerServiceNav } from "@/config/navigation.config";
import { siteConfig } from "@/config/site.config";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: LinkedinIcon, href: siteConfig.social.linkedin },
  { label: "Instagram", icon: InstagramIcon, href: siteConfig.social.instagram },
  { label: "Facebook", icon: FacebookIcon, href: siteConfig.social.facebook },
];

/** Footer social icon — tooltip opens upward (the row sits at the very bottom of the page). */
function FooterSocialLink({ label, href, icon: Icon }: { label: string; href: string; icon: ComponentType<{ className?: string }> }) {
  const { triggerProps, tooltip } = useTooltip(label, "top");
  return (
    <>
      <a
        {...triggerProps}
        href={href}
        aria-label={label}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full bg-primary-white/10 text-primary-white/70 transition-colors duration-[var(--duration-micro)] hover:bg-primary-white/15 hover:text-primary-white"
      >
        <Icon className="h-4 w-4" />
      </a>
      {tooltip}
    </>
  );
}

const ContactList = () => (
  <ul className="text-body-m flex flex-col gap-3 text-primary-white/70">
    <li className="flex items-center gap-2">
      <PhoneIcon className="h-4 w-4 shrink-0 text-primary-red" />
      <a href={siteConfig.contact.phoneHref} className="focus-ring rounded hover:text-primary-white">
        {siteConfig.contact.phone}
      </a>
    </li>
    <li className="flex items-center gap-2">
      <MailIcon className="h-4 w-4 shrink-0 text-primary-red" />
      <a href={`mailto:${siteConfig.contact.email}`} className="focus-ring rounded hover:text-primary-white">
        {siteConfig.contact.email}
      </a>
    </li>
    <li className="flex items-start gap-2">
      <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-red" />
      <span>{siteConfig.contact.address}</span>
    </li>
    <li className="pt-1">
      <ul className="text-caption-s flex flex-col gap-0.5 text-primary-white/60">
        {siteConfig.contact.hours.map((row) => (
          <li key={row.days} className="flex justify-between gap-3">
            <span>{row.days}</span>
            <span>{row.time}</span>
          </li>
        ))}
      </ul>
    </li>
  </ul>
);

/** Complete footer — page-01-homepage.md §18: Brand/Inventory/Services/Company/Contact. */
export function Footer() {
  return (
    <footer className="bg-dark-neutral text-primary-white">
      <div className="container-page py-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 lg:mb-0">
          <span className="relative block h-9 w-[180px]">
            <Image src="/images/logos/logo-white.png" alt={siteConfig.legalName} fill className="object-contain object-left" />
          </span>
          <p className="text-body-m max-w-sm text-primary-white/70">
            Sales, rentals, leasing/financing and custom upfitting for commercial vehicles across Hamilton and
            Southern Ontario.
          </p>
        </div>

        {/* Desktop: full static grid (page-01-homepage.md reference — unchanged). */}
        <div className="hidden grid-cols-2 gap-x-8 gap-y-10 pt-10 sm:grid-cols-2 lg:grid lg:grid-cols-4 lg:pt-14">
          <FooterColumn title="Inventory" links={footerInventoryNav} />
          <FooterColumn title="Services" links={footerServiceNav} />
          <FooterColumn title="Company" links={footerCompanyNav} />
          <div>
            <h3 className="text-label-m mb-4 text-primary-white/50 uppercase tracking-wide">Contact</h3>
            <ContactList />
          </div>
        </div>

        {/* Tablet/mobile: collapsible rows (page-03-vdp.md reference — Inventory/Services/Company/Contact as chevron rows). */}
        <div className="flex flex-col divide-y divide-primary-white/10 border-t border-primary-white/10 lg:hidden">
          <AccordionItem
            title="Inventory"
            titleClassName="text-primary-white/90"
            className="[&_svg]:invert"
          >
            <FooterLinkList links={footerInventoryNav} />
          </AccordionItem>
          <AccordionItem title="Services" titleClassName="text-primary-white/90" className="[&_svg]:invert">
            <FooterLinkList links={footerServiceNav} />
          </AccordionItem>
          <AccordionItem title="Company" titleClassName="text-primary-white/90" className="[&_svg]:invert">
            <FooterLinkList links={footerCompanyNav} />
          </AccordionItem>
          <AccordionItem title="Contact" titleClassName="text-primary-white/90" className="[&_svg]:invert" contentClassName="pb-5">
            <ContactList />
          </AccordionItem>
        </div>
      </div>

      <div className="border-t border-primary-white/10">
        <div className="container-page flex flex-col-reverse items-center gap-5 py-6 sm:flex-row sm:justify-between">
          <p className="text-caption-s text-primary-white/50">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <ul className="flex items-center gap-4">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="focus-ring text-caption-s rounded text-primary-white/70 hover:text-primary-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-2" aria-label="Social links">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <FooterSocialLink label={social.label} href={social.href} icon={social.icon} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-label-m mb-4 text-primary-white/50 uppercase tracking-wide">{title}</h3>
      <FooterLinkList links={links} />
    </nav>
  );
}

function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-3 pb-5">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="focus-ring text-body-m rounded text-primary-white/80 hover:text-primary-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
