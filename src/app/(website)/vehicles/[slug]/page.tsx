import { VdpBreadcrumb } from "@/features/vehicles/components/VdpBreadcrumb";
import { VdpChatBubble } from "@/features/vehicles/components/VdpChatBubble";
import { VdpSectionsProvider } from "@/features/vehicles/components/VdpSectionsContext";
import { VehicleFinancing } from "@/features/vehicles/components/VehicleFinancing";
import { VehicleGallery } from "@/features/vehicles/components/VehicleGallery";
import { VehicleGallerySection } from "@/features/vehicles/components/VehicleGallerySection";
import { VehicleKeyFeatures } from "@/features/vehicles/components/VehicleKeyFeatures";
import { VehicleOverview } from "@/features/vehicles/components/VehicleOverview";
import { VehicleSectionNav, type VdpSection } from "@/features/vehicles/components/VehicleSectionNav";
import { VehicleSpecs } from "@/features/vehicles/components/VehicleSpecs";
import { VehicleSummary } from "@/features/vehicles/components/VehicleSummary";
import { VehicleTrustCards } from "@/features/vehicles/components/VehicleTrustCards";
import { VehicleWarranty } from "@/features/vehicles/components/VehicleWarranty";
import { RecentlyViewedTracker } from "@/features/vehicles/components/RecentlyViewedTracker";
import { RelatedVehicles } from "@/features/vehicles/components/RelatedVehicles";
import { StickyMobileCTA } from "@/features/vehicles/components/StickyMobileCTA";
import { getAllVehicles, getVehicleBySlug } from "@/features/vehicles/services/vehicles.service";
import { siteConfig } from "@/config/site.config";
import type { Vehicle, VehicleAvailability } from "@/features/vehicles/types/vehicle.types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SCHEMA_AVAILABILITY: Record<VehicleAvailability, string> = {
  available: "https://schema.org/InStock",
  limited: "https://schema.org/LimitedAvailability",
  reserved: "https://schema.org/OutOfStock",
  "coming-soon": "https://schema.org/PreOrder",
};

/** Vehicle structured data (page-03-vdp.md §28) — only real fields, nothing invented. */
function vehicleJsonLd(vehicle: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
    brand: vehicle.brand,
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    description: vehicle.description,
    image: vehicle.images.map((image) => image.url),
    sku: vehicle.stockNumber,
    vehicleIdentificationNumber: vehicle.vin,
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: vehicle.price,
      availability: SCHEMA_AVAILABILITY[vehicle.availability],
      url: `${siteConfig.url}/vehicles/${vehicle.slug}`,
    },
  };
}

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllVehicles().map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  const title = `${vehicle.year} ${vehicle.brand} ${vehicle.model} | Paradigm Fleet`;
  const image = vehicle.images[0];

  return {
    title,
    description: vehicle.description,
    alternates: { canonical: `/vehicles/${vehicle.slug}` },
    openGraph: {
      title,
      description: vehicle.description,
      url: `/vehicles/${vehicle.slug}`,
      images: image ? [{ url: image.url, alt: image.alt }] : undefined,
    },
  };
}

/**
 * Vehicle Detail Page (VDP) — page-03-vdp.md. Server component: the vehicle
 * is looked up once from the typed mock repository (swappable for a real
 * inventory/PBS call later without touching any child component) and
 * 404s via `notFound()` for an unknown slug.
 */
export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const vehicleName = `${vehicle.year} ${vehicle.brand} ${vehicle.model}`;

  const sections: VdpSection[] = [
    { id: "overview", label: "Overview", content: <VehicleOverview vehicle={vehicle} /> },
    { id: "specifications", label: "Specifications", content: <VehicleSpecs vehicle={vehicle} /> },
    { id: "features", label: "Features", content: <VehicleKeyFeatures vehicle={vehicle} /> },
    { id: "gallery", label: "Gallery", content: <VehicleGallerySection images={vehicle.images} vehicleName={vehicleName} /> },
    { id: "warranty", label: "Warranty & Protection", content: <VehicleWarranty /> },
    { id: "financing", label: "Financing", content: <VehicleFinancing vehicle={vehicle} /> },
    { id: "related-vehicles", label: "Related Vehicles", content: <RelatedVehicles slug={vehicle.slug} /> },
  ];

  return (
    <VdpSectionsProvider defaultId={sections[0].id}>
      <div className="pb-28 lg:pb-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd(vehicle)) }} />
        <RecentlyViewedTracker slug={vehicle.slug} />

        <div className="container-page pt-6">
          <VdpBreadcrumb vehicle={vehicle} />
        </div>

        <div className="container-page grid grid-cols-1 gap-10 py-8 sm:py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:py-12">
          <VehicleGallery images={vehicle.images} vehicleName={vehicleName} has360Tour={vehicle.has360Tour} />
          <VehicleSummary vehicle={vehicle} />
        </div>

        <div className="container-page py-10">
          <VehicleTrustCards />
        </div>

        <div className="container-page pt-10 pb-16">
          <VehicleSectionNav sections={sections} />
        </div>

        <StickyMobileCTA vehicle={vehicle} />
        <VdpChatBubble vehicle={vehicle} />
      </div>
    </VdpSectionsProvider>
  );
}
