import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${siteConfig.name} website.`,
};

export default function TermsOfServicePage() {
  return (
    <section className="container-page max-w-3xl py-16 sm:py-24">
      <Reveal>
        <p className="text-label-m mb-4 text-primary-red">Legal</p>
        <h1 className="text-display-l mb-6">Terms of Service</h1>
        <div className="text-body-m flex flex-col gap-5 text-dark-neutral/75">
          <p>
            This website is provided by {siteConfig.legalName} to share information about our commercial vehicle
            sales, rentals, leasing/financing and upfitting services, and to let visitors request quotes and get in
            touch with our team.
          </p>
          <p>
            Vehicle pricing, availability and specifications shown on this site are indicative and subject to change
            without notice; they do not constitute a binding offer of sale. Submitting a form on this site does not
            create a contractual obligation on either party until confirmed directly with our fleet team.
          </p>
          <p>
            All content, branding and imagery on this site remain the property of {siteConfig.legalName} and may not
            be reproduced without permission.
          </p>
          <p className="text-caption-s text-dark-neutral/50">
            This is a placeholder terms page for this prototype build — final legal wording should be reviewed by
            {" "}{siteConfig.legalName}&apos;s counsel before this site goes live.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
