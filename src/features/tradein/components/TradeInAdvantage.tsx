import { CheckIcon, PhoneIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site.config";
import { PHOTO_IDS } from "@/features/vehicles/config/images.config";
import type { TradeInReplacementVehicle } from "@/features/tradein/types/tradein.types";
import Image from "next/image";
import Link from "next/link";

const ADVANTAGES = [
  "Competitive Trade-In Values",
  "Fast, Easy Process",
  "Use Towards Any Vehicle",
  "No Obligation",
  "Real People, Real Support",
];

/**
 * Persistent sidebar card (§24) — mirrors CalculatorSummary's structure
 * (heading, optional vehicle context row, bullet advantages, phone CTA)
 * shared by the desktop right column and the mobile in-flow card.
 */
export function TradeInAdvantage({ replacementVehicle }: { replacementVehicle?: TradeInReplacementVehicle | null }) {
  return (
    <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-6">
      <h2 className="text-heading-m">Your Trade-In Advantage</h2>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-control)] bg-soft-gray">
        <Image
          src={replacementVehicle?.imageUrl || PHOTO_IDS.pickupFront}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, 90vw"
          className="object-contain p-4"
        />
      </div>

      {replacementVehicle && (
        <div className="rounded-[var(--radius-control)] bg-soft-gray p-3">
          <p className="text-caption-s text-dark-neutral/60">Trading toward</p>
          <p className="text-label-m text-primary-black">{replacementVehicle.name}</p>
          <p className="text-caption-s flex flex-wrap gap-x-3 text-dark-neutral/60">
            {replacementVehicle.priceLabel}
            <Link href={`/vehicles/${replacementVehicle.slug}`} className="focus-ring rounded text-primary-red hover:underline">
              View Details →
            </Link>
            <Link href="/trade-in" className="focus-ring rounded text-dark-neutral/60 hover:underline">
              Change Vehicle
            </Link>
          </p>
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {ADVANTAGES.map((advantage) => (
          <li key={advantage} className="text-body-m flex items-start gap-2 text-primary-black">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-red" />
            {advantage}
          </li>
        ))}
      </ul>

      <a
        href={siteConfig.contact.phoneHref}
        className="focus-ring group flex flex-col items-center gap-0.5 rounded-[var(--radius-control)] border-2 border-primary-red px-4 py-3 text-center text-primary-red transition-colors duration-[var(--duration-micro)] hover:bg-primary-red hover:text-primary-white"
      >
        <span className="text-label-m flex items-center gap-2">
          <PhoneIcon className="h-4 w-4 group-hover:text-primary-white" />
          Speak With Our Appraisal Team
        </span>
        <span className="text-caption-s opacity-80">{siteConfig.contact.phone}</span>
      </a>
    </div>
  );
}
