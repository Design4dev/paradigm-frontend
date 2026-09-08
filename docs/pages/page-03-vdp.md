# Page 03 — Vehicle Detail Page (VDP)

**Route:** `/vehicles/[slug]` (`src/app/(website)/vehicles/[slug]/page.tsx`)
**Status:** Implemented against the approved Desktop/Tablet/Mobile VDP reference.

As-built documentation — see `docs/pages/page-01-homepage.md` and `docs/pages/page-02-vrp.md` for the sibling docs and their format.

## Architecture

`page.tsx` is a server component: it looks up the vehicle once from the typed mock repository
(`getVehicleBySlug` in `vehicles.service.ts`), 404s via `notFound()` for an unknown slug, and
renders every section server-side (all mock data is synchronous today — see "Loading state"
below). `generateStaticParams` pre-builds all known slugs; `generateMetadata` produces per-vehicle
title/description/canonical/Open Graph, and the page also emits a `Vehicle`/`Offer` JSON-LD block
built only from real fields (§28/§31).

Components (`src/features/vehicles/components/`):

| Component | Role |
|---|---|
| `VdpBreadcrumb` | Home / Inventory / Category / Vehicle — "Inventory" points at the referring VRP search when there is one (§21) |
| `VehicleGallery` | Hero gallery — vertical thumbnail rail on desktop, horizontal strip on tablet/mobile, real image counter, conditional 360° badge |
| `GalleryLightbox` | Full-screen viewer shared by the hero gallery's expand control and the secondary Gallery section |
| `VehicleSummary` | Status/Save/Share row, name, condensed spec line, location, price, primary/secondary CTA, contact actions |
| `VehicleContactActions` | Call Sales / Email Us / Chat with Us |
| `VehicleTrustCards` | Compact 4-item trust strip (this page's own copy — see below) |
| `VehicleSectionNav` | Desktop horizontal tabs + scroll-spy; tablet/mobile renders the same sections as an accordion instead |
| `VehicleOverview` | Description + data-backed "Why Choose This Vehicle?" |
| `VehicleSpecs` | Reused from the original VDP build — generic spec-card grid |
| `VehicleKeyFeatures` | 4 visual highlight cards + "View All Features" expands the full feature-tag list inline |
| `VehicleGallerySection` | Secondary curated gallery grid, opens `GalleryLightbox` |
| `VehicleWarranty` | Static, company-wide protection copy |
| `VehicleFinancing` / `PaymentEstimator` | Financing links + a real, inline amortization calculator |
| `RelatedVehicles` | Reused, now with a "View All Inventory" action |
| `StickyMobileCTA` | Mobile-only, hidden until the primary CTA row scrolls out of view (IntersectionObserver) |
| `VdpChatBubble` | Mobile-only floating "Chat with Us" affordance |
| `VdpSkeleton` | Built for readiness, not wired as a route `loading.tsx` — see below |

`Breadcrumb` (`src/components/common/Breadcrumb`) and `AccordionItem` (`src/components/ui/Accordion`)
are new, generic, reusable primitives rather than one-off VDP markup — `AccordionItem` also now
backs the Footer's tablet/mobile nav (see below).

## Deliberate simplifications (and why)

- **No 360° tour renders anywhere.** `Vehicle.has360Tour` exists and `VehicleGallery` fully
  supports the badge, but no real 360° capture exists for any mock vehicle, so it's left `false`
  everywhere rather than faked (§9/§31 — same honesty rule as the VRP's empty categories).
- **Financing rate is never defaulted.** `PaymentEstimator` pre-fills the vehicle price but leaves
  APR blank for the visitor to enter — defaulting it to any number would read as Paradigm Fleet's
  real rate, which §31 explicitly forbids inventing.
- **"Chat with Us" and the mobile chat bubble open the Quick Quote form.** There's no live-chat
  backend in this prototype; reusing the one real lead-capture flow is the same honesty convention
  already used for Salesforce/email mock-mode (README).
- **Compact trust strip uses this page's own copy**, not the Homepage/VRP `BenefitStrip`'s wording —
  the VDP reference literally shows "Competitive Financing / Upfitting Available / Canada-Wide
  Support / Trusted by Businesses" as short single-line labels, which is what `VehicleTrustCards`
  renders. Icons are reused from the existing set (no new icons added just for this).
- **Key Features cards reuse the vehicle's own gallery photos** (cycled by index) rather than
  fabricated macro photography per feature — real photos, not fake ones, at the cost of literal
  photo-to-feature correspondence.
- **`VdpSkeleton` exists but isn't wired as `vehicles/[slug]/loading.tsx`.** This route's data is
  synchronous mock data, so there's no real async gap for a loading boundary to fill, and the
  README documents a reproduced bug in this Next.js version where a `loading.tsx` ancestor
  combined with `notFound()` inside a statically-generated dynamic route returns HTTP 200 instead
  of 404 — exactly this route's shape. Confirmed via `curl` that an unknown slug still returns 404
  today; the skeleton is ready to drop in once the repository becomes a real async call (re-verify
  the status code first).
- **Route-scoped `not-found.tsx`/`error.tsx`** override the generic `(website)` ones so "Back to
  Inventory" (not "Back to Homepage") and a "Search Vehicles" action (opens the shared search
  overlay) are what a visitor sees for a missing/broken vehicle (§23/§25).
- **Footer becomes an accordion below `lg`, site-wide.** The VDP reference (priority-1 source of
  truth for this page) shows Inventory/Services/Company/Contact as collapsible chevron rows on
  tablet/mobile; since `Footer` is one shared component, this became a site-wide responsive
  change rather than a VDP-only fork — desktop is pixel-identical to before.
- **Favorites are now a persisted, shared store slice** (`store/slices/favorites.slice.ts`)
  instead of each card's own local `useState`, so saving a vehicle from the VRP grid, the VRP list
  view, or the VDP itself all stay in sync and survive a reload — a real improvement enabled by
  needing the same Save control on the VDP.
