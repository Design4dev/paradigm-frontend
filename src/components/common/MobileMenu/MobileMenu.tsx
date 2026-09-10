"use client";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { CloseIcon, PhoneIcon } from "@/components/ui/Icons";
import { Dialog } from "@/components/ui/Modal";
import type { NavItem } from "@/config/navigation.config";
import { siteConfig } from "@/config/site.config";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  returnFocusRef: React.RefObject<HTMLElement | null>;
}

export function MobileMenu({ isOpen, onClose, navItems, returnFocusRef }: MobileMenuProps) {
  const pathname = usePathname();
  const { openQuote } = useQuote();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="mobile-menu-title"
      variant="sheet-right"
      returnFocusRef={returnFocusRef}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="mobile-menu-title" className="text-heading-m">
            Menu
          </h2>
          <IconButton aria-label="Close menu" onClick={onClose}>
            <CloseIcon className="h-6 w-6" />
          </IconButton>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : !item.href.startsWith("/#") && (pathname === item.href || pathname.startsWith(`${item.href}/`));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    {...(item.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "focus-ring text-heading-m block rounded-[var(--radius-control)] px-3 py-3 text-primary-black hover:bg-soft-gray",
                      isActive && "text-primary-red"
                    )}
                  >
                    {item.label}
                    {item.newTab && <span className="sr-only"> (opens in a new tab)</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t border-border px-5 py-5">
          <a
            href={siteConfig.contact.phoneHref}
            onClick={onClose}
            className="focus-ring text-label-m flex items-center justify-center gap-2 rounded-[var(--radius-control)] border border-border py-3 text-primary-black hover:border-primary-red hover:text-primary-red"
          >
            <PhoneIcon className="h-4 w-4 text-primary-red" />
            {siteConfig.contact.phone}
          </a>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={(event) => {
              onClose();
              openQuote(undefined, event.currentTarget);
            }}
          >
            Get a Quick Quote
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
