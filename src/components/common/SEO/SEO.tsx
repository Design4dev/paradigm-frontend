import { siteConfig } from "@/config/site.config";

interface SEOProps {
  /** Extra JSON-LD nodes for the current page (e.g. a BlogPosting or Product schema). */
  jsonLd?: Record<string, unknown>[];
}

/**
 * Renders shared JSON-LD structured data. Page-level `<title>`/meta tags
 * are handled the App Router way via each route's exported `metadata`
 * (see lib/seo helpers there) — this component covers the piece that
 * `metadata` can't: machine-readable structured data.
 */
export function SEO({ jsonLd = [] }: SEOProps) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logos/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "sales",
    },
  };

  return (
    <>
      {[organization, ...jsonLd].map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
