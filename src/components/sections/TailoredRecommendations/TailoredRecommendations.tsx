import { QuickQuote } from "@/features/leads/components/QuickQuote";
import { categoryImage, PHOTO_IDS } from "@/features/vehicles/config/images.config";
import Image from "next/image";

/**
 * Tailored Recommendations — page-01-homepage.md §15. A static teaser for
 * now; "Get My Recommendation" opens the same lead-capture flow as the rest
 * of the site (Quick Quote) so the CTA is never a dead end. The step list
 * below is presentational scaffolding a later branching assessment flow can
 * replace without touching this section's layout. The dark-photo-plus-overlay
 * treatment reuses the same pattern as the Hero for visual consistency.
 */
const STEPS = [
  { number: 1, title: "Industry", body: "Tell us your industry" },
  { number: 2, title: "Vehicle Need", body: "What do you need it for?" },
  { number: 3, title: "Upfit", body: "Any custom requirements?" },
  { number: 4, title: "Timeline", body: "When do you need it?" },
];

export function TailoredRecommendations() {
  return (
    <section aria-labelledby="recommendations-heading" className="relative overflow-hidden bg-dark-neutral py-16 text-primary-white sm:py-20">
      <Image
        src={categoryImage(PHOTO_IDS.categoryTrucks, 1600)}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-neutral via-dark-neutral/95 to-dark-neutral/70" aria-hidden="true" />

      <div className="container-page relative">
        <div className="mb-10">
          <p className="text-label-m mb-3 text-primary-red">Tailored Recommendations</p>
          <h2 id="recommendations-heading" className="text-heading-l mb-3">
            Find the Right Vehicle Faster
          </h2>
          <p className="text-body-m max-w-lg text-primary-white/65">
            Take our quick 4-step assessment and get a tailored vehicle recommendation for your business.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="relative grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
            <div className="absolute top-[18px] left-[12.5%] right-[12.5%] hidden h-px bg-primary-white/15 sm:block" aria-hidden="true" />
            {STEPS.map((step) => (
              <div key={step.number} className="relative flex flex-col items-start gap-2 sm:items-center sm:text-center">
                <span className="text-label-m relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary-red text-primary-white">
                  {step.number}
                </span>
                <span className="text-label-m block text-primary-white">{step.title}</span>
                <span className="text-caption-s block text-primary-white/60">{step.body}</span>
              </div>
            ))}
          </div>

          <div className="relative shrink-0 self-start pt-6 lg:self-center lg:pt-0">
            <p className="text-caption-s absolute -top-6 right-0 flex items-center gap-1 whitespace-nowrap italic text-primary-white/50">
              Just 1 minute to get started!
              <span aria-hidden="true">↘</span>
            </p>
            <QuickQuote size="lg">Get My Recommendation →</QuickQuote>
          </div>
        </div>
      </div>
    </section>
  );
}
