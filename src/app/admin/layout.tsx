import { Navbar } from "@/components/common/Navbar";
import { adminNav } from "@/config/navigation.config";
import Link from "next/link";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

/**
 * Minimal admin shell — deliberately separate from the marketing site's
 * Header/Footer/Quote+Search overlays. Access is gated by `middleware.ts`
 * with a shared-secret cookie, not real authentication; this is a
 * prototype-grade internal tool, not a production admin panel.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-soft-gray">
      <header className="border-b border-border bg-primary-black text-primary-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-6">
            <span className="text-heading-m">Paradigm Fleet Admin</span>
            <nav aria-label="Admin">
              <Navbar items={adminNav} className="gap-0" itemClassName="!text-primary-white hover:!text-primary-red" />
            </nav>
          </div>
          <Link href="/" className="focus-ring text-label-m rounded text-primary-white/70 hover:text-primary-white">
            ← View Site
          </Link>
        </div>
      </header>

      <div className="bg-primary-red/10 py-2 text-center">
        <p className="text-caption-s text-primary-black">
          Prototype admin — protected only by a shared-secret cookie, not real authentication. Do not ship as-is.
        </p>
      </div>

      <main id="main-content" className="container-page flex-1 py-10">
        {children}
      </main>
    </div>
  );
}
