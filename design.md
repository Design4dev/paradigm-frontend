# Paradigm Fleet — Design System (design.md)

**Status:** This file did not previously exist as a standalone document, even though every page
spec and dozens of component doc-comments reference it (`design.md §N`) as the global source of
truth. This is the first real version — written from the actual, working implementation (CSS
tokens + established component conventions), not invented from scratch. Treat those in-code
section references as pointing at the relevant heading below by topic, not a literal numbered
match to some prior document.

**Priority order for any visual/content decision on this project** (client feedback, 2026-09):

1. The current **deployed Paradigm Fleet website** (paradigmfleet.ca) — the primary visual and
   content direction to keep building on.
2. This design system (below) and the existing implementation it documents.
3. Client-approved requirements.
4. The existing `docs/pages/page-0N-*.md` specifications.
5. Rob's concept images — **selective inspiration only**, never a wholesale template. Do not
   introduce a visual pattern just because a concept image had it, and do not replace the existing
   Paradigm Fleet visual language to chase a concept's look.

If `paradigmfleet.ca` cannot be reached from the current environment (as of this audit it returns
HTTP 403 to automated fetches), fall back to this document, the existing implementation, and the
page specs — never invent what the live site "probably" looks like.

---

## 1. Brand tokens

All registered in `src/styles/variables.css` via Tailwind v4's `@theme` — use the token classes
below everywhere; never hardcode a hex value or an arbitrary radius/spacing number that already has
a token.

### Color

| Token | Value | Use |
|---|---|---|
| `primary-red` | `#ef0d0d` | Brand red — primary CTAs, active states, key accents |
| `primary-black` | `#030202` | Primary text, dark surfaces |
| `primary-white` | `#f0f0f0` | Text/surface on dark backgrounds |
| `secondary-red` | `#a6192e` | Reserved for approved secondary-red usage only — do not introduce new reds |
| `accent-red-dark` | `#7a1723` | Primary button hover/active |
| `dark-neutral` | `#1a1a1a` | Dark surfaces (Footer, Hero background, dark cards) |
| `soft-gray` | `#eceded` | Light neutral surfaces, subtle fills, hover backgrounds |
| `surface` | `#ffffff` | Card/panel background |
| `border` | `#e2e2e2` | Default border/divider color |

Semantic (non-brand) colors — green/amber for status only, never as a decorative accent — are
Tailwind defaults (`green-600`, `amber-500`) used via the shared `Pill` component's tone map
(`src/components/ui/Badge/Badge.tsx`); do not add new ad hoc status colors per page.

### Typography

Font families: `--font-display` (Montserrat, headings) and `--font-body` (Open Sans, body/UI),
self-hosted via `next/font/google`. Type-scale utility classes, registered in
`src/styles/utilities.css` via Tailwind's `@utility` — **use these tokens, not raw `text-*`/`font-*`
combinations**, so type never drifts per-component:

| Class | Family | Weight | Size | Line-height |
|---|---|---|---|---|
| `text-display-xl` | display | 700 | `clamp(2.5rem, 4.5vw+1rem, 5rem)` | 1.04 |
| `text-display-l` | display | 700 | `clamp(2rem, 2.6vw+1rem, 3.25rem)` | 1.08 |
| `text-heading-l` | display | 700 | `clamp(1.5rem, 1.2vw+1rem, 2.25rem)` | 1.15 |
| `text-heading-m` | display | 700 | 1.25rem | 1.25 |
| `text-body-l` | body | 400 | 1.125rem | 1.6 |
| `text-body-m` | body | 400 | 1rem | 1.6 |
| `text-label-m` | body | 600 | 0.875rem | 1.3 |
| `text-caption-s` | body | 400 | 0.75rem | 1.4 |

A known past defect (fixed in this audit): pill/tag components had `text-label-m` layered
underneath a conflicting raw `text-xs leading-tight` on the same element — it happened to render
correctly only by accident of Tailwind's utility-generation order. **Never stack a type-scale token
with raw `text-*`/`leading-*` overrides on the same element** — pick one token, or extend the token
if a genuinely new size is needed.

### Radius, motion, z-index

- `--radius-control: 8px` — buttons, inputs, small cards/rows.
- `--radius-card: 14px` — cards, panels, modals.
- Never introduce a third radius value without updating this file.
- `--duration-micro: 200ms` / `--duration-panel: 280ms`, eased with `--ease-out-standard` /
  `--ease-in-out-standard` — all hover/active/panel-open transitions use these, not arbitrary
  durations.
- `--z-base` (0) → `--z-sticky` (20) → `--z-header` (40) → `--z-dropdown` (45) → `--z-popover` (47)
  → `--z-modal-backdrop`/`--z-modal` (50/51) → `--z-toast` (60). Any new fixed/sticky/absolute layer
  references one of these tokens (e.g. `z-[var(--z-sticky)]`) rather than a bare number.

### Container / spacing

`.container-page` (`src/styles/utilities.css`) is the one page-width wrapper: max-width 1440px,
responsive inline padding (1.25rem → 2.5rem at 768px → 4rem at 1440px). Use it for every top-level
section; don't hand-roll a second container pattern.

**Spacing rule (clarified per client feedback):** the project uses an approximately-40px guideline
for spacing, but **40px is a guideline for true major-section transitions, not a fixed rule applied
everywhere**:

- Between genuinely distinct page sections (Hero → next section, card grid → next section, a
  standalone VDP section like Financing → the next one) — use ~40px or more (in practice: ≥64px
  vertical padding, or a full-bleed color-band boundary, per section).
- Between related elements within one section or component — a label and its input, adjacent form
  fields, a heading and its immediate supporting text, rows in a list — use tighter, purpose-built
  spacing (Tailwind's `gap-2`/`gap-3`/`gap-5` scale as appropriate). Do not mechanically insert 40px
  there; it reads as excessive whitespace and makes pages unnecessarily long.
- When in doubt: ask "is this a transition between two conceptually separate sections a visitor
  would describe as different parts of the page?" If yes, ~40px+. If no (it's internal structure of
  one section), use the tighter scale.

---

## 2. Icon system (corrected — supersedes older "raster only" docs)

**Current, actual system:** `src/components/ui/Icons/Icons.tsx` — inline SVG components sourced
from `lucide-react`, wrapped by a shared `icon()`/`toneIcon()` helper (20px default size, 1.75
stroke width, `currentColor`-based so they recolor via a wrapping `text-*` class like any other
element). A handful of brand marks (`LinkedinIcon`, `InstagramIcon`, `FacebookIcon`) aren't in
`lucide-react`'s current icon set and are hand-drawn to the exact same 24×24/stroke-1.75 geometry
and exported alongside the rest — same system, not a special case.

**This supersedes the "raster icons only, no SVG anywhere" claim** that still appears in
`README.md` and two older page docs (`page-01-homepage.md`, `page-02-vrp.md`) — the project
migrated off `public/images/icons/*.png` to this SVG component system at some point before this
audit (confirmed: `public/images/icons/` is now empty of the ~40 files those docs still describe,
e.g. they cite a `ThumbsUpIcon` PNG for the vehicle-card save toggle; the actual, current
implementation uses `HeartIcon`, an SVG lucide `Heart`). Those docs are corrected as part of this
audit (see the audit summary for the exact diffs).

**What "no SVG" in the client brief / older specs actually means going forward:** don't add new
standalone `.svg` asset *files* to `public/`, and don't introduce a second icon system. It does
**not** mean avoiding this established `lucide-react` inline-SVG-component pattern, which is the
real, current, working icon architecture and should keep being extended (as it already was for the
social-media icons) rather than replaced.

Photography/product imagery stays JPG/PNG via `next/image`, sourced from `assets/` (staging) →
`public/images/vehicles/` (served) — that rule is unchanged and still correct.

---

## 3. Component conventions

Shared primitives live in `src/components/ui/` (one folder + `index.ts` per component, barreled via
`src/components/ui/index.ts`). Before building a new UI element, check this list and reuse:

| Component | Covers |
|---|---|
| `Button` | `primary` / `secondary` / `ghost` variants, `md`/`lg` sizes. `buttonClassName()` is exported so a `<Link>` that needs to *look* like a button (navigation, not an in-place action) reuses the exact classes instead of duplicating them. |
| `Input` / `Select` / `Checkbox` | Every form field. `Input`/`Select`/`Button`'s `md` size all resolve to `h-11` (44px) — never override height per usage; if a field needs to look different, change the shared component. |
| `Badge` (`Pill`, `AvailabilityBadge`) | The one pill/tag primitive — tone variants (`neutral`/`red`/`black`/`green`/`amber`/`outline`), optional leading icon or status dot. Every status/condition/"New" tag renders through this. |
| `Modal` (`Dialog`) | Every modal AND every drawer (mobile filter panel, mobile menu) — a drawer is a `Dialog` with a side-panel layout, not a separate primitive. Handles focus trap, body-scroll lock (reference-counted — two dialogs can legitimately be open at once), and Escape-to-close. |
| `Accordion` (`AccordionItem`) | Every collapsible row — VDP tablet/mobile section nav, Footer's tablet/mobile nav columns, calculator "View Full Breakdown". Height animates via a `grid-template-rows` 0fr/1fr trick; the collapsed panel's own padding must live on a div *nested inside* the `overflow-hidden` wrapper, not merged onto it, or the "closed" state leaks a few px of the panel's content (a real bug found and fixed in this audit). |
| `Tooltip` (`useTooltip` hook) | Hover/keyboard-focus label for any icon-only control. Portal-based (escapes clipped/`overflow-hidden` ancestors), positioned from the trigger's live `getBoundingClientRect()`. `IconButton` wires this in automatically from its own `aria-label` — new icon-only buttons get a tooltip for free by using `IconButton` rather than a bare `<button>`. |
| `IconButton` | Every icon-only button (close, carousel arrows, favorite/share, filters). Auto-tooltip as above. |
| `FeedbackCard` | Success/error state card (form submissions) — `role="status"`/`role="alert"`, action buttons stack `flex-col` on mobile → `sm:flex-row`. |

Feature-specific components live under `src/features/<domain>/components/` (vehicles, finance,
tradein, search, leads, cms, analytics) with their own `config`/`lib`/`services`/`types` siblings —
follow this same shape for the new rental feature (§7 below).

**Reuse-first rule confirmed by this audit:** every page built in this project so far (Homepage,
VRP, VDP, Payment Calculator, Trade-In) reused the shared Header/Footer/Button/Input/Card/Modal
system rather than forking it. Continue that pattern for Rental — no new header, footer, button, or
form-control implementation.

---

## 4. Layout patterns

- **Section-nav (tabs on desktop, accordion on mobile/tablet)**: `VehicleSectionNav` pattern —
  desktop renders a sticky segmented tab bar with scroll-spy; tablet/mobile renders the same
  sections as `AccordionItem` rows. Reuse this exact split for any future page needing this pattern
  rather than inventing a new one.
- **Multi-step flow orchestrator**: one client component owns all shared state for the whole flow
  (`PaymentCalculatorClient`, `TradeInClient`) and passes state + handlers down to pure step
  components; a shared `Stepper` component shows upcoming/active/completed/error states. The Rental
  "Find Your Fleet" guided finder (§7) follows this same architecture.
- **Sticky mobile CTA**: appears only once the primary CTA row has scrolled out of view
  (`IntersectionObserver`), never permanently docked from page load.
- **Page hero**: a compact dark banner + breadcrumb (`VrpHero`/`CalculatorHero`/`TradeInHero`
  shape) for every non-homepage page — full homepage-scale hero is reserved for `/`.

---

## 5. Accessibility baseline

- Every interactive control gets a visible focus ring (`.focus-ring` utility, `:focus-visible`
  only) and a real accessible name (`aria-label` where there's no visible text).
  and comments), and marked either `aria-hidden` (if it duplicates an adjacent accessible name)
  the sole carrier of meaning — pill/badge status always pairs a dot with a text label.
- Minimum touch target ~44px (`h-11` shared control height already satisfies this for every form
  control and button).
- Modals/drawers trap focus, restore it to the trigger on close, and close on Escape.

---

## 6. Mobile-first methodology (client feedback, now a core project requirement)

Every page — existing and new — is designed/validated in this order, not desktop-first-then-shrunk:

1. **375px (mobile)** — the primary product experience. Single-column flows, full-width CTAs,
   sticky/condensed summaries, drawers instead of sidebars, comfortable touch targets, no
   horizontal scrolling except where explicitly intentional (e.g. a horizontally-scrollable
   category strip).
2. **768px (tablet)** — validate the same content works at a constrained-but-wider width; this is
   often a hybrid (accordion nav instead of desktop tabs, but a 2-column card grid instead of
   mobile's 1-column).
3. **1440px (desktop)** — the full expanded layout (sidebars, tab bars, multi-column grids).

Special attention areas (per client feedback): navigation, search, filters, forms, cards, vehicle
galleries, CTAs, sticky conversion actions, calculator controls, rental finder questions,
tables/detail rows, modals/drawers, footer, touch targets, typography, content hierarchy.

---

## 7. Rental architecture (updated — full-page rebuild pass)

Rental has gone through several passes: a nav label → a questionnaire → a guessed-URL redirect form
→ a verified Apprentall iframe embed → a native booking **modal** → and now, this pass, **three
distinct full pages** (Landing → Search → Results → Book → Confirmation), no modal/popup/iframe
anywhere. The client's explicit direction: Apprentall is a reference for the real booking
information architecture, never the final user-facing UI, and the booking process itself should be
a real page the visitor navigates to — not an overlay on top of the page they were already on.

```
/rentals                Landing — Hero (Book Now / View Rental Fleet) → Rental Vehicle Categories
                         → Our Rental Fleet → Not Sure What You Need? (secondary) →
                         Why Choose Paradigm Truck Rental → More Than a Rental (upfitting) →
                         Paradigm Fleet Ecosystem → Simple Rental Process → Final CTA
/rentals/search          Reservation Search — the verified field set, dedicated page
/rentals/search/results  Vehicle results (category/vehicle-filtered), real RentalVehicleCards
/rentals/book             Booking process — 01 Add-ons → 02 Coverage → 03 Information → 04 Payment
/rentals/confirmation     Confirmation — its own route, reached only after real success
/rentals/find-your-fleet  Optional guided finder → same Search/Results/Book flow
/rentals/quote            Fallback/compatibility lead-capture (offered from Payment's fallback state)
```

**Landing refinement pass ("RENTAL LANDING PAGE REFINEMENT + PARTNERS + SITE-WIDE CONFIRMATION
SOUND"):** the Hero now carries the spec's actual primary/secondary CTAs — "Book Now" (→
`/rentals/search`) and "View Rental Fleet" (in-page anchor to `#rental-fleet`) — via new optional
`primaryAction`/`secondaryAction` props on `RentalHero` (every other page using `RentalHero` —
Search/Results/Book-adjacent Quote/Find Your Fleet — omits them and is visually unchanged). The old
"Built for Business" 4-point strip was folded into two clearer sections instead of one generic one:
`RentalWhyChoose` ("Why Choose Paradigm Truck Rental," 6 verified points) and `RentalUpfitSection`
("More Than a Rental," connecting to the real, existing `/services#upfitting`). "Not Sure What You
Need?" is now its own dedicated section (`RentalNotSureSection`) after the fleet grid, rather than a
plain link inside the fleet section — still the only Find Your Fleet entry point on the page.
`RentalProcessSection` adds the real user-facing "Rent Your Vehicle in Four Simple Steps" (Choose
Vehicle → Select Dates → Complete Details → Confirm Rental) — deliberately not the internal
Add-ons/Coverage/Information/Payment stepper terminology.

**Partners / Ecosystem section:** audited this pass for any verified partner, manufacturer,
financing, or upfitting-partner logos anywhere in the project (`public/images/logos/` and every
rental/vehicle config file) — none exist beyond Paradigm's own logo. Per the spec's explicit
fallback for this case, `RentalEcosystemSection` shows Paradigm Fleet's real internal business lines
(Rentals, Sales, Leasing & Financing, Upfitting, Service & Parts) instead of fabricating partner
branding, each linking to its real existing route. It reuses `ServicesGrid`'s exact card shape (that
component was generalized to accept an `items`/`gridClassName` prop, default unchanged, rather than
building a second near-identical card grid) — no duplicate component.

**Site-wide confirmation sound:** `ConfirmationSoundControl`, mounted only on
`/rentals/confirmation` once a real `submission.status === "success"` is showing. The chime itself
(`confirmationSound.ts`) is synthesized entirely with the Web Audio API — a ~0.5s soft "thunk" +
two-note triangle-wave chirp, comfortably under the spec's 3-second cap, never looping — rather than
a shipped audio file, since no sound reference was provided and shipping a sourced clip would raise
licensing questions this approach avoids entirely (and costs zero bytes). One best-effort autoplay
attempt fires on mount (skipped under `prefers-reduced-motion`); an accessible "Booking Confirmed —
Play Sound" / "Play Confirmation Sound Again" button is always rendered regardless of whether that
attempt succeeded, satisfying the spec's graceful-fallback requirement without fragile
autoplay-success detection. Never mounted on a failed/pending booking or a validation error — the
same `submission.status !== "success"` redirect guard that protects the whole confirmation page from
direct/refreshed visits also gates the sound.

A category tile or a vehicle's "Rent It" never opens anything in place — every one of them sets the
selected category/vehicle in `useRentalBookingStore` (one centralized, non-persisted store — see
`booking.types.ts`) and navigates: to `/rentals/search` from Landing/Find Your Fleet (search is
always required first), straight to `/rentals/book` from Search Results (search is already done).
`/rentals/book`'s 4 in-page steps use client-side step transitions (no route change) via the same
store; only a genuinely successful booking submission moves the visitor to the dedicated
`/rentals/confirmation` route. `/rentals/search/results`, `/rentals/book` and `/rentals/confirmation`
each guard against a direct/refreshed visit with no prior state by redirecting back rather than
rendering broken or fake content (confirmed live: all three redirect correctly).

**Verified vs. integration-dependent, honestly, per step:**

| Step | Status |
|---|---|
| Categories / Vehicle / Search | Real, verified fleet catalog + real photography (see below) + the verified Reservation Search field set |
| Add-ons | **Integration-dependent** — no real add-ons/pricing were ever verified; shows an honest "not available online yet" notice, not invented products |
| Coverage | **Integration-dependent** — same honest empty state |
| Information (Contact/License/Additional Driver/Address/Uploads) | Real, verified field set per section; document uploads are genuinely local (a real `File`/preview, never transmitted — no upload backend exists) |
| Terms | Folded into Payment (the spec's 5-stage list has no separate Terms step) — no approved legal copy verified, so a placeholder notice; the checkbox/validation mechanic is real |
| Payment | Real UI shell; **no payment provider connected** — `rentalPayment.service.ts` always returns `not_configured`; card fields are local-component-state only, never sent/stored/logged/written to the central store |
| Confirmation | Only reachable after a **real** successful API response — see below |

**Real photography, not generic icons:** the 7 real fleet category photos (`public/images/rental/`)
were extracted from the client's own live Apprentall search results (Playwright reading `<img src>`
values inside the live cross-origin iframe, then downloaded) — genuine Paradigm-branded fleet
photography (visible watermarks: company name, address, "paradigmfleet.ca" plate), hosted at
`rentallstorageprd.blob.core.windows.net/vehicletypes/1923/…`, not stock imagery. Per this project's
"all images served from `public/images/`" convention, they were downloaded and committed rather than
hotlinked. Doors/Seats/Baggage attributes and "Similar to X" descriptors are likewise real values
observed live, not invented. In this project's verified data, a "category" and a "vehicle" are the
same real entity (one representative vehicle per category, not many units per category) — so
"Rental Vehicle Categories" and "Our Rental Fleet" show the same real catalog at two densities
(compact tile vs. full card), not two invented taxonomies.

**Confirmation is real, honestly scoped:** there is no live Apprentall reservation-creation API
available to this codebase, and building a fake one is explicitly forbidden. Instead,
`rentalBooking.service.ts`'s `createBooking()` submits the complete structured booking (vehicle,
dates, contact, license, address, additional driver, add-on/coverage selections, terms acknowledgement,
payment status) through the project's existing, real, working lead pipeline (`submitRentalQuote` →
`/api/rental-quote` → `createSalesforceLead`). The reference number shown on `/rentals/confirmation`
is the real id that endpoint returns — genuinely real, honestly framed as a **booking request** for
the rental team to confirm and collect payment on, never as a live paid Apprentall reservation.

**A real, pre-existing bug found and fixed during QA (still fixed, carried forward from the previous
pass):** `services/api/client.ts`'s `request()` was treating the raw `/api/*` response body as the
`data` payload directly, but every route handler actually responds with an `{ success, data }`
envelope (`ApiSuccessResponse<T>`) — so `response.data.id` was silently `undefined` everywhere in the
codebase. Confirmed still fixed via a live Playwright run through the full Landing → Search → Results
→ Book → Confirmation journey — the real POST body was captured and inspected, and Confirmation shows
a real reference number.

**Cleanup performed this pass:** deleted `RentalBookingDialog` (the modal shell) and its 10 modal-step
components entirely — nothing in this codebase renders a booking modal/popup/iframe anymore. Renamed
Extras/Insurance → Add-ons/Coverage throughout (types, services, analytics) to match this pass's
terminology exactly, so code and documentation use one vocabulary. `apprentall.config.ts` remains,
docstring updated: still unused by any UI, kept only as a documented integration reference.

**Explicitly not built:** a live Apprentall/payment-provider/document-upload integration (each
documented, not faked), a second competing booking engine, invented add-on/coverage/pricing/
license-field content, a fake "success"/"uploaded" state not backed by a real response, or any
partner/manufacturer logo not actually present in the project (see the Ecosystem section above).

---

## 8. What this document deliberately does not cover

- Exact copy for pages not yet built or content that cannot be verified from this repository or an
  accessible live source — see each page's own `docs/pages/page-*.md` and the audit summary for
  open TODOs.
- **Finance Application (credit-application) page — STATUS: NOT IMPLEMENTED / DECISION REQUIRED.**
  A repository-wide search (route tree, `src/features/*`, and terms like "finance application",
  "credit application", "application form") found no such page, route, or component anywhere in
  this project — only the Payment Calculator (`src/features/finance/`, an estimation tool, not a
  credit application) and Trade-In Appraisal. This contradicts some project communication that
  describes it as "already implemented." No credit-application form (SSN, income, employment, or
  other compliance-sensitive fields) has been invented to fill the gap — that decision belongs to
  the client/PM. Flagged here and in the audit summary; not built or assumed.
