import type { BlogPost } from "@/features/cms/types/blog.types";

/**
 * Content layer for pages/posts. This prototype has no headless CMS
 * connected, so it's backed by the mock array below — but every call site
 * (features/cms) goes through `getPosts`/`getPostBySlug`, so pointing this
 * at a real CMS (Contentful, Sanity, WordPress…) later means rewriting the
 * body of these two functions only.
 */
const POSTS: BlogPost[] = [
  {
    slug: "choosing-the-right-cargo-van",
    title: "Choosing the Right Cargo Van for Your Business",
    excerpt: "Cargo volume, payload and drivetrain all matter more than sticker price — here's how to weigh them.",
    author: "Paradigm Fleet Team",
    publishedAt: "2026-06-02",
    readMinutes: 5,
    content: [
      "Picking a cargo van comes down to three numbers most buyers skip past: cargo volume, payload capacity, and door configuration. Get those wrong and you'll be leasing a second vehicle within a year.",
      "Start with what actually goes inside the van on a normal day — not the biggest load you've ever hauled. Shelving-ready interiors and a flat load floor tend to matter more day-to-day than raw cubic footage.",
      "Finally, factor in upfitting lead time. A van that's 'in stock' but needs four weeks of shelving and wrap work isn't actually available for four weeks — plan your fleet timeline around delivery-ready, not manufactured-ready.",
    ],
  },
  {
    slug: "lease-vs-buy-for-fleets",
    title: "Lease vs. Buy: What Actually Changes at Fleet Scale",
    excerpt: "The math that works for one vehicle rarely holds once you're managing ten or more.",
    author: "Paradigm Fleet Team",
    publishedAt: "2026-05-18",
    readMinutes: 6,
    content: [
      "At fleet scale, the lease-vs-buy decision is less about interest rates and more about capital allocation and turnover cadence. Leasing keeps vehicles current without tying up capital that could go into hiring or equipment.",
      "Ownership makes more sense when duty cycles are unusually light or when a vehicle needs permanent, expensive upfitting that outlives a typical lease term.",
      "Most of our fleet clients run a blended model: lease the daily-use passenger and cargo fleet, own the specialty upfit vehicles that rarely change.",
    ],
  },
  {
    slug: "electrifying-last-mile-delivery",
    title: "What It Actually Takes to Electrify Last-Mile Delivery",
    excerpt: "Range anxiety isn't the real blocker anymore — charging infrastructure planning is.",
    author: "Paradigm Fleet Team",
    publishedAt: "2026-04-30",
    readMinutes: 4,
    content: [
      "Modern electric delivery vans comfortably cover most last-mile routes on a single charge. The harder problem is depot charging capacity once you're running more than a handful of vehicles overnight.",
      "Start any EV transition with a route audit, not a vehicle order — know your daily mileage distribution before you commit to a battery size.",
      "Our EV program pairs vehicle delivery with a charging-readiness assessment for exactly this reason.",
    ],
  },
];

export async function getPosts(): Promise<BlogPost[]> {
  return POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return POSTS.find((post) => post.slug === slug);
}
