import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} collects, uses and protects your information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <section className="container-page max-w-3xl py-16 sm:py-24">
      <Reveal>
        <p className="text-label-m mb-4 text-primary-red">Legal</p>
        <h1 className="text-display-l mb-6">Privacy Policy</h1>
        <div className="text-body-m flex flex-col gap-5 text-dark-neutral/75">
          <p>
            {siteConfig.legalName} collects the information you provide through our Quick Quote, Quick Start and
            contact forms — name, email, phone number and vehicle interest — solely to follow up about the fleet
            sales, rental, leasing or upfitting request you submitted.
          </p>
          <p>
            We do not sell your personal information. It is shared only with the team members and systems (such as
            our CRM) needed to respond to your enquiry, and is retained only as long as necessary for that purpose.
          </p>
          <p>
            You can ask us to access, correct or delete the information we hold about you at any time by contacting{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="focus-ring rounded text-primary-red hover:underline">
              {siteConfig.contact.email}
            </a>{" "}
            or calling{" "}
            <a href={siteConfig.contact.phoneHref} className="focus-ring rounded text-primary-red hover:underline">
              {siteConfig.contact.phone}
            </a>
            .
          </p>
          <p className="text-caption-s text-dark-neutral/50">
            This is a placeholder policy for this prototype build — final legal wording should be reviewed by
            {" "}{siteConfig.legalName}&apos;s counsel before this site goes live.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
