# Page 06 — Rental (Landing / Find Your Fleet / Quote)

**Routes:** `/rentals`, `/rentals/search`, `/rentals/search/results`, `/rentals/book`,
`/rentals/confirmation`, `/rentals/find-your-fleet`, `/rentals/quote`
**Status:** Rebuilt as **three distinct full pages** (no modal, no popup, no iframe) — 2026-09,
full-page rebuild pass, with a subsequent landing-page content/structure refinement + Partners/
Ecosystem section + site-wide confirmation sound pass. See `design.md` §7 for the architecture
rationale, and the "Landing refinement + Partners + confirmation sound pass" heading at the bottom of
this file for the most current, accurate picture. Sections above it (including the previous
native-modal and Apprentall-iframe-embed passes) are preserved for history and are superseded
wherever they conflict (noted inline) — neither the modal nor the iframe described below exists in
the UI anymore.

As-built documentation — see `docs/pages/page-01-homepage.md` for the sibling doc format.

## Current architecture (read this first)

```
/rentals                 Hero (Book Now / View Rental Fleet) → Rental Vehicle Categories →
                          Our Rental Fleet → Not Sure What You Need? (secondary) →
                          Why Choose Paradigm Truck Rental → More Than a Rental (upfitting) →
                          Paradigm Fleet Ecosystem → Simple Rental Process → Final CTA
/rentals/search           Reservation Search — dedicated page, verified field set
/rentals/search/results   Vehicle results (category/vehicle-filtered), real RentalVehicleCards
/rentals/book              Booking process — 01 Add-ons → 02 Coverage → 03 Information → 04 Payment
/rentals/confirmation      Confirmation — its own route, reached only after real success
/rentals/find-your-fleet   Vehicle Type → What You Need → Recommendation → "Rent It" → same
                            /rentals/search flow (never a second booking form)
/rentals/quote             "Request a Callback" — fallback/compatibility lead-capture path
```

| Route | Purpose | Implementation |
|---|---|---|
| `/rentals` | Landing — discovery + a real primary CTA, no booking form on the page | Server page. `RentalHero` (Book Now → `/rentals/search`, View Rental Fleet → `#rental-fleet` anchor) + `RentalCategoryTile` grid ("Rental Vehicle Categories") + `RentalFleetGrid` (`RentalVehicleCard`s, real photos) + `RentalNotSureSection` (secondary Find Your Fleet) + `RentalWhyChoose` + `RentalUpfitSection` + `RentalEcosystemSection` + `RentalProcessSection` + closing dark `CTA` band (Book Now / View Rental Fleet). |
| `/rentals/search` | Reservation Search — dedicated page | `RentalSearchForm` — the verified field set (Pickup/Drop-off Location, Different Drop-off toggle, dates/times, Age, Promo Code); shows the preserved category/vehicle context if any. Submitting records the search in the store and routes to Results — never redirects externally, never shows a "pending" state. |
| `/rentals/search/results` | Vehicle results | `RentalSearchResults` — redirects back to Search if visited with no submitted search (state is non-persisted). Filters the real fleet catalog by preserved category; `RentalVehicleCard`s with `destination="book"` (skips Search since it's already done). |
| `/rentals/book` | Booking process — a full page | `RentalBookingClient` — redirects to Search if no vehicle is selected. 4 in-page steps (client-side transitions via the store, no route change): `StepAddons`, `StepCoverage`, `StepInformation` (Contact/License/Additional Driver/Address/Document uploads), `StepPayment` (+ Terms). Sticky `BookingSummarySidebar` on desktop, collapsible accordion on mobile. |
| `/rentals/confirmation` | Confirmation — its own route | `BookingConfirmationView` — redirects to `/rentals` if no successful submission is recorded. Real reference number, Back to Rentals (resets the store), Print. |
| `/rentals/find-your-fleet` | Optional discovery → category recommendation → same Search flow | `RentalFinderClient` — 3 steps: Vehicle Type (visual cards, real photos) → What You Need → Result (`RentalVehicleCard`, default `destination="search"`). Collects nothing Search/Information don't already collect. |
| `/rentals/quote` | Request a Callback — fallback, not primary | `RentalQuoteClient`. Offered from `StepPayment`'s "not configured" state; still reachable directly and via `?vehicle=<slug>` VDP context. |

## Explicitly not built (Phase 2 / unverified — flagged per the "no autonomous product decisions" rule)

- Any scoring/weighting formula, automatic routing, or vehicle-recommendation ranking beyond a
  direct vehicle-type filter over real inventory. The finder's `RentalFinderRequest` shape captures
  clean, structured, typed metadata (use case, vehicle type, timing, contact) that a real
  backend scoring/routing engine can consume later (`design.md` §7) — nothing is faked to look like
  scoring already exists.
- A live rental-availability calendar/date-blocking system.
- Rental pricing/rate display of any kind.

## Where things live

- `src/features/rental/types/rental.types.ts` — `RentalFinderStep`, `RentalUseCase`,
  `RentalFinderRequest`, `RentalQuoteRequest`, `StepErrors`.
- `src/features/rental/config/rental.config.ts` — vehicle-type options (reused from
  `VRP_CATEGORIES`, not a second list), use-case options, duration bands — no rate table (none
  exists to reference).
- `src/features/rental/lib/matchRentalFleet.ts` — reuses `filterVehiclesForVrp` directly; no
  parallel matching/scoring implementation.
- `src/features/rental/lib/validateRentalFinder.ts` — per-step validation, same shape as
  `tradein`'s `validateTradeIn.ts`.
- `src/features/rental/schemas/rental.schema.ts` / `services/rental.service.ts` — Zod schema +
  `apiClient.post`, same shape as `tradein`'s.
- `src/app/api/rental-quote/route.ts` — validates, folds structured answers into
  `createSalesforceLead`'s Description field (no new CRM fields invented), same "email contains
  'fail'" prototype-testing convention as `/api/leads` and `/api/trade-in`.
- `src/features/rental/components/` — `RentalHero` (shared compact hero across all 3 pages),
  `RentalFinderStepper`, `RentalFinderStepVehicleType` (step 1, visual cards)/`StepUseCase` (step 2,
  visual cards)/`StepDetails` (step 3, timing + contact merged)/`Results` (step 4),
  `RentalFinderClient` (orchestrator), `RentalQuoteClient` (standalone form).

## Reused rather than duplicated

- Header/Footer/Button/Input/Select/FeedbackCard/Stepper visual pattern — zero new form controls or
  card primitives.
- `VehicleCard` for matching-fleet results (no new vehicle-tile component).
- `filterVehiclesForVrp` / `vrpFiltersToSearchParams` for matching + a "View Full Fleet" link to the
  real VRP.
- `CTA` (generic full-width band) for the landing page's closing section.
- `createSalesforceLead` (no new CRM integration).

## Navigation changes

- `primaryNav`'s "Rentals" now points at `/rentals` (was `/services#rentals`).
- `footerServiceNav`'s "Rentals" now points at `/rentals`, plus a new "Find Your Fleet" entry.
- `/services#rentals`'s own content on the Services page is untouched — still real, still live, just
  no longer the only rental destination.

## Verification performed

- `tsc --noEmit`, `eslint src`, and `npm run build` all clean.
- Screenshotted at 1440/768/375px for all 3 routes — no horizontal overflow, no console errors, no
  regressions to existing pages (home/VDP/Payment Calculator/Trade-In all reverified 200 after this
  work).
- **A real, self-inflicted bug was found and fixed during this pass**: `design.md` (also written in
  this session) illustrated the z-index token pattern using a wildcarded arbitrary-value example in
  a markdown code-span. Tailwind's content scanner picked that literal text up as a utility-class
  candidate and generated invalid CSS, which crashed `next dev` (not `next build`, which only
  warned) site-wide. Fixed by rewording the example to name a real token directly instead of using
  bracket-arbitrary-value syntax with a wildcard in it (anywhere, including prose/docs — not just
  application code) — reverified every route returns 200 after the fix.
## Audit findings implementation pass (2026-09, follow-up)

- Added the per-vehicle "Request a Quote →" CTA to `RentalFinderResults` (see table above) — the
  one concrete gap the follow-up audit found against the brief's "Rental Result Conversion"
  requirement. Reuses `buttonClassName()`/`Link` exactly like `VehicleFinancing`'s restyled CTAs;
  no new component, no fake vehicle data — links straight into the already-working
  `?vehicle=<slug>` prefill on `/rentals/quote`.
- Re-confirmed, via a fresh repository-wide search, that no Finance Application / credit-application
  route, page, or component exists anywhere in this project (only the Payment Calculator and
  Trade-In Appraisal). `design.md` §8 updated with an explicit `STATUS: NOT IMPLEMENTED / DECISION
  REQUIRED` line. Nothing was built to fill this gap.
- Existing pages (Homepage/VRP/VDP/Payment Calculator/Trade-In/Header/Footer) were reviewed against
  `design.md` and this session's client feedback; no further inconsistency was found beyond what
  was already corrected in the prior audit pass, so none of those pages' code was changed again
  here — per "do not rebuild, fix only actual inconsistencies."

- **Not performed** (same sandbox limitation documented elsewhere in this session's work): live
  click-driven functional testing of the multi-step finder — this environment's dev server has a
  pre-existing broken HMR WebSocket that prevents React event handlers from firing in the automated
  browser here. The finder's step-gating/validation logic was verified by direct code review against
  the already-functionally-verified `TradeInClient`/`PaymentCalculatorClient` pattern it copies, not
  by a live click-through. Recommend a manual click-through in a real browser before sign-off.

## Rental review + navigation behavior pass (2026-09, second follow-up)

- **New-tab navigation restored.** The current live Paradigm Fleet site opens Rentals in a new
  browser tab; this was not yet carried over. `NavItem` (`config/navigation.config.ts`) gained an
  optional `newTab?: boolean`, set only on `primaryNav`'s "Rentals" entry. `Navbar` and `MobileMenu`
  apply real `target="_blank" rel="noopener noreferrer"` (no JS-only tab-opening) plus a `sr-only`
  "(opens in a new tab)" label for screen readers when the flag is set. Keyboard/native anchor
  behavior is unaffected. `footerServiceNav`'s "Rentals"/"Find Your Fleet" links were left as normal
  same-tab links — the brief scoped this to the primary nav item only. No click-tracking existed on
  any nav item before this change, so none was added (would have been a new, unrequested feature).
- **Rental result cards now feel like rental cards, not reused sales cards.** `VehicleCard` gained
  three additive, default-off props (`hidePrice`, `hideAvailabilityBadge`, `hideQuoteButton`) — every
  existing usage (VRP, Homepage) is completely unaffected. `RentalFinderResults` now passes all
  three: `vehicle.price`/`priceLabel` is documented in `vehicle.types.ts` as "full purchase price" —
  verified sales-only, no rental meaning, so it's hidden rather than replaced with an invented rate.
  `AvailabilityBadge` renders sales-inventory lifecycle states (`reserved`, `coming-soon`, etc.) that
  don't describe rental confirmation — hidden to avoid the same contradiction fixed below. The card's
  built-in "Request a Quote" button opened the general sales quote modal, duplicating and conflicting
  with this page's own, correctly-routed `/rentals/quote?vehicle=<slug>` CTA — hidden so only the
  correct one shows. The same sales-price leak existed on `/rentals/quote`'s vehicle-context card
  (`RentalQuoteClient`) — `priceLabel` removed from `RentalQuoteVehicleContext` entirely and from the
  page that builds it (`rentals/quote/page.tsx`); replaced with an accurate, non-price caption.
- **Availability language corrected.** `RentalFinderResults` said "available today — availability is
  confirmed by our team" in the same sentence — a real, direct contradiction, since no real-time
  availability system exists. Reworded to "Showing real {type} vehicles from our fleet — our team
  will confirm availability for your dates," which matches the (already-correct) phrasing used
  everywhere else in the rental flow (`RentalQuoteClient`, both hero subtitles). No availability
  system was built or implied.
- Grepped `paradigmtruckrental.com`/`paradigmtruckrental.com/find-your-fleet/` again this pass —
  still inaccessible for content extraction from this environment (same as the prior audit). Nothing
  was guessed from them; the existing generic UX concept already in use was kept as-is.
- Reviewed `/rentals` landing copy, CTA hierarchy, and spacing against `design.md` and the one
  verified rental sentence in the project — no change required, already compliant.
- Reviewed the 4-step Find Your Fleet architecture (What You Need → Vehicle & Timing → Your Details
  → Matching Fleet) — unchanged, no scoring/weighting/availability logic added.

## Rental UX refinement pass (2026-09, third follow-up)

A user-supplied mockup image was provided as **visual direction only** for this pass (layout,
card-based selection, spacing, composition) — its invented copy (vehicle descriptions, "Book Rent"
label, sidebar content) was explicitly not used as a content source, per the brief's own
instruction. Real content came from this project's existing verified data plus one fresh, genuinely
accessible fetch of `paradigmtruckrental.com` (not the `/find-your-fleet/` sub-page, which is still
inaccessible for content extraction — only its title resolves).

- **Step order changed to SELECT → SELECT → SHORT DETAILS → MATCHING FLEET.** `RentalFinderStep`
  (`rental.types.ts`) is now `"vehicle-type" | "use-case" | "details" | "results"` (was `"use-case" |
  "vehicle" | "contact" | "results"`). Reordering and merging duration+notes+contact into one step
  shortens the flow from 4 form-heavy steps to 2 one-tap selections + 1 short details step + results.
- **Step 1 (new `RentalFinderStepVehicleType.tsx`) — visual selectable cards, replacing a `<Select>`
  dropdown.** One tap, no typing. Options are the unchanged `RENTAL_VEHICLE_TYPE_OPTIONS` (real VRP
  categories); icons reuse the same generic vehicle glyph (+ star for Specialty) as
  `VrpCategoryStrip` — this project's icon system deliberately shares one glyph across vehicle types,
  so nothing new was generated. No per-type description text was added (none is verified).
- **Step 2 (`RentalFinderStepUseCase.tsx`) — unchanged UI** (already visual cards from the prior
  build), just repositioned to position 2 and given a Back button.
- **Step 3 (new `RentalFinderStepDetails.tsx`, replaces the deleted `RentalFinderStepVehicle.tsx` +
  `RentalFinderStepContact.tsx`) — timing and contact merged into one step.** Duration
  (`RENTAL_DURATION_OPTIONS`, a small fixed set) is now one-tap chip buttons instead of a dropdown,
  matching the same "avoid unnecessary typing" principle as steps 1–2; the optional date picker and
  contact fields are unchanged. The standalone `/rentals/quote` form (`RentalQuoteClient`) got the
  same duration-chip treatment for visual consistency across the flow.
- **Step 4 (`RentalFinderResults.tsx`) — rental-specific spec row.** `VehicleCard` gained a
  `specOrder` prop (default unchanged — every existing sales usage is unaffected); rental results
  pass a new `RENTAL_CARD_SPEC_ORDER` (`["seats", "dimensions", "transmission", "fuel"]`) instead of
  the sales card's `["mileage", "engine", "transmission", "fuel"]`. All four values already exist on
  every vehicle record (`vehicles.service.ts`) — nothing invented, just reordered and `mileage`
  dropped, since a specific unit's sales/trade-in odometer reading isn't a rental-relevant attribute
  (client feedback + the brief's own list of rental-relevant fields excludes it).
- **Single primary rental CTA per vehicle, verified terminology.** The label changed from "Request a
  Quote →" to **"Rent It →"** — not copied from the mockup's "Book Rent" (explicitly out of scope as
  invented content), but from `paradigmtruckrental.com`'s own real, currently-accessible homepage,
  whose per-vehicle fleet buttons read "RENT IT" (fetched and verified this pass). The duplicate-CTA
  fix from the prior pass (`hideQuoteButton` on `VehicleCard`) still holds — exactly one CTA per
  vehicle. "View Vehicle" (the card's own built-in link) remains as the secondary action into the
  real VDP.
- **New-tab navigation** — reverified intact, untouched this pass.
- Availability language, sales-price hiding, and sales-badge hiding from the prior pass — reverified
  intact, untouched this pass.
- Landing page (`/rentals`) — reviewed against the mockup's composition (hero, benefits, How It
  Works, dual CTA); already matches this direction from the prior build. No change required.
- Touch targets: the new duration chips were built at `h-11` (44px) to match this project's own
  `Button` "md" size — the app's established minimum tap-target height — after an initial pass at a
  shorter height was caught in screenshot QA.

**Not performed** (same sandbox limitation as every prior pass, reconfirmed with a fresh Playwright
click attempt against the new Step 1 cards specifically): live click-driven testing. A direct
`page.getByRole("radio", { name: /Cargo Van/i }).click()` against the rebuilt Step 1 left
`aria-checked="false"` and "Next Step" still disabled — the same pre-existing broken-HMR-WebSocket
event-loop issue documented throughout this project, not a defect in this pass's code. Verified
instead via SSR HTML (`curl`), full-page screenshots at 375/768/1440 with zero horizontal overflow,
and direct code review of the (unchanged) validation/state-machine logic. Recommend a manual
click-through in a real browser before sign-off.

## Vehicle/fleet CTA hierarchy pass (2026-09, fourth follow-up)

- **"Rent It →" moved inside the card, primary.** `VehicleCard` gained a `rentalQuoteHref` prop
  (default `undefined` — every existing sales usage on VRP/Homepage is untouched, reverified via
  screenshot). When set, the card's own footer renders "View Vehicle" in the existing **secondary**
  button treatment (outline, matches `Button variant="secondary"`) and a new "Rent It →" link in the
  existing **primary** treatment (filled red, matches `Button variant="primary"`) — the exact same
  classes this project already uses, just swapped between the two slots, both at the same `h-10
  flex-1` sizing so height/spacing/alignment stay identical across every card regardless of vehicle
  name length. `RentalFinderResults` now passes `rentalQuoteHref={`/rentals/quote?vehicle=${slug}`}`
  instead of rendering a second CTA below the card — exactly one CTA per vehicle, and it lives inside
  the card now, not stacked under it.
- **"View Full Rental-Ready Fleet →" moved to the top-right of the results header.** Same label,
  same `vrpHref` destination, same `Button variant="secondary" size="lg"`. The header block is now
  `flex flex-col sm:flex-row sm:items-start sm:justify-between` (an existing pattern already used in
  `CalculatorSupportingSection`/`Footer`) — heading+subtext left, CTA right on tablet/desktop,
  stacked full-width below the heading on mobile.
- **Success banner auto-dismisses.** New `AutoDismissSuccessBanner` wrapper (local to
  `RentalFinderResults.tsx`) fades/slides the "Request received…" `FeedbackCard` out after 4.5s
  (`transition-[opacity,transform] duration-[var(--duration-panel)]`, this project's existing
  panel-transition token). `key`d to `referenceId` so a fresh success (e.g. after Retry) remounts it
  and restarts the timer. Submission state/logic (`submissionState`, `submitRentalQuote`, retry/edit
  handlers) is completely untouched — this is presentation-only.
- Verified: `tsc --noEmit`, `eslint src`, `npm run build` all clean; VRP/Homepage `VehicleCard`
  screenshotted at 375/1440 and confirmed byte-for-byte unchanged in behavior (price, badge, "View
  Vehicle"/"Request a Quote" all render exactly as before). Step 4 (Matching Fleet) itself still
  could not be click-reached in this sandbox for a live screenshot — same documented limitation —
  verified by code review instead.
- **Bug found and fixed (reported by client after this pass):** the first version of
  `AutoDismissSuccessBanner` only faded `opacity` to 0 on dismiss — the wrapper div kept its full
  height in the layout forever afterward, leaving a permanent blank gap above the results and making
  the results panel look "stuck" at a taller height. Fixed by switching to a `grid-template-rows: 1fr
  → 0fr` collapse (combined with the opacity fade) so the space actually closes up smoothly once
  dismissed, instead of just going invisible while still reserved.

## Rental implementation spec pass (2026-09) — real booking architecture

This pass reconciled the rental feature against the client's actual rental business and real
booking flow, per a supplied implementation spec + brief. Source priority used: (1)
`paradigmtruckrental.com` — genuinely accessible and fetched this pass (previous passes only got
its title), (2) the spec's own explicitly-labeled "known/verified" content, (3)
`book.apprentall.cloud` — accessible but client-rendered, exposes no usable content, (4)
`paradigmfleet.ca` — still 403, as in every previous pass.

### Architecture change

**Before:** primary path was a custom 4-step questionnaire (`/rentals/find-your-fleet`) ending in an
internal lead form (`/rentals/quote`) — no real external booking system involved.
**Now:** primary path is a real Reservation Search form (`RentalReservationForm`) matching the
client's actual field set, handing off to the client's real external booking engine (Apprentall).
Find Your Fleet is repositioned as optional discovery, not a required step.

### Verified content (not invented — see `rental.config.ts`)

| Item | Source | Value |
|---|---|---|
| Hero headline | paradigmtruckrental.com (fetched) | "Book Your Van or Truck Rental" |
| Value props | paradigmtruckrental.com (fetched) | Free 100 KMs/day, No booking fees, Variety of vehicles — with their exact supporting lines |
| Fleet categories (7) | paradigmtruckrental.com (fetched) + spec | Refrigerated Van, 16FT Cube Van, Dump Truck, HD Truck, Mid Roof Cargo Van, High Roof Cargo Van, 1/2 Ton Pickup Truck |
| Rental-division contact | paradigmtruckrental.com (fetched) | 905-512-5670 / 866-952-1781, info@paradigmtruckrental.com — distinct from the main dealership's `siteConfig.contact` |
| Reservation Search fields | spec (labeled "known/verified from client-supplied screenshots") | Location, Different Drop-off toggle (+ field), Pickup Date/Time, Return Date/Time, Age, Promo Code, Search |
| One example location | spec | "Stoney Creek — 339 Dosco Drive, Stoney Creek, Ontario" (only one verified — more are VERIFY) |

### New / changed files

- `src/features/rental/config/apprentall.config.ts` (new) — the external booking-engine integration
  boundary. `book.apprentall.cloud` only exposes a client-rendered loading shell to automated
  fetching this session — its real embed URL and query contract (location IDs, date/time format,
  client ID, etc.) could not be verified. Per the spec's explicit "do not invent a fake query-string
  schema" rule, `buildApprentallSearchUrl()` returns `null` until a real
  `NEXT_PUBLIC_APPRENTALL_URL` is configured — nothing guesses at parameters.
- `src/features/rental/components/RentalReservationForm.tsx` (new) — the real "Book Now" form (9
  fields per spec §7). On submit: if Apprentall is configured, opens the built URL in a new tab; if
  not, shows an honest "booking connection pending" `FeedbackCard` with the verified rental phone
  number and a "Request a Callback" fallback to `/rentals/quote` — never a broken or fabricated
  redirect.
- `src/features/rental/components/RentalFleetGrid.tsx` (new) — the 7 verified real fleet category
  names as simple cards (icon + name + "Rent It →" scrolling to Book Now). No price/seats/doors
  fields — none are verified for this project's data, and the spec explicitly forbids inventing
  them ("verify exact content... before hard-coding additional data").
- `src/features/rental/lib/validateReservationSearch.ts` (new) — client-side validation only; real
  date/lead-time/age constraints belong to Apprentall, not invented here.
- `src/components/ui/Toggle/Toggle.tsx` (new) — an on/off switch primitive (for "Different Drop-off
  Location"), since none existed. Whole row is one `<button role="switch">`, not a `<label for>` +
  separate button — a `<label for>` only auto-forwards clicks to real form controls, not an
  arbitrary `<button>`, so a split version would leave the label text unclickable (caught in
  screenshot QA and fixed before shipping).
- `src/features/rental/components/RentalFinderStepVehicleType.tsx` — switched from the sales VRP
  category list to `RENTAL_FLEET_CATEGORIES` (see "Why the old matching approach was replaced"
  below).
- `src/features/rental/components/RentalFinderResults.tsx` — rewritten. No longer reuses
  `VehicleCard`/real sales inventory matching (see below); now a plain category-recommendation card
  with a single "Rent It →" CTA to `/rentals#book-now`.
- `src/features/rental/components/RentalFinderClient.tsx` — dropped `matchRentalFleet` usage/import
  now that Results no longer matches inventory.
- `src/features/rental/lib/matchRentalFleet.ts` — **deleted**, no longer used anywhere.
- `src/features/rental/components/RentalQuoteClient.tsx` / `src/app/(website)/rentals/quote/page.tsx`
  — reframed as "Request a Callback" (was "Request a Rental Quote") to match its new fallback role;
  its own vehicle-type dropdown switched to `RENTAL_FLEET_CATEGORIES` for vocabulary consistency.
- `src/app/(website)/rentals/find-your-fleet/page.tsx` — added a "Skip ahead and book now →" link
  under the hero, reinforcing this page is optional.
- `src/features/rental/components/RentalHero.tsx` — benefit strip switched from 4 generic/invented
  value props to the 3 verified real ones (shared across all 3 rental pages).
- `src/features/rental/config/rental.config.ts` — added `RENTAL_CONTACT`, `RENTAL_VALUE_PROPS`,
  `RENTAL_FLEET_CATEGORIES`, `RESERVATION_LOCATIONS`, `RESERVATION_AGE_OPTIONS`,
  `EMPTY_RESERVATION_SEARCH`; removed `RENTAL_VEHICLE_TYPE_OPTIONS` (the sales-category list this
  pass replaced).
- `src/features/rental/types/rental.types.ts` — added `ReservationSearchState`/`Errors`/`Status`.
- `src/features/analytics/services/tracking.service.ts` — added `rental_landing_view`,
  `rental_book_now_click` (not yet wired to a click handler — see Remaining gaps),
  `rental_reservation_search_start/success/error`, `rental_external_booking_redirect`.

### Why the old "match against real sales inventory" approach was replaced

Explained in full in `design.md` §7. In short: the real rental fleet's category vocabulary (roof
height/model-specific, e.g. "16FT Cube Van") doesn't correspond to this project's sales
`VehicleType` enum (Cargo Van/Passenger Van/Pickup Truck/Box Truck/SUV/Sedan/Electric), so filtering
sales inventory by the real categories would have silently returned zero matches for most
selections. Replaced with a plain, transparent category confirmation instead of a broken or
misleading "matching fleet" search.

### Remaining gaps — need client/Apprentall confirmation

- **Apprentall integration is the one blocking gap.** `book.apprentall.cloud`'s real embed URL and
  query-parameter contract (location IDs, date/time format, client ID, etc.) must be confirmed
  before `buildApprentallSearchUrl()` can do anything beyond returning `null`. Until then, every
  Search submission shows the honest "booking connection pending" fallback.
- Additional pickup/drop-off locations beyond the one verified example — VERIFY.
- The "Rent It" click on the landing hero/fleet grid (an anchor link to `#book-now`) doesn't fire
  `rental_book_now_click` yet — would need converting those from plain server-rendered anchors to a
  small client component; deferred as a straightforward follow-up, not done this pass.
- Live click-driven QA of `RentalReservationForm`/the Toggle/Find Your Fleet — same pre-existing
  sandbox limitation documented throughout this project (broken HMR WebSocket blocks synthetic
  clicks from reaching React, confirmed again this pass). Verified via SSR content checks (`curl`),
  full-page screenshots at 375/390/768/1024/1440 (zero overflow, zero console errors across all 20
  route × width combinations), and code review instead. Recommend a manual click-through in a real
  browser before sign-off.
- `VehicleCard`'s rental-display props (`hidePrice`/`hideAvailabilityBadge`/`hideQuoteButton`/
  `specOrder`/`rentalQuoteHref`, added in an earlier pass) are no longer called by anything now that
  Find Your Fleet's results no longer reuse `VehicleCard`. Left in place (harmless, default-off,
  zero effect on VRP/Homepage) rather than touched again, in case a future "similar vehicles
  available to rent" cross-sell is wanted — flagged here rather than silently removed or silently
  left undocumented.

## Apprentall booking-engine correction pass (2026-09, fifth follow-up)

The previous pass's `RentalReservationForm` + `apprentall.config.ts` treated Apprentall's real
embed URL and query-parameter contract as an unverifiable gap, and showed a "booking connection
pending" fallback on every Search submission — correctly honest given what had been checked at the
time (`book.apprentall.cloud` only exposed a client-rendered loading shell to automated fetching),
but incomplete: the real contract was verifiable, just not from that app's own JS-rendered shell.

### What was actually verified this pass

`curl`-fetching `paradigmtruckrental.com`'s raw production HTML (not converting it to markdown,
which drops `<iframe>` tags) surfaced the real integration directly:

```html
<iframe id="reservation_iframe" style="width:100%;height:855px;border:0;..."
        src="https://book.apprentall.cloud/?clientid=1923">
```

Every "RENT IT" button on the real site is just `href="#reservation_iframe"` — a same-page anchor
scroll to this one iframe. There is no separate Paradigm-built reservation-search form on the real
site at all, and no search-state query string in the embed URL — `?clientid=1923` is the entire
contract. Apprentall's own app (rendered client-side once the iframe loads, which is why it only
showed a loading shell to a plain `curl`/fetch) supplies its own complete search UI and the rest of
the booking journey.

**Live-verified via Playwright against the real embed** (not assumed from the HTML alone):
- The iframe loads the real Apprentall app (confirmed via its `onLoad` firing and visual screenshot
  — not a blank frame, not blocked by `X-Frame-Options`).
- Apprentall's own client-side form validation runs correctly inside it ("Age is required" appeared
  after submitting without selecting an age — proof it's a live, interactive app, not a static
  shell).
- Submitting a completed search successfully advanced to Apprentall's own "Select Vehicle" stage,
  showing real live fleet inventory: photos, per-day pricing, and category names that match this
  project's verified `RENTAL_FLEET_CATEGORIES` exactly (Refrigerated Van, 16FT Cube Van, Dump Truck,
  HD Truck, Mid Roof Cargo Van, High Roof Cargo Van, 1/2 Ton Pickup Truck).
- Apprentall's own stepper UI at the top of that screen enumerates the full downstream journey:
  **Select Vehicle → Select Vehicle → Extras → Insurance → Terms → Info → Checkout** — confirming
  the later stages (customer/driver info, license verification, insurance, terms, payment/checkout)
  are real steps inside the same live app, not something this codebase needs to (or should) rebuild.

**Not verified click-by-click:** continuing past Select Vehicle into Extras/Insurance/Terms/
Info/Checkout. Repeated attempts hit this environment's pre-existing broken-interactivity
limitation (documented throughout this project — a broken HMR WebSocket starves the page's event
loop), here observed against the live cross-origin Apprentall app specifically; further attempts
were deliberately not pushed past that point to avoid repeatedly submitting automated test
searches against the client's live production booking system. Payment, insurance, and license/
driver-verification field names were not (and should not be) transcribed into this codebase —
they render entirely inside Apprentall's own iframe.

### What changed

- `src/features/rental/config/apprentall.config.ts` — rewritten. `APPRENTALL_BASE_URL` +
  `buildApprentallSearchUrl()` (which always returned `null`) replaced with a single
  `APPRENTALL_EMBED_URL` constant (`https://book.apprentall.cloud/?clientid=1923`) and
  `isApprentallConfigured()`. No query-string builder exists anymore — there's nothing to build,
  since Apprentall's own UI owns the search form.
- `src/config/environment.ts` / `.env.example` — `apprentallUrl`/`apprentallClientId` now default to
  the verified real values (`https://book.apprentall.cloud` / `1923`) instead of empty strings, so
  local dev matches production without a `.env.local`. Both are public/non-secret (they're in the
  real site's own page source) and overridable per-environment if a second client/location is added.
- `src/features/rental/components/RentalReservationForm.tsx` — **deleted**, along with
  `validateReservationSearch.ts` and the now-unused `ReservationSearchState`/`Errors`/`Status` types
  and `RESERVATION_LOCATIONS`/`RESERVATION_AGE_OPTIONS`/`EMPTY_RESERVATION_SEARCH` config. The
  9-field form (location/dropoff/dates/times/age/promo → local validation → guessed redirect) doesn't
  exist on the real site and isn't how the real integration works.
- `src/components/ui/Toggle/` — **deleted**. It existed only for the reservation form's "Different
  Drop-off Location" switch; Apprentall's own iframe now owns that field, so nothing in this
  codebase uses `Toggle` anymore.
- `src/features/rental/components/RentalBookingEmbed.tsx` (new) — replaces `RentalReservationForm`
  at `/rentals#book-now`. Renders the verified iframe (`id="reservation_iframe"`, 855px height
  matching production) with a lightweight "Loading booking system…" state until `onLoad` fires, a
  "Trouble loading? Open booking in a new tab →" link as a light-touch resilience aid, and a
  defensive "booking connection unavailable" `FeedbackCard` (call us / Request a Callback) that
  renders only if `isApprentallConfigured()` is false or the iframe reports a load error — not the
  default state.
- `src/features/rental/components/RentalBookNowLink.tsx` (new) — thin client wrapper so the
  server-rendered "Rent It"/"Book Now" anchors (landing hero, `RentalFleetGrid` cards) can fire
  `rental_book_now_click` without converting those sections into client components. Closes the
  "not yet wired" gap flagged in the previous pass.
- `src/features/rental/components/RentalFinderResults.tsx` — its "Rent It →" `Link` to
  `/rentals#book-now` now also fires `rental_book_now_click` (was previously untracked here too).
- `src/features/analytics/services/tracking.service.ts` — removed
  `rental_reservation_search_start/success/error` (no local search/submit step exists to instrument
  anymore — Apprentall's own search form isn't observable from this codebase). Kept
  `rental_external_booking_redirect`, now fired once when the embed mounts successfully (the handoff
  now happens automatically as the page loads, not on a redirect-button click).
- `src/features/rental/types/rental.types.ts` — `ReservationSearchState`/`Errors`/`Status` replaced
  with a single `BookingEmbedStatus = "loading" | "ready" | "error"` for the embed's own load state.
- `design.md` §7 — rewritten to describe the verified iframe embed in place of the guessed
  query-string handoff.

### Remaining gaps — honest, not silently dropped

- Continuing past Apprentall's own "Select Vehicle" stage (Extras/Insurance/Terms/Info/Checkout)
  was not click-verified end-to-end in this session, for the reasons above. There is no local
  Paradigm-built stand-in for any of these stages to worry about diverging from Apprentall's real
  ones — the visitor stays inside the same live app throughout. End-to-end submission of a real
  booking (including payment) was deliberately not attempted — this session verifies structure and
  reachability, not that a real reservation should be created against the client's live production
  system.
- Additional pickup/drop-off locations beyond "Stoney Creek — 339 Dosco Drive" are whatever
  Apprentall's own location selector offers; not enumerated here since they render entirely inside
  the embed and aren't part of this codebase's data.
- The iframe's `onError` handler is wired but unlikely to reliably fire for every real-world failure
  mode (e.g. a silent `X-Frame-Options`/CSP block on Apprentall's side wouldn't necessarily dispatch
  a JS `error` event in every browser) — `isApprentallConfigured()` remains the primary defensive
  gate; `onError` is a best-effort secondary.

## Native booking flow pass (2026-09, sixth follow-up — supersedes the iframe-embed pass above)

The client's direction for the redesigned site: Apprentall is a **reference for the real booking
information architecture**, not the final user-facing UI. The visitor must never leave the Paradigm
Fleet look/feel — the entire journey (vehicle → extras → insurance → terms → customer/driver →
license → payment → review → confirmation) now renders inside this project's own design system.
`RentalBookingEmbed` (the iframe from the previous pass) is deleted.

### What changed

**New:**
- `src/features/rental/types/booking.types.ts` — `RentalBookingState`, `RentalFleetVehicle`,
  `RentalAddOn`, `RentalDriver`, `BookingStepId`, `BookingStepErrors`.
- `src/features/rental/config/booking.config.ts` — `BOOKING_STEPS` (the 10-step metadata),
  `RENTAL_FLEET_VEHICLES` (the real fleet catalog — see "Real photography" below),
  `BOOKING_LOCATIONS`/`BOOKING_AGE_OPTIONS`, `createEmptyBookingState()`.
- `src/features/rental/store/rentalBooking.store.ts` — `useRentalBookingStore`, a **non-persisted**
  Zustand store (deliberately — a booking flow carries PII and, transiently in `StepPayment`'s own
  local state only, payment input, so it must not silently survive across browser sessions on a
  shared machine, unlike `store/index.ts`'s persisted favorites/recently-viewed slices).
- `src/features/rental/services/rentalAvailability.service.ts` — `getVehicles()` (the real catalog),
  `getExtras()`/`getInsuranceOptions()` (empty — no real catalog was ever verified for either).
- `src/features/rental/services/rentalPricing.service.ts` — `calculatePrice()`, always
  `"pending_confirmation"` (no live rate feed connected; a price observed once during a session is a
  snapshot of a variable rate table, not a stable fact — freezing it into static content would itself
  become a stale/fabricated price over time).
- `src/features/rental/services/rentalPayment.service.ts` — `processPayment()`, always
  `"not_configured"`. No payment provider connected; this is the one real call site a provider SDK
  would replace later.
- `src/features/rental/services/rentalBooking.service.ts` — `createBooking()`, submits the complete
  structured booking through the existing, real, working lead pipeline (`submitRentalQuote` →
  `/api/rental-quote` → `createSalesforceLead`) rather than fabricating a booking-confirmation
  response — see "Confirmation is real" below.
- `src/features/rental/lib/validateBooking.ts` — per-step validators (`validateDetailsStep`,
  `validateTermsStep`, `validateLicenseStep`).
- `src/features/rental/components/RentalVehicleCard.tsx` — the one rental vehicle card component,
  used by both "Our Rental Fleet" and Find Your Fleet's result (spec: "reuse it, don't create a
  second visual card system"). "Rent It" opens the booking dialog directly — no navigation.
- `src/features/rental/components/booking/` — `RentalBookingDialog` (the shell — `Dialog` primitive,
  `variant="center"` on `sm:` and up, `variant="fullscreen"` on mobile, via `useMediaQuery`),
  `BookingStepper` (compact "Step X of 10" bar on mobile, full circle stepper on `sm:` and up),
  `BookingStepFooter` (shared Back/Continue), and `steps/StepVehicle.tsx` /
  `StepDetails.tsx` / `StepExtras.tsx` / `StepInsurance.tsx` / `StepTerms.tsx` / `StepCustomer.tsx` /
  `StepLicense.tsx` / `StepPayment.tsx` / `StepReview.tsx` / `StepConfirmation.tsx`.
- `public/images/rental/*.jpg` (7 files) — real fleet photography, see below.
- New icons in `Icons.tsx`: `CustomerIcon`, `PaymentIcon`, `LockIcon`, `LicenseIcon`, `ExtrasIcon`,
  `ReviewIcon` (all via the existing `icon()` wrapper — no new icon system).

**Modified:**
- `src/components/common/Providers/Providers.tsx` — mounts `<RentalBookingDialog />` once, globally,
  alongside `QuickQuoteModal`/`SearchOverlay` (the project's existing global-overlay pattern).
- `src/app/(website)/rentals/page.tsx` — rewritten: Hero (CTAs removed) → Our Rental Fleet (moved
  directly under the hero) → secondary Find Your Fleet link (end of fleet section) → "Built for
  Business" → Final CTA. No more `#book-now` anchor/section.
- `src/features/rental/components/RentalFleetGrid.tsx` — rewritten to render `RentalVehicleCard`s
  from `RENTAL_FLEET_VEHICLES` (was icon-only category cards with a scroll-to-`#book-now` link).
- `src/features/rental/components/RentalFinderClient.tsx` — shortened from 4 steps to 3 (dropped
  "Timing & Contact" — the booking flow now collects both, once).
- `src/features/rental/components/RentalFinderResults.tsx` — rewritten to show the matched
  `RentalVehicleCard` (was a plain category-confirmation card with its own "Rent It"/"View Full
  Fleet" links).
- `src/features/rental/components/RentalFinderStepper.tsx` / `RentalFinderStepVehicleType.tsx` —
  3-step stepper; Step 1 now shows real fleet photos instead of a generic vehicle icon.
- `src/app/(website)/rentals/quote/page.tsx` — doc-comment updated to describe its new fallback
  trigger (`StepPayment`, not the deleted `RentalReservationForm`).
- `src/features/rental/config/rental.config.ts` — added `RENTAL_BUSINESS_HIGHLIGHTS` (4 more
  verified propositions — short-term/long-term rental, commercial/business focus, custom upfitting —
  for the landing page's "Built for Business" section, distinct from the hero's 3-point strip).
- `src/features/rental/types/rental.types.ts` — `RentalFinderStep` narrowed to 3 values;
  `RentalFinderVehicle.notes` removed (unused once "Timing & Contact" was dropped);
  `BookingEmbedStatus` removed (the embed it described no longer exists).
- `src/features/rental/config/apprentall.config.ts` — kept, docstring updated: no longer consumed by
  any UI, retained purely as a documented reference (the verified embed URL/client ID) for whoever
  eventually wires a real backend Apprentall API integration.
- `src/features/analytics/services/tracking.service.ts` — replaced the iframe-era events
  (`rental_book_now_click`, `rental_external_booking_redirect`, the reservation-search-specific
  ones) with booking-flow events: `rental_fleet_view`, `rental_vehicle_selected`,
  `rental_booking_flow_open`, `rental_booking_step_viewed`, `rental_booking_step_completed`,
  `rental_payment_started`, `rental_booking_success`, `rental_booking_error`.
- `src/services/api/client.ts` — **real, pre-existing bug fixed** (see below).
- `design.md` §7 — rewritten for the native flow architecture.

**Deleted:** `RentalBookingEmbed.tsx`, `RentalBookNowLink.tsx`, `RentalFinderStepDetails.tsx`.

### Real photography, not generic icons

The 7 real fleet category photos were extracted directly from the client's own live Apprentall
booking engine this session: loaded `https://paradigmtruckrental.com/fleet/` (which itself just
embeds the same Apprentall iframe), drove a real search through it with Playwright (cross-origin
frame automation, not `page.evaluate` — the latter is blocked by same-origin policy), and read the
resulting `<img src>` values directly from the live results DOM. All 7 resolved to
`rentallstorageprd.blob.core.windows.net/vehicletypes/1923/…` (Apprentall/Rentall's own asset CDN,
keyed to the client's own ID 1923) and were downloaded to `public/images/rental/` — genuine Paradigm
Fleet photography (several have visible "PARADIGM" branding, the real Stoney Creek address, and a
"paradigmfleet.ca" plate frame baked into the photo). Category-to-photo mapping is index-based (both
were read from the same single page load, same order) and self-confirmed by filename for at least 3
of 7 (`MID ROOF.jpg`, `Ram Promaster Cargo Van.jpg`, `Chevrolet Silverado Work Truck.jpg` match their
categories' own "Similar to" descriptors). Per this project's "all images live under
`public/images/`" convention (no remote image hosts configured for `next/image`), these are hosted
locally, not hotlinked.

### Confirmation is real, honestly scoped

There is no live Apprentall reservation-creation API available to this codebase, and the brief
explicitly forbids fabricating one. `createBooking()` instead submits the complete structured
booking through the existing, real `/api/rental-quote` → `createSalesforceLead` pipeline (same one
`RentalQuoteClient` already used) — the Confirmation screen's reference number is the real id that
endpoint returns (`mock-<timestamp>` in local/mock mode, a real Salesforce lead id once
`SALESFORCE_INSTANCE_URL`/`SALESFORCE_ACCESS_TOKEN` are configured), never fabricated. This is
honestly framed as a **booking request** ("Our rental team will confirm your reservation and follow
up to collect payment"), not a live paid Apprentall reservation.

### A real, pre-existing bug found and fixed during QA

Driving the full 10-step flow with Playwright (not just screenshotting — filling every field,
clicking every Continue, submitting Review) surfaced a real defect unrelated to anything invented
this pass: `services/api/client.ts`'s `request()` cast the raw `/api/*` response body directly as the
generic `data` payload, but every route handler actually responds with an `{ success, data }`
envelope (`ApiSuccessResponse<T>`, declared in `api.types.ts`). So `response.data` was really the
whole envelope object, and `response.data.id` was silently `undefined` — everywhere in the codebase
this pattern is used, not just rental (`TradeInClient.tsx`'s own reference-id display had the exact
same latent bug). Invisible in casual review because success UI only checked `response.ok`/truthiness
before rendering an id, never asserted the id was actually present. Fixed once, at the shared call
site; re-verified via a live end-to-end run that Confirmation now shows a real reference number, and
checked every other `apiClient` consumer (`ContactForm`, `QuickQuoteModal`) to confirm none of them
depended on the broken behavior.

### Live-verified this pass (Playwright, real interaction — not assumed)

- Clicking "Rent It" on any fleet card opens `RentalBookingDialog` with that vehicle preselected.
- Filled every field across all 10 steps and clicked through to Confirmation; the real
  `POST /api/rental-quote` request body was captured and contains the complete, correct structured
  payload (contact, vehicle, pickup/return, terms/license acknowledgement, extras/insurance state,
  payment status) — not a fabricated or partial one.
- Extras/Insurance steps correctly show the honest "not available online yet" notice rather than
  fabricated products.
- Payment step: filling card fields and clicking "Complete Payment" correctly shows "Online payment
  isn't connected yet — your card has not been charged," never a fake success.
- Escape closes the dialog; focus returns to the exact "Rent It" button that opened it;
  `aria-modal="true"`/`aria-labelledby` verified present; focus moves into the dialog on open.
- 15/15 route×width combinations (`/rentals`, `/rentals/find-your-fleet`, `/rentals/quote` ×
  375/390/768/1024/1440) — zero horizontal overflow, zero console errors.
- Mobile (375px) booking dialog renders full-screen with a compact "Step X of 10" progress bar, not
  the desktop panel shrunk down; 2-column real-photo vehicle grid, no overflow.

### Remaining gaps — honest, not silently dropped

- **Payment**: no provider connected. UI is complete and production-quality; `processPayment()` is
  the one real integration point once a provider (Stripe, etc.) is approved.
- **Extras/Insurance**: no verified catalog. Steps are honest empty states, not invented products —
  `getExtras()`/`getInsuranceOptions()` are the two functions to update once a real catalog exists.
- **Terms**: no approved legal copy verified. The step is fully functional (scroll, checkbox,
  validation) with a placeholder notice in place of real terms text.
- **License/Verification**: exact required fields (license #, province, expiry, accepted formats)
  were never verified — this step is an acknowledgement, not fabricated compliance field capture.
- **Apprentall/real payment integration**: `apprentall.config.ts` remains as a documented reference
  (verified embed URL + client ID) for whoever eventually connects a real backend integration —
  nothing in the current UI calls it.

## Full-page rebuild pass (2026-09, seventh follow-up — supersedes the modal-dialog pass above)

The previous pass built a real, working native booking **modal** (`RentalBookingDialog`). The
client's clarified direction: the booking process is a full page, not an overlay, and the experience
splits into three distinct page-level stops — Landing, Search/Reservation, and the Booking Process
itself — never a modal, popup, or bottom-of-page form.

### What changed

**Deleted:** `RentalBookingDialog.tsx` (the modal shell), the old page-level `BookingStepper.tsx`
(rebuilt for 5 positions instead of 10), and every step component under the old
`components/booking/steps/` (`StepVehicle`, `StepDetails`, `StepExtras`, `StepInsurance`, `StepTerms`,
`StepCustomer`, `StepLicense`, `StepReview`, `StepConfirmation`, and the old `StepPayment`) —
superseded by the new pages/steps below. Removed the dialog's mount from `Providers.tsx` (nothing is
mounted globally anymore; each route renders its own content).

**New pages:**
- `src/app/(website)/rentals/search/page.tsx` + `RentalSearchForm.tsx` — the Reservation Search,
  now a dedicated page instead of a step inside a modal.
- `src/app/(website)/rentals/search/results/page.tsx` + `RentalSearchResults.tsx` — vehicle results,
  category-filtered, redirect-guarded against a direct/refreshed visit.
- `src/app/(website)/rentals/book/page.tsx` + `RentalBookingClient.tsx` — the booking process (4
  in-page steps: Add-ons, Coverage, Information, Payment), redirect-guarded against no selected
  vehicle.
- `src/app/(website)/rentals/confirmation/page.tsx` + `BookingConfirmationView.tsx` — its own route,
  redirect-guarded against no recorded success.

**New components:** `RentalCategoryTile.tsx` (the new "Rental Vehicle Categories" section — compact
tiles over the same real catalog `RentalVehicleCard` uses, not a second taxonomy);
`booking/BookingSummarySidebar.tsx` (the running "Rental Details / Location & Date / Vehicle / Rate /
Extras / Coverage / Taxes & Fees / Estimated Total / Total Charge" summary — sticky on desktop, an
`AccordionItem` on mobile; doubles as this flow's "review," so there's no separate Review step);
`booking/DocumentUploadField.tsx` (click/drag-drop, local preview via `URL.createObjectURL`, remove/
replace — used 4 times in `StepInformation` for license + insurance-card front/back);
`booking/steps/StepAddons.tsx`/`StepCoverage.tsx` (renamed from Extras/Insurance to match this pass's
terminology exactly); `booking/steps/StepInformation.tsx` (Contact Info → Driver's License Info →
Additional Driver (optional) → Personal Address → Driver License upload → Insurance Card upload,
matching the client-supplied screenshot's section order exactly); `booking/steps/StepPayment.tsx`
(rebuilt — card UI shell + Terms acceptance folded in, since the spec's 5-stage list has no separate
Terms step).

**`RentalVehicleCard.tsx` rebuilt around navigation, not a dialog:** `destination="search"` (default
— Landing/Find Your Fleet) sets the vehicle in the store and routes to `/rentals/search`;
`destination="book"` (Search Results only) routes straight to `/rentals/book` since Search already
ran. Neither ever opens a modal.

**Types/store/services extended** for the new data the Information step needs — `booking.types.ts`
gained `RentalCategory`, `RentalContactInfo` (Contact Info section, distinct from the shared
`RentalContact` used elsewhere), `RentalPrimaryLicense`, `RentalAdditionalDriver`,
`RentalPersonalAddress`, `RentalDocumentSlot`/`RentalDocuments`; `rentalBooking.store.ts` gained
matching actions (`updateContact`, `updatePrimaryLicense`, `setAdditionalDriverEnabled`,
`updateAdditionalDriver`, `updateAddress`, `setDocument` — which revokes the previous object URL
before creating a new one, so selecting a replacement file doesn't leak blob URLs) and dropped the
dialog-only `isOpen`/`openBooking`/`closeBooking` in favor of `selectedCategory`/`searchSubmitted`
plumbing a multi-page flow needs. `rentalAvailability.service.ts`'s `getVehicles()` now accepts an
optional category filter; `getExtras`/`getInsuranceOptions` renamed to `getAddons`/
`getCoverageOptions`. New `rentalDocument.service.ts` — the one real call site a future upload
provider would replace; today it only ever resolves `"not_configured"`, exactly like
`rentalPayment.service.ts`.

**Analytics events replaced** to match this pass's exact list: `rental_category_click`,
`rental_vehicle_click`, `rental_search_start/success/error`, `rental_vehicle_selected`,
`rental_addon_selected`, `rental_coverage_selected`, `rental_info_completed`,
`rental_payment_started/success/failure`, `rental_booking_completed`, `rental_finder_started`,
`rental_finder_completed` — dropped the previous pass's dialog-specific events
(`rental_booking_flow_open/step_viewed/step_completed`, `rental_booking_success/error`) since the
concepts they tracked (a dialog opening, a step being "viewed" in place) no longer apply to a
multi-page flow.

### Why a category and a vehicle share one id space

The client's verified fleet data has exactly one representative vehicle per category (7 categories,
7 vehicles) — there's no real multi-unit-per-category inventory to filter. Rather than invent a
second taxonomy for "categories" distinct from "vehicles," `RentalCategory` is a `Pick` of
`RentalFleetVehicle`'s display fields, and a category's `slug` IS the matching vehicle's `slug`.
Clicking a category tile and clicking a vehicle's "Rent It" both ultimately set the same
`selectedVehicle`/`selectedCategory` pair — the only difference is which page they land on next
(Search vs. straight to Search, both preserving context identically).

### Live-verified this pass (Playwright, driving the real UI — not assumed)

- Landing → clicked a vehicle's "Rent It" → landed on `/rentals/search` with that vehicle shown as
  context.
- Filled the Reservation Search form, clicked Search → landed on `/rentals/search/results`, which
  correctly showed exactly the one matching vehicle (category preserved end-to-end).
- Clicked "Rent It" on that result → landed directly on `/rentals/book` (no second Search).
- Drove all 4 in-page steps: Add-ons (honest empty state) → Coverage (honest empty state) →
  Information (filled every field across Contact/License/Address, **uploaded real test files** to
  both required Driver License slots, confirmed via screenshot that filenames/previews render) →
  Payment (filled the card shell, clicked "Complete Payment," confirmed the honest "not connected"
  state, checked Terms, clicked "Continue Without Paying Online").
- The real `POST /api/rental-quote` request body was captured and inspected — complete and correct:
  contact, vehicle, pickup/return, add-ons/coverage state, primary license, address, additional-driver
  state, attached document filenames, terms acknowledgement, and an honest payment note.
- Landed on `/rentals/confirmation` with a real reference number (`mock-<timestamp>` in local/mock
  mode) and the full booking summary.
- Verified all three guard redirects live: `/rentals/search/results`, `/rentals/book` and
  `/rentals/confirmation`, visited directly with no prior state, each redirect back correctly instead
  of rendering broken/fake content.
- Verified a category tile click (`/rentals` → "HD Truck" category) preserves context through Search
  and Results, which correctly showed exactly one filtered result: "HD Truck."
- 15/15 route×width combinations (`/rentals`, `/rentals/find-your-fleet`, `/rentals/quote` ×
  375/390/768/1024/1440) plus targeted mobile checks of `/rentals/search`, `/rentals/search/results`
  and `/rentals/book` at 375px — zero horizontal overflow, zero console errors, zero `<iframe>`
  elements, zero `[role=dialog]` elements anywhere in the rental flow.
- Mobile `/rentals/book` renders a compact "Step X of 5" bar (not the desktop 5-circle stepper
  shrunk down) and the summary as a collapsed accordion below the step content, not a giant block
  repeated under every section.

### Remaining gaps — honest, not silently dropped

- **Payment**: no provider connected — same gap as the previous pass, UI unchanged in substance.
- **Add-ons/Coverage**: no verified catalog — `getAddons()`/`getCoverageOptions()` are the two
  functions to update once one exists.
- **Terms**: no approved legal copy verified — placeholder notice, real mechanic.
- **License fields**: the Information step's 3 primary / 8 additional-driver fields match the
  client-supplied screenshot's own field labels exactly, but exact validation rules (format, accepted
  license types) weren't independently verified beyond "required."
- **Document uploads**: no real upload/storage backend — `rentalDocument.service.ts` documents the
  one call site a real provider would replace; today files stay local to the browser tab.
- **URL-shareable search results**: `/rentals/search/results` reads from the in-memory store rather
  than URL query parameters, so results aren't deep-linkable/bookmarkable in this pass — a reasonable
  future enhancement, not a hidden limitation (state is non-persisted by design; see `booking.types.ts`).

## Landing refinement + Partners + confirmation sound pass (2026-09, eighth follow-up)

A refinement pass on top of the full-page rebuild above — the route architecture, booking flow, and
step content are unchanged; this pass focused on the Landing page's structure/content and added one
new site-wide behavior (the confirmation sound). Explicitly **not** a redesign: every new section
reuses the existing design.md tokens, the existing card/CTA/benefit-strip visual language, and real
project content only.

### What changed

- **Hero now has real CTAs** — `RentalHero` gained optional `primaryAction`/`secondaryAction` props
  (`{label, href}`), used only by `/rentals`: "Book Now" → `/rentals/search`, "View Rental Fleet" →
  the `#rental-fleet` in-page anchor. Every other `RentalHero` call site (Search, Results, Book's
  vehicle-summary bar doesn't use it, Find Your Fleet, Quote) omits both props and renders exactly as
  before.
- **Hero benefit strip extended to 4 points** — added "Short- & long-term rentals" (`CalendarIcon`)
  as the 4th `RENTAL_VALUE_PROPS` entry, folding in a claim that used to live only in the lower
  "Built for Business" strip, so it isn't dropped by removing that strip.
- **New landing sections/components** (`src/features/rental/components/`): `RentalNotSureSection`
  ("Not Sure What You Need?", now its own section after the fleet grid rather than an inline link),
  `RentalWhyChoose` ("Why Choose Paradigm Truck Rental," 6 cards, replaces the old 4-point "Built for
  Business" `RENTAL_BUSINESS_HIGHLIGHTS` strip with the spec's exact verified copy), `RentalUpfitSection`
  ("More Than a Rental," links to the real existing `/services#upfitting`), `RentalEcosystemSection`
  ("Paradigm Fleet Ecosystem" — see Partners below), `RentalProcessSection` ("Rent Your Vehicle in
  Four Simple Steps," the real user-facing 4-step flow, not the internal booking-step names).
- **`ServicesGrid` generalized, not duplicated** — added optional `items`/`gridClassName` props
  (default unchanged: the homepage/Services page's own 4 service lines), so `RentalEcosystemSection`
  reuses the exact same card component with its own 5 items instead of a second near-identical grid.
  `ServiceGridItem` type exported from the barrel for this reuse.
- **Final CTA rewritten** to the spec's exact content — dark tone, "Ready to Get to Work?" / "Choose
  your vehicle, select your dates and get your rental moving." / Book Now + View Rental Fleet. The
  previous phone-call CTA ("Need a Rental Fast? Call…") was removed from this section — the rental
  team's phone number (`RENTAL_CONTACT`) is still real, verified, and still surfaced elsewhere (the
  Quote page, Find Your Fleet), just not duplicated here per the new spec's explicit two-CTA content.
- **Site-wide confirmation sound** (new): `confirmationSound.ts` + `ConfirmationSoundControl.tsx`,
  wired into `BookingConfirmationView`. See its own subsection below.
- Two icons added to `Icons.tsx`: `SpeakerIcon` (`Volume2`, confirmation sound control).

### Fixed alongside this pass (found during the same audit)

Two site-wide "click Rentals" paths that bypassed the dedicated rental flow entirely — not part of
the landing-page spec above, but the same class of bug it exists to prevent, found while auditing
every rental entry point:

- **Homepage `ServicesGrid`'s "Rentals" card** linked to `/services#rentals` (a plain anchor on the
  generic Services page) instead of the real rental flow. Fixed to link directly to `/rentals`.
- **Hero `FleetSearch`'s "Rent" tab** reused the sales-inventory `type`/`location` filters and
  `router.push`'d to `/vehicles?...` (the sales VRP/inventory listing) on submit — sending a rental
  search into the sales inventory page, and using the wrong taxonomy (sales vehicle types/locations,
  not the rental fleet's real categories/single verified location) to do it. Fixed: the Rent tab now
  sources its Vehicle Type options from `RENTAL_CATEGORIES` and Location from `BOOKING_LOCATIONS`,
  sets the chosen category into `useRentalBookingStore`, and routes to `/rentals/search` — the same
  Reservation Search every other "Rent It" entry point uses.
- Both fixes verified live with Playwright (`waitForURL`), not just read.

### Partners / Ecosystem section — audit result

Per the spec's explicit instruction to audit before building this section: searched
`public/images/logos/` (only `logo.png`/`logo-white.png` — Paradigm's own logo, no partner/
manufacturer/financing-partner assets) and every rental/vehicle config file in the project for any
verified partner name, logo reference, or documented partner relationship. **None exist.** Per the
spec's own explicit fallback for this exact case ("If partner information is NOT available: DO NOT
fabricate it. Instead, create a clean 'Paradigm Fleet Ecosystem' section..."), `RentalEcosystemSection`
shows Paradigm Fleet's real, verified internal business lines instead: Rentals, Sales, Leasing &
Financing, Upfitting, Service & Parts — each linking to its real existing route (`/rentals`,
`/vehicles`, `/services#leasing-financing`, `/services#upfitting`, `/contact`), matching the same
destinations already used by `footerServiceNav`/the homepage `ServicesGrid`. No invented logo, no
invented partner name, no invented relationship.

### Confirmation sound — how it works and why

`playConfirmationChime()` in `confirmationSound.ts` synthesizes the entire sound with the Web Audio
API (`AudioContext`/`OscillatorNode`/`GainNode`/`BiquadFilterNode`) rather than shipping an audio
file: a soft low "thunk" (a muted door/lock-style attack, sine wave 180→70Hz) under a two-note
triangle-wave "confirm" chirp (E5→A5) through a gentle low-pass filter, total length ~0.5s — well
under the spec's 3-second maximum, never loops. No sound reference file was provided (the spec is
explicit that none would be), and no licensed audio asset exists in the project; synthesizing avoids
inventing/sourcing a clip of uncertain licensing while trivially satisfying "lightweight" (zero bytes
shipped).

`ConfirmationSoundControl` mounts only inside `BookingConfirmationView`, gated by
`state.submission.status === "success"` — the exact same real-success condition that already guards
the whole confirmation page from direct/refreshed visits, so the sound can never fire on a failed
booking, a validation error, or a fabricated/mock confirmation state. On mount it makes one
best-effort autoplay attempt (skipped entirely when `prefers-reduced-motion` matches) and — regardless
of whether that attempt succeeded — always renders an accessible button ("Booking Confirmed — Play
Sound," relabeled "Play Confirmation Sound Again" once a play has happened) rather than trying to
detect autoplay-block failures and conditionally show a fallback; this is simpler and more robust
than autoplay-success heuristics, and satisfies the spec's "graceful fallback... accessible
confirmation control" requirement directly. A `firedRef` guard means the automatic attempt fires at
most once per mount, never on a re-render.

Verified live end-to-end: drove Landing → category Rent It → Search (filled every field) → Results →
Rent It → Add-ons → Coverage → Information (filled every field, uploaded license front/back) →
Payment (filled the card shell, "Complete Payment" → honest not-connected state → checked Terms →
"Continue Without Paying Online") → landed on `/rentals/confirmation` with a real reference number
and the sound control rendered and already showing "Play Confirmation Sound Again" (the automatic
attempt succeeded in this Playwright-driven Chromium context) — zero console errors throughout.

### QA — this pass

- `npx tsc --noEmit` — clean.
- `npx eslint src` — clean.
- `npm run build` — clean; all 7 rental routes still present in the route list.
- Live Playwright verification: landing section order/heading text matches spec exactly; Hero's Book
  Now/View Rental Fleet hrefs correct; zero `<iframe>`/`[role=dialog]` anywhere on `/rentals`; full
  booking journey through to a real confirmation (see above); the two "click Rentals" fixes confirmed
  via `waitForURL`.
- Responsive: 375/390/768/1024/1440 × `/rentals`, `/rentals/search`, `/rentals/find-your-fleet` —
  zero horizontal overflow at any width.
- `prefers-reduced-motion: reduce` context confirmed correctly detected by
  `confirmationSound.ts`'s `prefersReducedMotion()`.

### Remaining gaps — unchanged from the previous pass

Same list as above (Payment provider, Add-ons/Coverage catalog, Terms copy, license-field validation
rules, document-upload backend, URL-shareable results) — this pass did not touch booking-step
architecture or backend integration boundaries, only the Landing page's content/structure and the new
confirmation sound.
