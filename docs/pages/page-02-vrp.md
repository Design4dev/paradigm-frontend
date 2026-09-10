# Page 02 — Vehicle Results Page (VRP)

**Route:** `/vehicles` (`src/app/(website)/vehicles/page.tsx`)
**Status:** Implemented against the approved Desktop/Tablet/Mobile VRP reference.

As-built documentation — see `docs/pages/page-01-homepage.md` for the sibling doc and its format.

## Architecture

`page.tsx` is a thin **server** component: it parses `searchParams` once (so a direct/shared link —
nav, category cards, Featured Fleet's "View All Inventory" — renders the right filtered view on
first paint) and hands the result to `VrpPageClient` (`src/features/vehicles/components/VrpPageClient.tsx`),
a **client** component that owns all interaction and keeps the URL in sync via `router.push`. The
underlying data (`filterVehiclesForVrp` / `sortVehiclesForVrp` in `vehicles.service.ts`) is
synchronous mock data today; swapping it for a real backend call keyed off the same query params
is the only change needed later.

Components (`src/features/vehicles/components/`):

| Component | Role |
|---|---|
| `VrpHero` | Compact dark banner + breadcrumb |
| `VrpCategoryStrip` | Horizontal category nav — sets a single `type` filter |
| `VrpToolbar` | Result count, sort, grid/list toggle, mobile "Filters (N)" trigger |
| `VrpFilterSidebar` | The filter form — one implementation, rendered inline (desktop, `variant="sidebar"`) or inside a `Dialog` (mobile/tablet, `variant="drawer"`) |
| `VehicleCard` / `VehicleListRow` | Grid vs. List view, same data/actions |
| `VrpPagination` | Prev/numbered/ellipsis/Next, real pagination over real results |

`BenefitStrip` (`src/components/sections/BenefitStrip`) was extracted out of the Homepage `Hero`
so the VRP could reuse it (§20) instead of duplicating the markup — `tone="light"` here since it
sits on a plain page background rather than over the dark hero.

## Filter model

Sidebar filters are **staged** (`draftFilters`) until "Apply Filters," matching the reference's
explicit Apply/Reset buttons. The category strip and sort/view/pagination controls apply
immediately. Both read/write the same `VrpFilters` shape, so the category strip and the sidebar's
Vehicle Type checkboxes can never disagree about what's selected.

URL keys: `q`, `type` (comma-separated), `make`, `model`, `yearMin`/`yearMax`, `priceMin`/`priceMax`,
`mileage`, `location`, `availability`, `condition` (comma-separated), `sort`, `view`, `page`.

`availability` (added when the VDP work connected the Homepage's Advanced Search to this page —
see `docs/pages/page-03-vdp.md`) reuses `AVAILABILITY_OPTIONS`' values and lives in the sidebar
alongside Location. The URL-building logic (`vrpFiltersToSearchParams` in `vehicles.service.ts`) is
now shared with the Homepage's search/advanced-search handoff rather than living only in
`VrpPageClient`, so the two can never drift apart.

## Deliberate simplifications (and why)

- **Vehicle Type / Condition counts are computed from the real mock dataset**, not copied from the
  reference screenshot's larger numbers. Those counts sit directly next to an interactive checkbox
  whose entire purpose is "click to filter to this many" — showing a placeholder count that
  doesn't match the actual filtered result would be a functional bug, not just marketing copy
  (contrast with "500+ Vehicles Found" / "500+" on the category strip's "All Vehicles" pill, which
  — like the Homepage's "500+ Commercial Vehicles Available" — is treated as approved marketing
  copy about the real, much larger live inventory, not a claim about the mock dataset's size).
- **Pagination is real**, sized to the actual (small) mock inventory — it will show far fewer than
  "50" pages until real inventory volume exists. The component's ellipsis algorithm already
  supports many pages; there's just honestly not that much mock data to page through yet
  (page-02-vrp.md §27 — don't invent inventory).
- **Category-strip icons**: every category shares one generic vehicle glyph (label carries the
  distinction) except "Specialty Vehicles," which reuses the existing star icon. Icons are inline
  SVG components (`design.md` §2 — corrected 2026-09, this used to say "raster only") and
  hand-drawing 7 distinct, high-fidelity vehicle-silhouette icons was judged disproportionate to
  this component's importance; the category label text is the primary identifier either way.
- **Categories with no matching mock inventory** ("Service Trucks", "Refrigerated", "Specialty
  Vehicles") are real, clickable filters that honestly return the empty state today rather than
  being removed or faked — they'll resolve the moment matching inventory exists.
