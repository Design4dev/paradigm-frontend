import { Button } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { CTA } from "@/components/sections/CTA";
import { QuickQuote } from "@/features/leads/components/QuickQuote";
import { siteConfig } from "@/config/site.config";

export function FinalCTA() {
  return (
    <CTA
      id="final-cta"
      tone="red"
      heading="Ready to put the right vehicle to work?"
      body="Get a quick quote or speak with our team today."
      action={
        <div className="flex flex-col gap-3 sm:flex-row">
          <QuickQuote size="lg" className="!bg-primary-white !text-primary-red hover:!bg-soft-gray">
            Get a Quick Quote →
          </QuickQuote>
          <a href={siteConfig.contact.salesPhoneHref}>
            <Button
              variant="secondary"
              size="lg"
              className="group w-full !border-primary-white !text-primary-white hover:!bg-primary-white hover:!text-primary-red"
            >
              <PhoneIcon tone="white" className="h-4 w-4 group-hover:hidden" />
              <PhoneIcon tone="red" className="hidden h-4 w-4 group-hover:block" />
              Call {siteConfig.contact.salesPhone}
            </Button>
          </a>
        </div>
      }
    />
  );
}
