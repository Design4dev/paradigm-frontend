# Page 01 — Homepage

**Route:** `/` (`src/app/(website)/page.tsx`)
**Status:** Implemented, refined against the approved Desktop/Tablet/Mobile screenshot reference.

This is the as-built documentation for the homepage — what's actually implemented and why,
including refinements made during screenshot-matching passes. Update this file when the homepage
changes; don't let it drift from `src/app/(website)/page.tsx`.

## Section order (top to bottom)

| # | Section | Component |
|---|---|---|
| 1 | Header (utility bar + main nav) | `src/components/common/Header` |
| 2 | Hero + Buy/Rent/Service/Parts search | `src/components/sections/Hero`, `src/features/search/components/FleetSearch` |
| 3 | Benefit strip (4 points) | inside `Hero.tsx` |
| 4 | Quick Start lead form ("Tell us what you need") | `src/components/sections/QuickStartForm` |
| 5 | Shop by Vehicle Type | `src/components/sections/VehicleCategories` |
| 6 | Featured Fleet | `src/components/sections/FeaturedFleet` + `src/features/vehicles/components/VehicleCard` |
| 7 | Our Services ("One Fleet Partner") | `src/components/sections/Services`, `ServicesGrid` |
| 8 | Industry Solutions | `src/components/sections/IndustrySolutions` |
| 9 | Tailored Recommendations | `src/components/sections/TailoredRecommendations` |
| 10 | Testimonials (carousel) | `src/components/sections/Testimonials` |
| 11 | Final CTA (red band) | `src/components/sections/FinalCTA` |
| 12 | Footer | `src/components/common/Footer` |

"Recently Viewed" was intentionally removed (not in the approved reference) — the component
(`src/features/vehicles/components/RecentlyViewed.tsx`) still exists for the VDP's related-vehicles
use case but is not rendered on the homepage.

## Key implementation decisions

- **Search stays in-page.** Clicking "Search Vehicles"/"Search Rentals" or applying Advanced
  Search does **not** navigate away — it opens the shared `SearchOverlay` (via `SearchProvider`)
  with results computed from the selected filters (`advancedSearchVehicles`). Only the
  header's magnifying-glass icon and static nav/category links (`/vehicles`, `/vehicles?type=...`)
  are real navigations — those are legitimate browse-to-a-page actions, not the "search"
  interaction itself.
- **One shared control height.** `Input`, `Select` and `Button`'s `md` size all resolve to `h-11`
  (44px) — see the comment in `src/components/ui/Input/Input.tsx`. Never override height per
  usage; if a form needs to look different, change the shared component. This is what keeps
  Buy/Rent/Service/Parts fields (and every other form on the site) visually consistent and
  prevents placeholder/option text clipping.
- **Card heights.** `VehicleCard` and the `ServicesGrid` cards are `flex h-full flex-col` with
  their CTA pinned via `mt-auto`, and their grids rely on CSS Grid's default `align-items: stretch`
  plus an explicit `h-full` all the way down the wrapper chain (grid → `Reveal`/wrapper → card
  root). If a card ever looks like it's sized to its own content again, that chain is broken
  somewhere — check for a missing `h-full`, not a new one-off fix.
- **Featured Fleet shows 3 cards** (`lg:grid-cols-3`), matching the reference exactly — not 4.
- **Icons are inline SVG components** (`lucide-react`, wrapped by `src/components/ui/Icons`) — see
  `design.md` §2 (corrected 2026-09; this used to describe a raster-PNG icon system that no longer
  exists). The save/like toggle on vehicle cards uses `HeartIcon` (filled red when active), not a
  thumbs-up. `PhoneIcon` takes a `tone="white"` prop for use on colored backgrounds (e.g. the red
  Final CTA band) — since every icon is `currentColor`-based, `tone` just swaps which `text-*`
  class wraps it, it doesn't swap a file.
- **Hero heading** uses the `text-display-l` token (not `text-display-xl`) inside a `max-w-4xl`
  container so "Built Around Your Business." comfortably fits on its own line at desktop widths —
  `text-display-xl`'s ~80px cap made a 2-line, screenshot-accurate wrap impossible at any
  reasonable container width.
- **Testimonials** is a single scroll-snap track at every breakpoint (not a separate grid/carousel
  split), auto-advancing every 6s, pausable on hover/focus, disabled under
  `prefers-reduced-motion`, with prev/next `IconButton`s and dot indicators. Card count "per view"
  is just the track's `auto-cols` sizing (`85%` mobile / `46%` tablet / `31.5%` desktop) — one
  mechanism, not three.
- **Footer** brand block spans `col-span-2` of a `lg:grid-cols-6` grid (2 + 1 + 1 + 1 + 1 = 6) —
  it was previously a `grid-cols-5` grid with 6 column-units of content, which silently wrapped
  the Contact column onto its own row. If a footer column ever needs to change width, recompute
  the column-unit total against `grid-cols-N` before touching spacing/margins.

## Content sourcing

Identity/contact facts (address, hours) are Paradigm Fleet Services' real, published Hamilton, ON
details; phone numbers match the approved design reference. See README → "The homepage matches
Paradigm Fleet's actual identity" for the full provenance note, including the testimonials caveat
(paraphrased from public review sentiment, attributed by role/location rather than an invented
private individual's name).

## Known intentional gaps

- Testimonials are representative, not individually-attributed, verified quotes — swap before a
  real launch (see README).
- `/vehicles` (VRP) exists for direct navigation (nav, category cards, "View All Inventory") but
  is a minimal listing, not a fully upfitted VRP experience — that's a separate future page.
