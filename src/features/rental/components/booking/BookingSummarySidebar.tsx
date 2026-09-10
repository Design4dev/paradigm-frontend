"use client";

import { AccordionItem } from "@/components/ui/Accordion";
import { BOOKING_LOCATIONS } from "@/features/rental/config/booking.config";
import { calculatePrice } from "@/features/rental/services/rentalPricing.service";
import { useRentalBookingStore } from "@/features/rental/store/rentalBooking.store";
import Image from "next/image";

function locationLabel(value: string): string {
  return BOOKING_LOCATIONS.find((loc) => loc.value === value)?.label ?? value;
}

/**
 * The running booking summary (spec §23) — "Rental Details / Location &
 * Date / Vehicle / Rate / Extras / Coverage / Taxes & Fees / Estimated
 * Total / Total Charge" hierarchy. Sticky on desktop; a collapsible
 * accordion on mobile (spec §38 — never the desktop sidebar repeated as a
 * giant block under every section). Serves as this flow's running review —
 * there's no separate "Review" step, since every number here is already
 * live off the same store the Review step would have re-displayed.
 *
 * Every dollar figure is deliberately absent — see `rentalPricing.service.ts`
 * for why totals aren't fabricated; Rate/Taxes/Total all read
 * "Confirmed by our rental team" instead of a number.
 *
 * Spacing is a 4/8px-based rhythm throughout (visual-refinement pass): each
 * content block owns its own `py-6` (24px) and a `border-t` marks the
 * transition to the next, so dividers always sit in an even 48px of
 * breathing room; label→content and image→text gaps step in 8px
 * increments (`mt-2`/`gap-4`). Rows use `items-start` + `min-w-0` on the
 * value cell (not `items-center`/implicit width) so a long value like
 * "Confirmed by our team" wraps cleanly against a fixed-width label at
 * narrow widths instead of cramping or overlapping it.
 */
function SummaryContent() {
  const state = useRentalBookingStore((s) => s);
  const price = calculatePrice();

  return (
    <div className="flex flex-col">
      <div className="pb-6">
        <p className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/45">Location &amp; Date</p>
        <p className="text-body-m mt-2 text-primary-black">
          {locationLabel(state.pickupLocation)}
          <br />
          {state.pickupDate || "—"} {state.pickupTime}
          {" → "}
          {state.returnDate || "—"} {state.returnTime}
        </p>
      </div>

      {state.selectedVehicle && (
        <div className="flex items-center gap-4 border-t border-border py-6">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[8px] bg-soft-gray">
            <Image src={state.selectedVehicle.image.url} alt={state.selectedVehicle.image.alt} fill sizes="96px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-body-l truncate font-semibold text-primary-black">{state.selectedVehicle.name}</p>
            <p className="text-caption-s mt-1 truncate text-dark-neutral/60">{state.selectedVehicle.descriptor}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-border py-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-caption-s shrink-0 font-semibold uppercase tracking-wide text-dark-neutral/45">Rate</p>
          <p className="min-w-0 text-right text-label-m text-primary-black">Confirmed by our team</p>
        </div>
        <div className="flex items-start justify-between gap-3">
          <p className="text-body-m shrink-0 text-dark-neutral/60">Add-ons</p>
          <p className="min-w-0 text-right text-body-m text-primary-black">{state.selectedAddonIds.length > 0 ? state.selectedAddonIds.length : "None"}</p>
        </div>
        <div className="flex items-start justify-between gap-3">
          <p className="text-body-m shrink-0 text-dark-neutral/60">Coverage</p>
          <p className="min-w-0 text-right text-body-m text-primary-black">{state.selectedCoverageId ? "Selected" : "None"}</p>
        </div>
        <div className="flex items-start justify-between gap-3">
          <p className="text-body-m shrink-0 text-dark-neutral/60">Taxes &amp; Fees</p>
          <p className="min-w-0 text-right text-body-m text-primary-black">Confirmed by our team</p>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-label-m shrink-0 text-dark-neutral/70">Estimated Total</p>
          <p className="min-w-0 text-right text-label-m text-primary-black">{price.status === "calculated" ? `${price.currency} ${price.total.toFixed(2)}` : "Confirmed by our team"}</p>
        </div>
        {/* A second divider ahead of Total Charge, not just a row gap — the
            extra separation is what makes this read as the final summary
            line rather than another detail row. */}
        <div className="mt-4 flex items-start justify-between gap-3 border-t border-border pt-4">
          <p className="text-heading-m shrink-0 text-primary-black">Total Charge</p>
          <p className="min-w-0 text-right text-heading-m text-primary-red">Confirmed by our team</p>
        </div>
      </div>
    </div>
  );
}

export function BookingSummarySidebar() {
  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-[var(--radius-card)] border border-border bg-surface p-6">
          <h2 className="text-heading-m mb-6 text-primary-black">Rental Details</h2>
          <SummaryContent />
        </div>
      </aside>

      <div className="lg:hidden">
        <AccordionItem title={<span className="text-label-m text-primary-black">Rental Details</span>} className="rounded-[var(--radius-card)] border border-border bg-surface px-5">
          <div className="pb-6">
            <SummaryContent />
          </div>
        </AccordionItem>
      </div>
    </>
  );
}
