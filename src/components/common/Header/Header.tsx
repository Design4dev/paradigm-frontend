"use client";

import { MobileMenu } from "@/components/common/MobileMenu";
import { Navbar } from "@/components/common/Navbar";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { FacebookIcon, InstagramIcon, LinkedinIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { useTooltip } from "@/components/ui/Tooltip";
import { primaryNav } from "@/config/navigation.config";
import { siteConfig } from "@/config/site.config";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: LinkedinIcon, href: siteConfig.social.linkedin },
  { label: "Instagram", icon: InstagramIcon, href: siteConfig.social.instagram },
  { label: "Facebook", icon: FacebookIcon, href: siteConfig.social.facebook },
];

/** Utility-bar social icon — a tiny circle, tooltip opening downward (the bar sits at the very top of the viewport). */
function UtilityBarSocialLink({ label, href, icon: Icon }: { label: string; href: string; icon: ComponentType<{ className?: string }> }) {
  const { triggerProps, tooltip } = useTooltip(label, "bottom");
  return (
    <>
      <a
        {...triggerProps}
        href={href}
        aria-label={label}
        className="focus-ring flex h-6 w-6 items-center justify-center rounded-full bg-primary-white/20 transition-colors duration-[var(--duration-micro)] hover:bg-primary-white/30"
      >
        <Icon className="h-3.5 w-3.5" />
      </a>
      {tooltip}
    </>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openQuote } = useQuote();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close the mobile drawer if the viewport grows past the desktop nav
  // breakpoint while it's open (e.g. rotating a tablet, resizing a window).
  const isDesktop = useMediaQuery(MEDIA_QUERIES.lgUp);
  const [trackedIsDesktop, setTrackedIsDesktop] = useState(isDesktop);
  if (isDesktop !== trackedIsDesktop) {
    setTrackedIsDesktop(isDesktop);
    if (isDesktop) setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-[var(--z-header)] w-full">
      {/* Utility bar — collapses away on scroll so the sticky header stays compact (page-01-homepage.md §4). */}
      <div
        className={cn(
          "overflow-hidden bg-primary-red text-primary-white transition-[max-height,opacity] duration-[var(--duration-micro)] ease-[var(--ease-out-standard)]",
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        )}
      >
        <div className="container-page flex items-center justify-between gap-4 py-2">
          <p className="text-caption-s hidden truncate font-semibold tracking-wide sm:block">{siteConfig.tagline}</p>
          <div className="text-caption-s flex items-center gap-4 font-semibold">
            <span className="whitespace-nowrap">{siteConfig.location}</span>
            <ul className="flex items-center gap-1.5" aria-label="Social links">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <UtilityBarSocialLink label={social.label} href={social.href} icon={social.icon} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <div
        className={cn(
          "w-full border-b bg-primary-white/95 backdrop-blur transition-[padding,box-shadow,border-color] duration-[var(--duration-micro)] ease-[var(--ease-out-standard)]",
          scrolled ? "border-border shadow-sm" : "border-transparent"
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between gap-4 transition-[padding] duration-[var(--duration-micro)]",
            scrolled ? "py-3" : "py-4"
          )}
        >
          <Link href="/" className="focus-ring flex shrink-0 items-center rounded-[var(--radius-control)]" aria-label={`${siteConfig.legalName} — home`}>
            <span className="relative block h-9 w-[172px] sm:h-10 sm:w-[192px]">
              <Image src="/images/logos/logo.png" alt={siteConfig.legalName} fill priority className="object-contain object-left" />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <Navbar items={primaryNav} />
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={siteConfig.contact.phoneHref}
              className="focus-ring text-label-m hidden items-center gap-2 rounded-[var(--radius-control)] px-2 py-2 text-primary-black transition-colors hover:text-primary-red md:inline-flex"
            >
              <PhoneIcon className="h-4 w-4 text-primary-red" />
              {siteConfig.contact.phone}
            </a>

            <Button
              variant="primary"
              size="md"
              className="hidden sm:inline-flex"
              onClick={(event) => openQuote(undefined, event.currentTarget)}
            >
              {/* Responsive CTA copy (item #4) — shorter on narrower desktop/tablet widths, full phrase once there's room. */}
              <span className="hidden lg:inline">Get a Quick Quote</span>
              <span className="lg:hidden">Quick Quote</span>
            </Button>

            <IconButton
              ref={menuButtonRef}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              tooltipSide="bottom"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={primaryNav}
        returnFocusRef={menuButtonRef}
      />
    </header>
  );
}
