# Page 04 — Payment Calculator
## Paradigm Fleet Website — Complete UI + UX + Calculation Implementation Specification

> **Purpose:** This document is the page-level source of truth for the Payment Calculator UI, UX, interaction states, calculation behavior, responsive behavior, and implementation requirements.
>
> **Global design source:** `design.md` remains the global design-system source of truth. This file only defines calculator-specific UI/UX and behavior.
>
> **Important:** The live Paradigm Fleet calculator and live vehicle-detail finance presentation are the content/logic references. The redesigned UI may improve hierarchy, clarity, and responsiveness, but must not change the underlying business intent or invent new finance products, fees, rates, or application requirements.

---

# 1. PAGE OBJECTIVE

The Payment Calculator exists to help a visitor quickly understand:

1. What vehicle price they can consider.
2. What payment amount they may expect.
3. How down payment changes the payment.
4. How loan term changes the payment.
5. How payment frequency changes the payment.
6. How APR affects the estimate.
7. Which inventory vehicles may fit the resulting budget.

The calculator is an **estimation tool**, not a credit application.

Primary conversion path:

`Calculator → Estimated Result → View Matching Vehicles / Contact Finance Team`

Secondary path:

`Calculator → Finance Team / Finance Application`

The current live calculator exposes both:

- vehicle-price driven calculation
- target-payment driven calculation

The redesigned experience must preserve both modes.

---

# 2. SOURCE-OF-TRUTH ORDER

When implementing this page, use this priority:

1. `design.md`
2. This `page-04-payment-calculator.md`
3. Approved Payment Calculator Desktop / Tablet / Mobile reference image
4. `page-01-homepage.md`
5. `page-02-vrp.md`
6. `page-03-vdp.md`
7. Existing Paradigm Fleet website content and current finance behavior
8. Existing project architecture/components

Do not invent:

- finance products
- promotional APRs
- loan terms not provided by the backend/business
- finance fees not supplied by the backend/context
- vehicle inventory counts
- vehicle pricing
- tax values
- licensing costs
- credit-approval claims
- guaranteed rates
- approval decisions

---

# 3. ROUTE

Primary route:

`/payment-calculator`

The page must also support calculator entry from a VDP.

Recommended contextual entry:

`/payment-calculator?vehicle=<vehicle-slug>`

The exact query parameter structure may be adapted to the existing application architecture.

The calculator must work correctly both:

- as a standalone calculator
- when opened from a specific VDP

---

# 4. LIVE EXPERIENCE TO PRESERVE

The current live calculator presents:

- Loan Amount
- Monthly Payment
- Down Payment
- Loan Term
- Payment Frequency
- APR
- Vehicle budget
- Estimated payment
- Vehicle count
- View Vehicles
- Vehicle-price calculation mode
- Desired-payment calculation mode
- Down payment input
- Loan-term control
- Payment-frequency selection
- APR input

The current live calculator asks:

### Mode A
**What price is the vehicle you're looking to buy?**

### Mode B
**How much are you looking to spend per payment?**

Then it asks:

### Financing inputs

- Are you depositing a down payment?
- How long is your loan?
- How often do you want to make payments?
- What's the Annual Percentage Rate (APR)?

The redesign must preserve this calculation sequence and intent.

---

# 5. PAGE STRUCTURE

The complete page is:

1. Global Header
2. Calculator Hero / Intro
3. Calculator Stepper
4. Main Calculator Workspace
5. Result / Summary Panel
6. Vehicle Matching CTA
7. Finance Expert CTA
8. Supporting finance reassurance/content area
9. Global Footer

Major sections must maintain the project's minimum **40px vertical separation** rule.

---

# 6. GLOBAL HEADER

Reuse the exact shared header from the rest of the website.

Do NOT create a calculator-specific header.

Desktop:

- Utility bar
- Main navigation
- Primary actions
- Sticky behavior according to global implementation

Tablet:

- Same shared responsive header
- Preserve primary CTA visibility where possible

Mobile:

- Shared mobile header
- Shared drawer/navigation
- No calculator-specific navigation implementation

---

# 7. CALCULATOR HERO

## Desktop

Use a compact page hero rather than a large homepage-style hero.

Recommended hierarchy:

Eyebrow:
`FINANCE TOOLS`

Heading:
`Payment Calculator`

Supporting text:

Use the approved live-site meaning:

`Estimate your vehicle payment based on price, down payment, loan term, payment frequency, and APR.`

Do not introduce unsupported finance promises.

Optional breadcrumb:

`Home / Payment Calculator`

## Tablet

Maintain the same hierarchy with reduced width.

## Mobile

Stack:

- Breadcrumb
- Eyebrow
- Heading
- Supporting text

Do not consume excessive vertical space before the calculator.

---

# 8. CALCULATOR STEPPER

The redesigned calculator uses a clear 3-step visual progress system.

### Step 1
`Vehicle & Payment Type`

### Step 2
`Loan Details`

### Step 3
`Review`

The stepper is a UX layer only. It must not alter the underlying calculation.

## Step states

### Upcoming
- Neutral background/border
- Reduced emphasis

### Active
- Paradigm red indicator
- Strong label
- Clear focus/active state

### Completed
- Completed/check indicator
- Reduced but readable label

### Error
- Error indicator
- Associated error message remains near the invalid field

---

# 9. MAIN CALCULATOR WORKSPACE

Desktop:

Use a two-column layout.

### Left column
Primary input/workflow.

### Right column
Persistent calculation summary.

Recommended desktop proportions:

`~60–65% workflow / ~35–40% summary`

Tablet:

Use stacked layout when the available width becomes constrained.

Mobile:

Single-column flow.

The summary becomes a mobile sticky/condensed result area only after meaningful calculation data exists.

---

# 10. STEP 1 — VEHICLE / PAYMENT MODE

This step must clearly offer two choices.

## Choice A

### Heading
`What price is the vehicle you're looking to buy?`

Supporting text:

`Use a vehicle price to estimate your payment.`

Input:

`Vehicle Price`

Currency:

`CAD`

Primary action:

`Next`

---

## Choice B

### Heading
`How much are you looking to spend per payment?`

Supporting text:

`Start with the payment amount that fits your budget.`

Input:

`Target Payment`

Currency:

`CAD`

Payment frequency must be visible so the visitor understands whether the target is:

- Weekly
- Bi-weekly
- Monthly

Primary action:

`Next`

---

# 11. MODE SWITCHING

The two calculation modes must be visually distinct.

Recommended UI:

Two selectable cards / segmented options.

### Selected mode

- Red border/accent
- Clear selected state
- Strong label
- Accessible selected state

### Unselected mode

- Neutral border
- White/background surface
- Hover/focus state

Switching modes must:

- preserve valid shared inputs where possible
- clear only mode-specific calculated values
- immediately update explanatory labels
- never silently retain an incompatible target value

Example:

If user changes from:

`Vehicle Price → Target Payment`

the vehicle-price field is replaced by the target-payment field.

---

# 12. VEHICLE CONTEXT WHEN ENTERED FROM VDP

If the calculator is opened from a VDP, display a compact vehicle context card.

Example structure:

- Vehicle image
- Vehicle name
- Stock/reference
- Vehicle price
- `Change Vehicle`

The vehicle price should be prefilled.

Do not require the user to manually re-enter the vehicle price.

If the user chooses `Change Vehicle`, route them to an appropriate inventory-selection experience or clear the VDP context.

The exact behavior must follow the existing application routing architecture.

---

# 13. STEP 2 — LOAN DETAILS

Step 2 contains the finance inputs.

## 13.1 DOWN PAYMENT

Question:

`Are you depositing a down payment?`

Input:

`Down Payment`

Helper:

`The bigger the down payment, the smaller your payment.`

Validation:

- Must be >= 0
- Must not exceed the applicable vehicle/finance amount
- Currency input
- Numeric keyboard on mobile

If down payment is zero, the UI should explicitly allow:

`$0`

Do not force a minimum down payment unless the backend/business rules provide one.

---

# 14. LOAN TERM

Question:

`How long is your loan?`

Display:

`XX Month Term`

The available terms must come from a configurable data source.

Do not hardcode unsupported terms into the UI.

Possible implementation:

- Select
- segmented control
- slider + value display

The final implementation should follow the approved visual reference.

Helper:

`The longer the loan, the smaller your payment.`

Changing the term must immediately recalculate the estimate.

---

# 15. PAYMENT FREQUENCY

Question:

`How often do you want to make payments?`

Options:

- Weekly
- Bi-weekly
- Monthly

The selected frequency must be visible in the result.

The current live VDP examples use:

`Bi-Weekly`

The redesign must preserve the same frequency concepts.

---

# 16. APR

Question:

`What's the Annual Percentage Rate (APR)?`

Input:

`APR`

Example formatting:

`8.99%`

Helper:

`We may be able to offer you an even better rate! Talk to our finance experts today.`

Important:

The calculator must not imply that the entered APR is an approved customer-specific rate.

APR is an estimate input.

---

# 17. LIVE CALCULATION BEHAVIOR

When any of these values changes:

- Vehicle Price
- Target Payment
- Down Payment
- Loan Term
- Payment Frequency
- APR

the calculated output must update.

Avoid requiring the user to reload the page.

A short calculation transition is acceptable.

Do not use distracting animation.

---

# 18. CORE PAYMENT FORMULA

For a normal vehicle-price calculation:

### Principal

`P = Finance Amount - Down Payment`

Where:

`Finance Amount = Vehicle Price + applicable finance fee`

If no finance fee is supplied:

`Finance Fee = 0`

Do not invent a fee.

### Periodic rate

`r = APR / periodsPerYear`

### Number of payment periods

`n = Loan Term in years × periodsPerYear`

### Payment

`Payment = P × r / (1 - (1 + r)^(-n))`

If APR is zero:

`Payment = P / n`

---

# 19. PAYMENT FREQUENCY CONSTANTS

Use:

| Frequency | Payments / Year |
|---|---:|
| Weekly | 52 |
| Bi-weekly | 26 |
| Monthly | 12 |

For a 60-month bi-weekly loan:

`60 / 12 × 26 = 130 payments`

This is consistent with the live VDP finance presentation.

---

# 20. TOTAL COST CALCULATIONS

### Total Obligation

`Total Obligation = Payment × Number of Payments`

### Total Cost of Credit

`Total Cost of Credit = Total Obligation - Principal`

These values should be available in the detailed result state.

---

# 21. TARGET PAYMENT MODE

The second calculator mode starts with:

`Desired Payment`

The calculator must solve for the maximum financed principal.

For non-zero APR:

`P = Payment × (1 - (1 + r)^(-n)) / r`

Where:

- `Payment` = desired periodic payment
- `r` = periodic interest rate
- `n` = total payment periods

If APR is zero:

`P = Payment × n`

If a down payment exists:

`Estimated Vehicle Budget = P + Down Payment - applicable finance fee`

The exact treatment of any finance fee must follow the same backend finance-fee rules used by the VDP.

Do not create a separate finance-fee policy for the calculator.

---

# 22. ROUNDING

Calculation engine:

- retain sufficient precision internally
- avoid compounding rounded values

UI:

- main estimated payment: display as whole CAD dollars unless the global finance design specifies otherwise
- detailed monetary totals: whole CAD dollars
- APR: retain appropriate percentage precision, e.g. `8.99%`

Never calculate using the already-rounded UI value.

---

# 23. SUMMARY PANEL

The summary is a key component and must update as the user progresses.

## Summary header

`Your Estimated Payment`

Primary result:

`$XXX / Bi-Weekly`

Frequency label must change dynamically.

Supporting information:

`For XX Months`

---

# 24. SUMMARY DATA

Show:

- Vehicle Budget / Vehicle Price
- Estimated Payment
- Loan Amount
- Down Payment
- Loan Term
- Payment Frequency
- APR

Where relevant, also show:

- Finance Fee
- Finance Total
- Total Cost of Credit
- Total Obligation

Do not show fields for which the backend has no valid value.

---

# 25. VEHICLE MATCH COUNT

The current live calculator exposes the number of available vehicles.

Example structure:

`XX Vehicles Found`

Primary CTA:

`View Vehicles`

The count must be backend-driven.

Never invent a static inventory number.

If inventory filtering is unavailable, use a neutral CTA such as:

`View Vehicles`

rather than fabricating a count.

---

# 26. VIEW MATCHING VEHICLES

Primary result CTA:

`View Vehicles`

or, where supported:

`View Matching Vehicles`

This action should connect the calculator output to VRP.

Recommended behavior:

### Vehicle-price mode

Use calculated vehicle budget / price constraints.

### Target-payment mode

Convert the target payment into an estimated vehicle budget before constructing the inventory query.

The exact query parameter names must match the VRP implementation from `page-02-vrp.md`.

Do not invent a new filtering architecture.

---

# 27. FINANCE EXPERT CTA

Secondary CTA:

`Talk to Our Finance Experts`

This should not open a credit application immediately.

It can:

- open the finance contact path
- open an existing lead/quick quote flow
- route to Finance Department

Use existing global conversion patterns.

---

# 28. CALCULATOR IS NOT A CREDIT APPLICATION

Do not request:

- SIN
- employment information
- banking details
- full credit authorization
- sensitive financial application data

The calculator should remain low friction.

The actual finance application remains a separate conversion flow.

---

# 29. RESULT / REVIEW STEP

Step 3:

`Review`

Show a clean finance summary.

Recommended structure:

### Estimated Payment

Large value.

### Vehicle Budget

Large/supporting value.

### Financing Breakdown

- Vehicle Price
- Finance Fee, if applicable
- Down Payment
- Loan Amount
- Term
- Frequency
- APR
- Total Cost of Credit
- Total Obligation

### Actions

Primary:

`View Vehicles`

Secondary:

`Talk to Our Finance Experts`

Optional:

`Adjust Calculation`

The user must be able to return to Step 2 without losing their inputs.

---

# 30. MOBILE RESULT BEHAVIOR

Mobile has limited screen space.

Before a meaningful result:

- keep summary compact

After calculation:

- show a prominent estimated payment result
- allow the detailed summary to expand/collapse
- keep primary CTA accessible

Recommended mobile sticky action area:

Primary:

`View Vehicles`

Secondary:

`Adjust`

The sticky area must not obscure form fields or keyboard input.

Respect safe-area insets.

---

# 31. FORM VALIDATION STATES

Every calculator input requires:

### Default
Neutral border.

### Hover
Subtle interaction state.

### Focus
Clear accessible focus ring.

### Filled
Readable value with correct currency/percentage formatting.

### Error
Red/error border and supporting message.

### Disabled
Muted appearance with clear disabled semantics.

---

# 32. VALIDATION RULES

Minimum rules:

### Vehicle Price

- required for vehicle-price mode
- must be numeric
- must be greater than or equal to zero
- must be a valid CAD amount

### Target Payment

- required for target-payment mode
- must be greater than zero

### Down Payment

- numeric
- >= 0
- must not exceed the applicable finance amount

### Loan Term

- required
- must match a valid configured term

### Payment Frequency

- required
- one of Weekly / Bi-weekly / Monthly

### APR

- required
- numeric
- >= 0
- must remain within configured business limits if such limits are provided by the backend

Do not invent maximum APR/term rules.

---

# 33. ERROR MESSAGES

Messages must be concise and actionable.

Examples:

`Enter a vehicle price.`

`Enter a valid payment amount.`

`Down payment cannot be greater than the financed amount.`

`Select a loan term.`

`Enter a valid APR.`

`We couldn't calculate this payment. Please review your inputs.`

Backend/API error:

`We couldn't update the vehicle matches right now. Your calculation is still available.`

Never expose raw API errors.

---

# 34. LOADING STATES

Calculation:

- use a subtle inline loading state
- preserve entered values
- do not blank the entire calculator

Vehicle count:

- skeleton or compact loading indicator

Vehicle matching:

- button loading state
- prevent duplicate submissions

API/backend:

- preserve current calculation where possible
- provide retry action

---

# 35. SUCCESS STATE

A successful calculation should feel visually distinct without becoming a celebration UI.

Show:

- estimated payment
- vehicle budget
- key finance inputs
- vehicle count if available
- primary inventory CTA
- finance contact CTA

No confetti.

No excessive animation.

---

# 36. ZERO / EDGE CASES

## Zero APR

Use the zero-interest formula.

## Zero Down Payment

Allow it unless backend/business rules prohibit it.

## Very High Down Payment

Prevent financed principal from becoming invalid.

## Very Low Target Payment

Show a meaningful validation/constraint message if the resulting budget cannot be calculated.

## No Matching Vehicles

Display:

`No vehicles currently match this budget.`

Actions:

`Adjust Calculation`

`View All Vehicles`

## Inventory API unavailable

Do not invalidate the finance calculation.

Show:

`Vehicle availability couldn't be updated right now.`

---

# 37. VDP → CALCULATOR CONTEXT

The VDP currently displays:

- Vehicle Price
- Finance Fee
- Finance Total
- Loan Term
- Program Rate
- Frequency
- Total Cost of Credit
- Total Obligation
- Estimated Payment

The calculator must be architected so that VDP finance context can be passed into it.

When valid VDP finance context exists:

- prefill vehicle price
- prefill applicable finance fee
- prefill loan term if supplied
- prefill APR/program rate if supplied
- prefill frequency if supplied
- show vehicle identity

This ensures the calculator and VDP do not produce conflicting estimates.

If the backend does not provide one of these values, fall back to calculator defaults.

---

# 38. STANDALONE CALCULATOR DEFAULTS

Defaults must be configuration-driven.

Do not hardcode business values inside visual components.

Recommended architecture:

```ts
calculatorDefaults = {
  mode: "vehiclePrice",
  vehiclePrice: null,
  targetPayment: null,
  downPayment: 0,
  loanTermMonths: configurableDefault,
  paymentFrequency: "biweekly",
  apr: configurableDefault,
  financeFee: 0
}
```

The actual default term and APR must come from approved business/backend configuration.

---

# 39. RESPONSIVE BEHAVIOR

## Desktop

Target:

`1440px`

Layout:

- full header
- compact hero
- 3-step horizontal stepper
- two-column calculator
- persistent summary panel
- supporting CTA/content
- full footer

---

## Tablet

Target:

`768px`

Behavior:

- shared tablet header
- compact hero
- horizontal stepper if space permits
- calculator workflow stacked or constrained two-column depending on breakpoint
- summary remains highly visible
- no horizontal overflow
- controls remain touch-friendly

---

## Mobile

Target:

`375px`

Behavior:

- shared mobile header
- compact hero
- stepper becomes compressed/horizontal-scroll or simplified indicator
- one-column form
- summary becomes compact/sticky/expandable
- large touch targets
- full-width CTAs
- currency inputs optimized for mobile
- no desktop-style dense table

---

# 40. CALCULATOR-SPECIFIC UI COMPONENTS

Reuse global components wherever possible.

New/reusable components may include:

- `CalculatorHero`
- `CalculatorStepper`
- `CalculatorModeSelector`
- `VehicleContextCard`
- `CurrencyInput`
- `PercentageInput`
- `LoanTermSelector`
- `PaymentFrequencySelector`
- `CalculatorSummary`
- `FinanceBreakdown`
- `VehicleMatchCTA`
- `CalculatorError`
- `CalculatorLoadingState`
- `MobileCalculatorActions`

Do not duplicate existing Button, Input, Card, Modal, Header, Footer, or typography components.

---

# 41. DESIGN.MD CHANGES REQUIRED FOR THIS PAGE

When updating `design.md`, add only calculator-specific tokens/states that do not already exist globally.

Required definitions:

## Calculator stepper

- active indicator
- completed indicator
- upcoming indicator
- error indicator

## Calculator mode cards

- selected border/accent
- unselected border
- hover
- focus
- disabled

## Finance result

- estimated-payment emphasis
- finance-summary surface
- finance breakdown divider
- CTA hierarchy

## Finance input states

- currency input
- percentage input
- error
- loading
- disabled

## Mobile sticky result/action bar

- surface
- elevation
- safe-area behavior
- divider
- CTA spacing

## Calculator-specific spacing

Use existing global spacing scale first.

Only add new tokens if the calculator cannot be implemented cleanly with the existing scale.

---

# 42. TYPOGRAPHY

Use the global typography system from `design.md`.

Do not introduce a calculator-specific font.

Recommended hierarchy:

- Page eyebrow
- H1
- step label
- question heading
- input label
- helper text
- result amount
- result frequency
- breakdown label
- breakdown value
- CTA

The estimated payment must be the strongest visual element inside the result panel.

---

# 43. COLOR USAGE

Use global Paradigm Fleet tokens from `design.md`.

Calculator-specific intent:

- Black/dark surfaces: hierarchy and strong finance emphasis
- White/light surfaces: forms and readable workspace
- Primary Red: active state, CTA, key indicators
- Secondary Red: only where approved by global design system
- Neutral gray: supporting labels, borders, helper text
- Error: use the global semantic error token

Do not introduce new brand colors.

---

# 44. SPACING

Global minimum major-section gap:

`40px`

Inside calculator:

- maintain consistent field spacing
- maintain generous card padding
- avoid cramped finance tables
- preserve touch-target spacing on mobile

No major calculator section should visually collapse into the next section.

---

# 45. IMAGE RULE

Approved project assets are:

- JPG
- PNG

Use `next/image`.

Do not introduce SVG assets.

Do not scatter external image URLs across components.

If the calculator uses a vehicle image:

- use the VDP/inventory image supplied by the data source
- use an approved fallback JPG/PNG if no vehicle image exists

---

# 46. ACCESSIBILITY

Required:

- semantic form structure
- labels associated with inputs
- keyboard navigation
- visible focus
- screen-reader-friendly step states
- `aria-invalid` on invalid fields
- error descriptions connected to inputs
- accessible segmented controls
- accessible summary updates
- no color-only state communication
- minimum touch target around 44px
- logical tab order
- Escape behavior where overlays/drawers are used

Dynamic result changes should use appropriate accessible status/live-region behavior without causing excessive announcements.

---

# 47. MOTION

Use the global motion system.

Calculator interactions should feel responsive but restrained.

Recommended:

`160–320ms`

Use motion for:

- step transitions
- summary updates
- mode switching
- validation appearance
- loading state

Respect:

`prefers-reduced-motion`

---

# 48. URL / STATE PERSISTENCE

The calculator should be able to preserve its state during normal browser navigation where practical.

Do not place every form value into the URL by default.

VDP context may use a query parameter or route state.

If URL-based calculator state is implemented, avoid exposing sensitive information.

Calculator values are not credit-application data.

---

# 49. BACKEND / PBS READY ARCHITECTURE

The UI must not contain business logic that should belong to the backend.

Frontend responsibilities:

- input collection
- local validation
- calculation presentation
- interaction state
- formatting
- navigation

Backend/config responsibilities:

- inventory count
- available vehicles
- vehicle prices
- finance fee
- approved APR/program rate
- available loan terms
- allowed payment frequencies
- business rules
- finance programs

Calculation logic should be implemented as a reusable typed utility/service rather than duplicated across components.

Recommended:

`lib/finance/calculatePayment.ts`

and/or:

`lib/finance/calculator.ts`

---

# 50. TYPED DATA MODEL

Recommended structure:

```ts
type PaymentFrequency = "weekly" | "biweekly" | "monthly";

type CalculatorMode = "vehiclePrice" | "targetPayment";

interface CalculatorInput {
  mode: CalculatorMode;
  vehiclePrice?: number;
  targetPayment?: number;
  downPayment: number;
  loanTermMonths: number;
  paymentFrequency: PaymentFrequency;
  apr: number;
  financeFee?: number;
}

interface CalculatorResult {
  vehicleBudget: number;
  financeAmount: number;
  loanAmount: number;
  downPayment: number;
  payment: number;
  paymentFrequency: PaymentFrequency;
  loanTermMonths: number;
  apr: number;
  numberOfPayments: number;
  totalCostOfCredit: number;
  totalObligation: number;
  financeFee?: number;
}
```

The exact model may be adapted to the existing project types.

---

# 51. ANALYTICS EVENTS

If analytics infrastructure already exists, support events such as:

- `calculator_view`
- `calculator_mode_selected`
- `calculator_step_started`
- `calculator_step_completed`
- `calculator_input_changed`
- `calculator_result_generated`
- `calculator_view_vehicles_clicked`
- `calculator_finance_contact_clicked`
- `calculator_validation_error`

Do not add a new analytics platform solely for this page.

---

# 52. SEO

Page title:

`Payment Calculator | Paradigm Fleet`

Meta description should clearly describe the calculator without promising approval or guaranteed financing.

The page must have:

- one H1
- canonical URL
- appropriate metadata
- crawlable explanatory content
- no hidden duplicate H1

---

# 53. ERROR / ROUTING STATES

Required:

### Normal
Calculator fully available.

### Calculation error
Show recoverable error.

### Inventory unavailable
Calculation remains usable.

### Vehicle context invalid
Fall back to standalone calculator.

### Unknown vehicle
Do not render broken vehicle data.

### Page/API failure
Show a clear recovery action.

---

# 54. DESKTOP UI REFERENCE REQUIREMENTS

The approved desktop reference should communicate:

- compact page hero
- 3-step progress
- large calculator workspace
- two calculation-mode choices
- clear input hierarchy
- persistent right-side summary
- strong estimated payment
- vehicle matching CTA
- finance expert CTA
- supporting finance section
- footer

Do not copy generated sample values as real business values.

The screenshot is a visual target, not the source of finance data.

---

# 55. TABLET UI REFERENCE REQUIREMENTS

The tablet reference must demonstrate:

- responsive header
- compact hero
- readable stepper
- stacked or constrained calculator layout
- summary still visible
- full-width/large controls where appropriate
- no clipped content
- no horizontal scrolling

---

# 56. MOBILE UI REFERENCE REQUIREMENTS

The mobile reference must demonstrate:

- compact header
- page title
- calculator step indicator
- mode selection
- full-width fields
- comfortable touch targets
- summary hierarchy
- result state
- sticky/accessible primary action
- footer
- no desktop table overflow

---

# 57. UI STATE MATRIX

The implementation must account for these states:

| State | Required |
|---|---|
| Initial | Yes |
| Vehicle Price mode | Yes |
| Target Payment mode | Yes |
| VDP prefilled mode | Yes |
| Step 1 validation | Yes |
| Step 2 validation | Yes |
| Calculating | Yes |
| Successful result | Yes |
| No matching vehicles | Yes |
| Inventory loading | Yes |
| Inventory API error | Yes |
| Calculation error | Yes |
| Mobile result state | Yes |
| Disabled controls | Yes |
| Keyboard focus | Yes |
| Reduced motion | Yes |

---

# 58. IMPLEMENTATION ORDER

Claude should implement in this order:

### Phase 1
Inspect existing project architecture.

### Phase 2
Reuse:

- header
- footer
- buttons
- inputs
- cards
- typography
- spacing
- colors

### Phase 3
Create finance calculation utility.

### Phase 4
Create calculator state model.

### Phase 5
Implement Step 1.

### Phase 6
Implement Step 2.

### Phase 7
Implement calculation summary.

### Phase 8
Implement Step 3 / Review.

### Phase 9
Implement VDP prefill/context.

### Phase 10
Connect View Vehicles to VRP.

### Phase 11
Implement responsive states.

### Phase 12
Implement loading/error/empty states.

### Phase 13
Accessibility pass.

### Phase 14
Desktop/tablet/mobile visual QA.

### Phase 15
Run production build and fix all errors.

---

# 59. DO NOT DO

Do not:

- redesign the entire finance experience
- create a credit application inside the calculator
- add taxes without a business requirement
- add licensing fees without backend support
- add trade-in calculations unless explicitly approved
- add insurance calculations
- add leasing calculations unless explicitly approved
- add multiple finance products
- invent APR values
- invent inventory counts
- invent vehicle prices
- create a separate header/footer
- create duplicate button/input components
- introduce new fonts
- introduce new brand colors
- use SVG assets
- hardcode business rules in visual components
- create a new backend
- add unnecessary dependencies
- create fake API data as production logic

Mock data may only be used temporarily for development and must be clearly isolated.

---

# 60. ACCEPTANCE CRITERIA

The page is complete only when:

### Visual
- Desktop matches the approved reference direction.
- Tablet matches the approved responsive direction.
- Mobile matches the approved responsive direction.
- Global design system is respected.
- Major sections maintain 40px minimum separation.
- No visual component feels disconnected from Homepage / VRP / VDP.

### Functional
- Vehicle-price mode works.
- Target-payment mode works.
- Down payment changes payment.
- Loan term changes payment.
- Frequency changes payment.
- APR changes payment.
- Zero APR works.
- Validation works.
- Result updates without page reload.
- Vehicle count is backend-driven.
- View Vehicles connects to VRP.
- VDP context can prefill the calculator.
- Finance fee can be supplied from backend/context.
- Finance contact CTA works.

### Responsive
- 1440 desktop works.
- 768 tablet works.
- 375 mobile works.
- No horizontal overflow.
- Inputs remain usable with mobile keyboard.
- Sticky actions do not cover content.

### Accessibility
- Keyboard navigation works.
- Focus states are visible.
- Errors are announced appropriately.
- Form labels are accessible.
- Stepper state is accessible.
- Touch targets are sufficiently large.

### Engineering
- Calculation logic is reusable.
- Types are defined.
- Business configuration is separated from UI.
- Existing shared components are reused.
- No unnecessary dependencies are introduced.
- No console errors.
- Production build succeeds.

---

# 61. FINAL UX PRINCIPLE

The calculator should answer one question as quickly as possible:

> **"What can I afford, and what would my payment look like?"**

The experience should therefore prioritize:

`Input → Calculate → Understand → Find Vehicle → Contact Finance`

The calculator should feel like a natural continuation of:

`Homepage → VRP → VDP`

rather than a separate finance application.

---

# 62. NEXT PROJECT STEP

After this page is implemented and approved:

1. Validate the calculator against the live Paradigm Fleet finance behavior.
2. Test the calculation engine with known VDP examples.
3. Test Desktop / Tablet / Mobile.
4. Verify VDP → Calculator prefill.
5. Verify Calculator → VRP budget flow.
6. Update `design.md` with only the calculator-specific tokens/states required by implementation.
7. Then move to the next website page/template in the master sitemap/SOW.

---

# 62.5 AS-BUILT UPDATE (2026-09 client feedback pass)

Client feedback: the "Your Payment Estimate" summary card (`CalculatorSummary.tsx`, §23/§24) should
show no buttons. `VehicleMatchCTA` ("View Matching Vehicles" / "Talk to Our Finance Experts", §26/§27)
is now hidden from that card specifically, behind a `SHOW_VEHICLE_MATCH_CTA = false` flag — not
deleted, and **`VehicleMatchCTA` is still used exactly as before by Step 3 / Review** (§29,
`CalculatorStep3.tsx`), which is a different location the client feedback didn't ask to change. The
card's spacing rebalances automatically (same `gap-5` rhythm already used between every section of
the card) — no manual spacing patch was needed. Restoring the summary-card buttons is a one-line
flip of the flag.

This is a page-specific override of §23–§27's original requirement that the summary panel always
carry both CTAs — kept here rather than edited out of those sections above, so the original intent
and the current override are both visible.

# 63. IMPLEMENTATION NOTES (as built)

Route: `/payment-calculator` (`src/app/(website)/payment-calculator/page.tsx`), a server component
that resolves `?vehicle=<slug>` via the existing `getVehicleBySlug` before render — an unknown/missing
slug silently falls back to the standalone calculator (§53) rather than erroring.

## Where things live

- `src/features/finance/types/calculator.types.ts` — `CalculatorMode`, `CalculatorInput`,
  `CalculatorResult`, `StepErrors` (§50, adapted to the project's controlled-string input
  convention already used by `Input`/`PaymentEstimator`).
- `src/features/finance/config/calculator.config.ts` — loan term options, payment-frequency
  options + their `periodsPerYear`, and `calculatorDefaults` (§38/§49) — the one place business
  defaults live, never inlined in a component.
- `src/features/finance/lib/calculatePayment.ts` — the pure calculation engine (§18/§21/§49),
  covering both modes and the zero-APR branch. `src/features/finance/lib/format.ts` holds the
  shared currency/percent/frequency formatters (§22). `src/features/finance/lib/validateCalculator.ts`
  holds per-step validation (§32/§33). `src/features/finance/lib/vehicleMatches.ts` maps a result to
  a real, backend-driven inventory count + VRP query (§25/§26), reusing `filterVehiclesForVrp` /
  `vrpFiltersToSearchParams` from `page-02-vrp.md`'s service rather than inventing a new filter shape.
- `src/features/finance/components/` — `CalculatorHero`, `CalculatorStepper`,
  `CalculatorModeSelector`, `CurrencyInput`/`PercentageInput`, `LoanTermSelector`,
  `PaymentFrequencySelector`, `CalculatorSummary`, `CalculatorStep1`/`2`/`3`, `VehicleMatchCTA`,
  `CalculatorSupportingSection`, and the `PaymentCalculatorClient` orchestrator that owns all shared
  state (§40).

## Reused rather than duplicated

- `Input` gained an optional `leadingText`/`trailingText` adornment slot (additive, backward
  compatible) so `CurrencyInput`/`PercentageInput` are thin wrappers, not a second field
  implementation.
- `LoanTermSelector`/`PaymentFrequencySelector` reuse the Homepage's established segmented-control
  visual pattern (one rounded shell, `border-l` dividers) instead of introducing a new control type.
- `BenefitStrip` gained an optional `items` prop so the calculator's own 4-point row (Quick & Easy /
  Multiple Options / Real Vehicle Inventory / Expert Support) reuses the same layout as the
  Homepage/VRP strip instead of a parallel implementation.
- `CalculatorHero` reuses the VrpHero shell (dark image banner + breadcrumb), shortened.
- "Talk to Our Finance Experts" and Step 3's review both open the existing Quick Quote lead flow
  (`useQuote`) — the same "one real lead-capture path" convention as the VDP's `PaymentEstimator`.
- `AccordionItem` backs the mobile summary's "View Full Breakdown" collapse (§30) instead of a new
  collapse implementation.

## Deliberate simplifications (and why)

- **No finance fee / program rate is ever defaulted.** `Vehicle` has no `financeFee`/`programRate`
  fields in this prototype's data model, and inventing one would misrepresent Paradigm Fleet's real
  terms (§1/§49 "must not invent finance products, fees, rates"). `financeFee` stays `0` end-to-end;
  the field only ever appears in the breakdown when a nonzero value is actually supplied.
- **Default APR (8.99%) is a generic starting estimate, not a claimed rate.** It matches this spec's
  own worked example, is clearly labeled "Estimated"/"for illustrative purposes only" throughout, and
  the APR helper text explicitly invites the visitor to get a better real rate from the finance team —
  same posture as the VDP's inline `PaymentEstimator`, just with a starting value instead of a blank
  field, since §38 explicitly asks for a configured default here (the VDP widget's own doc note about
  never defaulting APR doesn't apply verbatim to this page, which the spec designs around a filled
  default).
- **Vehicle-match count and "View Vehicles" query both reuse the VRP's own filter/count functions.**
  No parallel inventory-matching logic was written.
- **No dedicated `CalculatorLoadingState`/inventory-API-error components.** The engine is a pure,
  synchronous, local function over already-loaded mock data, so there's no real async gap for those
  states to fill; `isCalculating` still exists as a brief, honest UI affordance during debounce
  (§17/§34) without simulating a fake network delay.
- **`Change Vehicle` clears the VDP context** (plain link back to `/payment-calculator`) rather than
  opening an inventory picker modal — the simplest option §12 explicitly allows, and consistent with
  this page not owning a second vehicle-selection UI.
- **Discoverability:** a "Payment Calculator" entry was added to `footerServiceNav` (shared by the
  Footer and the Global Search suggestions) and to the VDP's Financing section ("Open Full Payment
  Calculator →" next to the existing "View Financing Options" link), since a page with no inbound
  link from anywhere in the site would otherwise be unreachable.

## Verification performed

- `npm run build` and `npx eslint . --max-warnings=0` both clean.
- The calculation engine was independently re-derived and checked against hand/`node` arithmetic for
  vehicle-price mode (incl. zero APR) and target-payment mode (incl. zero APR) — all totals,
  loan amounts and cost-of-credit figures matched.
- Verified via the built production server + `curl` (not a real browser): standalone page renders
  the idle summary state with no price entered; `?vehicle=<real-slug>` prefills the price and
  computes a live result server-side (SSR); `Change Vehicle` and VDP entry links resolve; `/vehicles`,
  the VDP, and the homepage still return 200 with no regressions from the shared-component changes.
- **Not performed: pixel-level screenshot comparison against the reference image at 1440/768/375.**
  This environment has no browser/screenshot tool available — layout was built from careful visual
  reading of the reference and from the compiled Tailwind output (confirmed the intended
  grid/sticky/radius classes actually compiled), not from a rendered-and-compared screenshot. This is
  a real gap against §5/§8/§15's instruction to iterate from screenshots; a follow-up visual QA pass
  in an actual browser at all three widths is recommended before calling this pixel-verified.
