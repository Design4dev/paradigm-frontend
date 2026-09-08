"use client";

import { ChatIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site.config";
import { useQuote } from "@/features/leads/components/QuoteProvider";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";

/**
 * Supporting contact actions (page-03-vdp.md §8). Call/Email are real
 * tel:/mailto: links. There's no live-chat backend in this prototype, so
 * "Chat with Us" opens the same real lead form as Get a Quote rather than a
 * fake widget — the closest genuinely functional action available (same
 * honesty convention as the Homepage's Salesforce mock-mode).
 */
export function VehicleContactActions({ vehicle }: { vehicle: Vehicle }) {
  const { openQuote } = useQuote();

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <a
        href={siteConfig.contact.salesPhoneHref}
        className="focus-ring flex flex-col items-center gap-1.5 rounded-[var(--radius-card)] border border-border bg-surface px-2 py-3 text-center transition-colors hover:border-primary-red"
      >
        <PhoneIcon className="h-5 w-5" />
        <span className="text-caption-s text-primary-black">Call Sales</span>
        <span className="text-caption-s text-dark-neutral/50">{siteConfig.contact.salesPhone}</span>
      </a>
      <a
        href={`mailto:${siteConfig.contact.email}`}
        className="focus-ring flex flex-col items-center gap-1.5 rounded-[var(--radius-card)] border border-border bg-surface px-2 py-3 text-center transition-colors hover:border-primary-red"
      >
        <MailIcon className="h-5 w-5" />
        <span className="text-caption-s text-primary-black">Email Us</span>
        <span className="text-caption-s truncate text-dark-neutral/50">{siteConfig.contact.email}</span>
      </a>
      <button
        type="button"
        onClick={(event) =>
          openQuote(
            { slug: vehicle.slug, name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`, stockNumber: vehicle.stockNumber, priceLabel: vehicle.priceLabel },
            event.currentTarget
          )
        }
        className="focus-ring flex flex-col items-center gap-1.5 rounded-[var(--radius-card)] border border-border bg-surface px-2 py-3 text-center transition-colors hover:border-primary-red"
      >
        <ChatIcon className="h-5 w-5" />
        <span className="text-caption-s text-primary-black">Chat with Us</span>
        <span className="text-caption-s text-dark-neutral/50">Live Support</span>
      </button>
    </div>
  );
}
