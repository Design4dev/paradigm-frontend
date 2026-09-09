import { blogService } from "@/features/cms/services/blog.service";
import { footerServiceNav } from "@/config/navigation.config";
import { searchVehicles, vehicleLocations } from "@/features/vehicles/services/vehicles.service";

export type SearchCategory = "Vehicles" | "Services" | "Locations" | "Resources";

export interface GlobalSearchSuggestion {
  id: string;
  category: SearchCategory;
  label: string;
  sublabel?: string;
  href: string;
}

const CATEGORY_ORDER: SearchCategory[] = ["Vehicles", "Services", "Locations", "Resources"];

/**
 * Global search (page-01-homepage.md's Advanced Search replacement).
 * Queries every real content type this site actually has — inventory,
 * the real service pages, real dealership locations, and real blog posts —
 * rather than inventing categories (Parts/Dealers) with no backing content
 * of their own in this single-location prototype (§31-style content rule).
 */
export async function getGlobalSearchSuggestions(query: string): Promise<GlobalSearchSuggestion[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const vehicles: GlobalSearchSuggestion[] = searchVehicles({ query: q })
    .slice(0, 5)
    .map((vehicle) => ({
      id: `vehicle-${vehicle.slug}`,
      category: "Vehicles",
      label: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
      sublabel: `${vehicle.priceLabel} · ${vehicle.location}`,
      href: `/vehicles/${vehicle.slug}`,
    }));

  const services: GlobalSearchSuggestion[] = footerServiceNav
    .filter((service) => service.label.toLowerCase().includes(q))
    .map((service) => ({
      id: `service-${service.label}`,
      category: "Services",
      label: service.label,
      href: service.href,
    }));

  const locations: GlobalSearchSuggestion[] = vehicleLocations
    .filter((location) => location.toLowerCase().includes(q))
    .map((location) => ({
      id: `location-${location}`,
      category: "Locations",
      label: location,
      sublabel: "View inventory in this area",
      href: `/vehicles?location=${encodeURIComponent(location)}`,
    }));

  const posts = await blogService.list();
  const resources: GlobalSearchSuggestion[] = posts
    .filter((post) => post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q))
    .slice(0, 4)
    .map((post) => ({
      id: `post-${post.slug}`,
      category: "Resources",
      label: post.title,
      sublabel: post.excerpt,
      href: `/blog/${post.slug}`,
    }));

  return [...vehicles, ...services, ...locations, ...resources];
}

/** Groups a flat suggestion list into ordered category sections for rendering. */
export function groupSuggestions(suggestions: GlobalSearchSuggestion[]): { category: SearchCategory; items: GlobalSearchSuggestion[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: suggestions.filter((s) => s.category === category),
  })).filter((group) => group.items.length > 0);
}
