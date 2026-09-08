import { Hero } from "@/components/sections/Hero";
import { QuickStartForm } from "@/components/sections/QuickStartForm";
import { VehicleCategories } from "@/components/sections/VehicleCategories";
import { FeaturedFleet } from "@/components/sections/FeaturedFleet";
import { Services } from "@/components/sections/Services";
import { IndustrySolutions } from "@/components/sections/IndustrySolutions";
import { TailoredRecommendations } from "@/components/sections/TailoredRecommendations";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Homepage — page-01-homepage.md. Section order matches §2/§28 exactly:
 * Hero → Quick Start lead form → Vehicle categories → Featured Fleet →
 * Services → Industry Solutions → Tailored Recommendations → Testimonials
 * → Final CTA (Header/Footer live in the (website) layout). Every section
 * keeps at least 40px of separation (each uses ≥64px vertical padding, or
 * is its own full-bleed color band) so adjacent sections never merge.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <QuickStartForm />
      <VehicleCategories />
      <FeaturedFleet />
      <Services />
      <IndustrySolutions />
      <TailoredRecommendations />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
