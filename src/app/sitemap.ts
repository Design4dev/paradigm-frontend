import { siteConfig } from "@/config/site.config";
import { getAllVehicles } from "@/features/vehicles/services/vehicles.service";
import { getPosts } from "@/services/cms/cms.service";
import type { MetadataRoute } from "next";

const STATIC_ROUTES = [
  "",
  "/vehicles",
  "/about",
  "/services",
  "/contact",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const vehicleEntries: MetadataRoute.Sitemap = getAllVehicles().map((vehicle) => ({
    url: `${base}/vehicles/${vehicle.slug}`,
    lastModified: new Date(),
  }));

  const posts = await getPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticEntries, ...vehicleEntries, ...blogEntries];
}
