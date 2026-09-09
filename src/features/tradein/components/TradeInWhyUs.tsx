import { PHOTO_IDS } from "@/features/vehicles/config/images.config";
import Image from "next/image";

/**
 * "Why Trade In With Paradigm Fleet?" supporting cards (§25) — same
 * image-on-top/text-below card shape as the Homepage's VehicleCategories,
 * using the closest available local assets (no dedicated lifestyle
 * photography exists yet — swap these in once real photos are available).
 * Supporting benefits, not guarantees.
 */
const WHY_TRADE_IN = [
  { title: "Trusted Valuations", body: "Fair, market-based reviews.", image: PHOTO_IDS.pickupFront },
  { title: "Wide Selection", body: "Apply toward any vehicle in stock.", image: PHOTO_IDS.categoryVans },
  { title: "Simple Process", body: "Save time at the dealership.", image: PHOTO_IDS.categoryServiceTrucks },
  { title: "Local Support", body: "We're here when you need us.", image: PHOTO_IDS.servicesYard },
];

export function TradeInWhyUs() {
  return (
    <div className="container-page py-8 sm:py-10">
      <h2 className="text-heading-l mb-5">Why Trade In With Paradigm Fleet?</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {WHY_TRADE_IN.map((item) => (
          <div key={item.title} className="flex flex-col gap-2.5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-soft-gray">
              <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 220px, 45vw" className="object-contain p-3" />
            </div>
            <div>
              <p className="text-label-m text-primary-black">{item.title}</p>
              <p className="text-caption-s text-dark-neutral/60">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
