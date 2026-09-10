# Paradigm Fleet — Next.js Prototype

Production-quality Next.js implementation of the Paradigm Fleet marketing site, built from
`design.md` (global design system) and the page specifications, plus a minimal admin section,
contact/lead/webhook API routes, and Salesforce/CMS integration stubs.

## Stack

Next.js App Router · TypeScript · Tailwind CSS v4 · zod (validation) · zustand (client store) ·
Server Components by default (`"use client"` only where interaction/state requires it).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. `.env.local` already has working dev defaults (see below), so
`/admin` works out of the box too.

- `npm run build` — production build (also runs the TypeScript check)
- `npm run lint` — ESLint

## Structure

Page-specific implementation notes (as-built decisions, deliberate simplifications, why something
looks the way it does) live in [`docs/pages/`](docs/pages/) — one file per page, e.g.
[`page-01-homepage.md`](docs/pages/page-01-homepage.md), [`page-02-vrp.md`](docs/pages/page-02-vrp.md),
[`page-03-vdp.md`](docs/pages/page-03-vdp.md). Update the relevant file there when a page's
implementation changes.

```
public/
  favicon.ico, favicon.png, apple-touch-icon.png   Raster favicons (no SVG anywhere in the project)
  images/
    logos/    logo.png (black, light bg) / logo-white.png (white+red, dark bg) / icon.png (mark only) — real brand PNGs
    icons/    One PNG per UI icon (see components/ui/Icons) — pre-rendered, not inline SVG
    static/   Empty slot for future misc images
  fonts/      Empty — fonts are self-hosted automatically via next/font/google

src/
  app/
    (website)/                   Marketing site: layout (Header/Footer/overlays) + page/about/services/contact/blog/vehicles
    admin/                       Prototype admin shell + dashboard/pages/content (gated by middleware.ts)
    api/{contact,leads,webhooks}/route.ts   Real, working route handlers (see below)
    layout.tsx, globals.css, loading.tsx removed (see note), error.tsx, not-found.tsx
  components/
    ui/            Button, Input, Modal (Dialog primitive), Badge, IconButton, Icons, Reveal, Loader — each its own folder + index.ts, plus a top-level ui/index.ts barrel
    common/        Header, Footer, MobileMenu, Navbar, SEO (JSON-LD), Providers
    sections/      Hero, VehicleCategories, FeaturedFleet, Services(+Grid/TrustStats), Testimonials(+Card), FinalCTA, CTA (generic), ContactSection
  features/
    vehicles/      VDP/card/gallery/etc. components + vehicles.service.ts (mock data) + images.config.ts
    search/        FleetSearch, SearchOverlay/Results/Empty, SearchProvider
    leads/         QuickQuote(+Modal), QuoteProvider, leads.service.ts, lead.types.ts (zod schema)
    contact/       ContactForm, contact.schema.ts (zod), contact.service.ts
    cms/           BlogList/BlogCard, blog.service.ts, useBlogPosts, blog.types.ts
    analytics/     tracking.service.ts, useTrackEvent
  services/
    api/           client.ts (typed fetch wrapper) + endpoints.ts
    salesforce/    salesforce.service.ts — real REST call, mock-mode fallback without env vars
    cms/           cms.service.ts — mock blog content, swappable for a real headless CMS
  hooks/           useDebounce, useLocalStorage, useMediaQuery, useReducedMotion, useLockBodyScroll, useFocusTrap
  lib/             utils.ts (cn), constants.ts, validations.ts
  types/           common.types.ts, api.types.ts, global.d.ts
  config/          site.config.ts, navigation.config.ts, environment.ts (typed env access)
  store/           zustand store — recently-viewed vehicles, persisted to localStorage
  styles/          variables.css (tokens), reset.css, utilities.css — imported by app/globals.css

middleware.ts       Prototype gate for /admin (see below)
.env.example / .env.local
```

## What's real vs. what's a stub

Everything **renders and behaves correctly end-to-end** — there are no dead buttons or fake
"TODO" screens. The honest caveats:

- **No real authentication.** `/admin` is protected by `middleware.ts` checking a shared-secret
  cookie (`ADMIN_ACCESS_KEY`), not an identity/auth system. Visit `/admin?key=<value>` once per
  browser to unlock it. This is called out on-screen in the admin shell too.
- **No database.** `features/vehicles/services/vehicles.service.ts` and
  `services/cms/cms.service.ts` are in-memory mock data. Admin's Inventory/Pages views are
  read-only for this reason — they show real, live data, just not editable data.
- **Salesforce and email are mock-mode by default.** `/api/leads` and `/api/contact` are real,
  working route handlers with real validation (zod) — they just log server-side and return
  success instead of actually creating a Salesforce lead or sending an email, because no
  credentials are configured. Set `SALESFORCE_INSTANCE_URL` + `SALESFORCE_ACCESS_TOKEN` in
  `.env.local` and `services/salesforce/salesforce.service.ts` will make the real REST call
  instead — no other code changes needed.
- **Analytics no-ops** without `NEXT_PUBLIC_ANALYTICS_ID` set (logs to the console in dev instead).

## The homepage matches Paradigm Fleet's actual identity

The homepage (and the site's identity data in general) was rebuilt against `page-01-homepage.md`
and the approved Desktop/Tablet/Mobile screenshots, and against Paradigm Fleet Services' real
Hamilton, ON identity (`www.paradigmfleet.ca`) rather than a generic placeholder fleet company:

- **Header**: red utility bar (tagline + location + social) over the main nav
  (Inventory/Rentals/Upfitting/Financing/Service & Parts/About Us), sticky with the utility bar
  collapsing on scroll.
- **Hero**: Buy/Rent/Service/Parts tabs. Buy has real Vehicle Type/Make/Location selects that
  route to `/vehicles?...` (a new, real VRP listing page — see below), plus an Advanced Search
  panel (9 filters: type, make, model, year, price, mileage, condition, location, availability)
  that expands inline on tablet/desktop and opens as a full-screen sheet on mobile.
- **Quick Start Form**: an always-visible embedded lead form ("Tell us what you need") distinct
  from the Quick Quote modal, sharing the same zod-validated lead schema/service.
- **Vehicle cards**: full CAD purchase price, km mileage, a "New" badge, a save/favorite toggle,
  and dual View Vehicle / Request a Quote CTAs — matching the dealership card in the reference
  screenshots (mock inventory in `vehicles.service.ts` was rewritten to match: CAD pricing, km,
  Ontario locations).
- **New sections**: Industry Solutions (Plumbing/Electrical/HVAC/Logistics) and Tailored
  Recommendations (4-step teaser, opens Quick Quote) — both specified in the homepage doc but
  missing from the previous build.
- **New `/vehicles` route**: a minimal-but-real VRP (Vehicle Results Page) reading filters from
  the URL, so every search/category/Advanced Search action resolves to a real, filtered listing
  instead of a dead end.
- **Testimonials**: paraphrased from Paradigm Fleet's real public reviews, attributed by
  role/location rather than an invented private individual's name — swap in verified,
  client-approved, individually-attributed quotes before this goes live for real.
- **Contact facts**: address and hours are Paradigm Fleet's real, published Hamilton, ON details;
  phone numbers match the approved design reference. `/privacy-policy` and `/terms-of-service` are
  intentionally short placeholder pages — real legal copy needs the client's counsel.

## Prototype recovery-path triggers (intentional, for testing states)

- Search: type `error` to see the Error + Retry state.
- Quick Quote / Contact form: use an email containing `fail` (e.g. `test+fail@example.com`) to
  see the Failure state. Entered data is preserved either way.
- `/api/webhooks` requires an `x-webhook-secret` header matching `WEBHOOK_SECRET`; without it,
  or without the env var set, it correctly returns 401 (secure by default).

## A Next.js quirk worth knowing about

There is intentionally **no root-level `loading.tsx`**. In this Next.js version (16.3.4,
Turbopack production builds), a shared `loading.tsx` ancestor combined with `notFound()` inside a
statically-generated dynamic route (`/vehicles/[slug]`, `/blog/[slug]`) caused the page to render
correctly but return HTTP 200 instead of 404 — confirmed by bisecting against a minimal
reproduction. Removing the global loading boundary fixed it; per-feature loading states (Search,
Quick Quote, Contact form) don't depend on it and are unaffected.

## Images: JPG/PNG photography, SVG icon components

**Corrected 2026-09 audit note:** this section previously described a raster-PNG icon system
(`public/images/icons/*.png`). The project has since moved back to inline SVG icon *components*
(below) — that folder is now effectively empty. This section documents the current, actual state;
see `design.md` §2 for the full rationale. Photography/logo assets are still exclusively JPG/PNG —
that part of the original rule is unchanged.

- **Logo**: `public/images/logos/logo.png` (black, light backgrounds), `logo-white.png` (white
  wordmark + red mark, dark backgrounds) and `icon.png` (mark only) are the **actual supplied
  brand files** (`Paradigm_logo_black.png` / `Paradigm_logo_white_red.png` / `Logo1.png`), not a
  recreation.
- **Favicon**: `public/favicon.ico` + `favicon.png` + `apple-touch-icon.png`, generated directly
  from the real icon mark and wired up via `metadata.icons` in `app/layout.tsx`.
- **UI icons**: `components/ui/Icons/Icons.tsx` exports named components (`SearchIcon`, `CheckIcon`,
  `SpecIcon`, …), each one an inline SVG sourced from `lucide-react` (wrapped by a shared `icon()` /
  `toneIcon()` helper — 20px, 1.75 stroke, `currentColor`-based) or, for the handful of brand marks
  `lucide-react` doesn't ship (`LinkedinIcon`, `InstagramIcon`, `FacebookIcon`), hand-drawn to the
  same geometry. Icons that need an explicit color regardless of ambient text color
  (`PhoneIcon`, `ArrowRightIcon`, `SpinnerIcon`) take a `tone="red" | "white" | "dark"` prop.
- Because every icon is `currentColor`-based, a wrapping `text-*` class (hover, active, tone
  variants) recolors the icon directly — no per-color file variants needed.
- Vehicle/category/site photography (`public/images/vehicles/*.jpg|png`) remains JPG/PNG via
  `next/image`, sourced from the project's `assets/` staging folder — no SVG or external image URLs
  for photography.
