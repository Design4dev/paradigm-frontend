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
 */
function SummaryContent() {
  const state = useRentalBookingStore((s) => s);
  const price = calculatePrice();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/50">Location &amp; Date</p>
        <p className="text-body-m mt-1 text-primary-black">
          {locationLabel(state.pickupLocation)}
          <br />
          {state.pickupDate || "—"} {state.pickupTime}
          {" → "}
          {state.returnDate || "—"} {state.returnTime}
        </p>
      </div>

      {state.selectedVehicle && (
        <div className="flex items-center gap-3 border-t border-border pt-4">
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[6px] bg-soft-gray">
            <Image src={state.selectedVehicle.image.url} alt={state.selectedVehicle.image.alt} fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-label-m truncate text-primary-black">{state.selectedVehicle.name}</p>
            <p className="text-caption-s truncate text-dark-neutral/60">{state.selectedVehicle.descriptor}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <p className="text-caption-s font-semibold uppercase tracking-wide text-dark-neutral/50">Rate</p>
          <p className="text-label-m text-primary-black">Confirmed by our team</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-body-m text-dark-neutral/70">Add-ons</p>
          <p className="text-body-m text-primary-black">{state.selectedAddonIds.length > 0 ? state.selectedAddonIds.length : "None"}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-body-m text-dark-neutral/70">Coverage</p>
          <p className="text-body-m text-primary-black">{state.selectedCoverageId ? "Selected" : "None"}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-body-m text-dark-neutral/70">Taxes &amp; Fees</p>
          <p className="text-body-m text-primary-black">Confirmed by our team</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <p className="text-label-m text-primary-black">Estimated Total</p>
          <p className="text-label-m text-primary-black">{price.status === "calculated" ? `${price.currency} ${price.total.toFixed(2)}` : "Confirmed by our team"}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-heading-m text-primary-black">Total Charge</p>
          <p className="text-heading-m text-primary-red">Confirmed by our team</p>
        </div>
      </div>
    </div>
  );
}

export function BookingSummarySidebar() {
  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-[var(--radius-card)] border border-border bg-surface p-5">
          <h2 className="text-heading-m mb-4 text-primary-black">Rental Details</h2>
          <SummaryContent />
        </div>
      </aside>

      <div className="lg:hidden">
        <AccordionItem title={<span className="text-label-m text-primary-black">Rental Details</span>} className="rounded-[var(--radius-card)] border border-border bg-surface px-4">
          <div className="pb-4">
            <SummaryContent />
          </div>
        </AccordionItem>
      </div>
    </>
  );
}
