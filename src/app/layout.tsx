import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

// `siteConfig.url` should always be a valid absolute URL, but a build must
// never fail over a misconfigured env var (e.g. a bare domain with no
// protocol) — fall back to localhost rather than let `new URL()` throw.
function safeMetadataBase(url: string): URL {
  try {
    return new URL(url);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  metadataBase: safeMetadataBase(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

/**
 * Root layout: only the `<html>`/`<body>` shell, fonts and the skip link.
 * The marketing chrome (Header/Footer/Quote+Search overlays) lives in
 * `(website)/layout.tsx` so `/admin` can render its own, separate shell.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-primary-white text-primary-black antialiased">
        <a
          href="#main-content"
          className="focus-ring sr-only rounded-[var(--radius-control)] bg-primary-black px-4 py-2 text-primary-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
