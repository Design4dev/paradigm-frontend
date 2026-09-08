import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Providers } from "@/components/common/Providers";
import { SEO } from "@/components/common/SEO";

/** Marketing-site shell: Header/Footer chrome + the Quote/Search overlays. Kept out of `/admin`. */
export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SEO />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </Providers>
  );
}
