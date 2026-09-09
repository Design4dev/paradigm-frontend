# Page 05 — Trade-In Appraisal
## Paradigm Fleet Website — Complete UI / UX / Functional Implementation Specification

> Global source: `design.md`
> Page source: this document
> Visual target: approved Trade-In Appraisal Desktop + Tablet + Mobile reference image
> Business/content source: current Paradigm Fleet Trade-In Appraisal page.
>
> The redesign may improve UX and visual hierarchy, but must preserve the live business intent and fields. Do not invent appraisal values, guarantees, VIN capabilities, inventory, or CRM behavior.

## 1. Objective

Allow customers to submit their current vehicle/equipment information and contact details for an appraisal request.

Primary journey:

`Vehicle Information → Condition / Details → Optional Photos → Contact Information → Submit → Confirmation`

Secondary journey:

`Trade-In → Replacement Vehicle / Inventory`

This is a lead-generation/appraisal-request flow, not an instant guaranteed valuation engine unless a real valuation API exists.

## 2. Live Business Reference

The current live Trade-In page includes:

### Vehicle / equipment fields
- Type
- Condition
- Year
- Make
- Model
- Horsepower
- Hours
- Price

The live page demonstrates heavy-equipment examples such as Track Loader, Dozer, Bobcat, Caterpillar, T740 and D10. Therefore the new form must remain flexible enough for commercial vehicles and applicable equipment.

### Contact fields
- First and Last Name
- Contact Me By
- Phone
- Email
- Dealer Message

Preserve existing consent/privacy behavior where required by the current form/CRM.

## 3. Source-of-Truth Order

1. `design.md`
2. This file
3. Approved Trade-In reference image
4. `page-01-homepage.md`
5. `page-02-vrp.md`
6. `page-03-vdp.md`
7. `page-04-payment-calculator.md`
8. Current Paradigm Fleet website/business form
9. Existing Next.js architecture

Visual reference controls appearance.
Live site controls business fields/content.
This file controls page-specific behavior.

## 4. Route

Primary route:

`/trade-in/`

Preserve the project's existing routing convention if different.

The page must be reachable from Homepage, VRP, VDP and approved navigation/CTA locations.

## 5. VDP Context

If the user enters from a VDP, optionally carry replacement-vehicle context:

- vehicle name
- image
- price
- slug/reference

Show:

`Trading in your current vehicle toward: [Replacement Vehicle]`

Do not confuse the replacement vehicle with the vehicle being appraised.

Allow `Change Vehicle` when applicable.

## 6. Header

Reuse the exact global header from Homepage/VRP/VDP/Calculator.

Do not create a Trade-In-specific header.

Use shared desktop, tablet and mobile navigation.

## 7. Hero

### Desktop

Dark commercial-vehicle image hero.

Eyebrow:

`TRADE-IN APPRAISAL`

H1:

`Trade-In Appraisal`

Supporting message:

`Get an estimated value for your current vehicle.`

Communicate the live-page intent: simple process, fair/honest review, and potential use of trade-in value toward another vehicle.

Do not promise an exact value before appraisal review.

Optional CTA:

`Start Appraisal`

### Tablet/Mobile

Keep the hero compact and preserve H1, short description and breadcrumb.

## 8. Benefit Strip

Use four compact benefit items:

- Quick & Easy — Get started in minutes
- No Obligation — Request an appraisal without commitment
- Use It Towards Any Vehicle — Apply trade-in value toward another vehicle
- Expert Support — Our team is here to help

Do not turn these into unsupported guarantees.

## 9. Guided Stepper

Recommended UX steps:

1. `Vehicle Information`
2. `Vehicle Condition`
3. `Photos (Optional)`
4. `Contact Information`
5. `Appraisal Request`

The stepper is a UX layer. The backend may still receive one consolidated payload.

Desktop: horizontal.
Tablet: compact horizontal.
Mobile: compact/scrollable/current-step representation.

Always show current, completed and remaining steps.

## 10. Step 1 — Vehicle Information

Heading:

`Let's Find Your Vehicle`

Supporting text:

`Enter your vehicle details so our team can review your trade-in.`

Core fields:

- Type
- Condition
- Year
- Make
- Model
- Price

Conditional fields:

- Horsepower
- Hours

Show horsepower/hours when applicable to heavy equipment. Do not clutter standard vehicle forms with irrelevant fields.

Field options should be configuration/backend driven where possible.

## 11. VIN Lookup

The approved visual reference may show VIN lookup.

However, the current live Trade-In form is primarily manual-entry based.

Therefore:

**VIN lookup is optional unless a real VIN service exists.**

If a real API exists, support:

- VIN Lookup
- Enter Details Manually

VIN lookup may prefill Year/Make/Model/Type where supported.

Never build a fake VIN decoder or fake instant valuation.

Manual entry must always remain available.

## 12. Step 2 — Vehicle Condition

Capture useful appraisal information without making the form unnecessarily long.

Possible groups:

### Exterior
- body condition
- dents/scratches
- rust
- paint

### Interior
- seats
- dashboard
- flooring/cargo area

### Mechanical
- engine
- transmission
- warning lights
- known issues

### Tires
- condition

### Usage
- mileage for vehicles
- hours for equipment

Prefer selects, condition controls and short notes over long free-text forms.

Exact fields should be configurable.

## 13. Condition Notes

Optional textarea:

`Tell us anything else about the vehicle`

Examples:
- repairs
- known issues
- modifications
- accident history
- service history
- upfitting/accessories

## 14. Step 3 — Photos

Photos are optional unless the backend/business process explicitly requires them.

Heading:

`Add Photos`

Supporting text:

`Photos can help our team better understand the condition of your vehicle.`

Suggested categories:
- Front
- Rear
- Driver Side
- Passenger Side
- Interior
- Cargo/Equipment Area
- Damage/Issue

Support multiple JPG/PNG files.

States:
- empty
- uploading
- uploaded
- upload error
- remove
- retry

Do not block the form while optional uploads are processing.

## 15. Step 4 — Contact Information

Heading:

`Tell Us How to Reach You`

Fields:
- First and Last Name
- Contact Me By
- Phone
- Email
- Dealer Message

Phone/email requirements should follow configured business rules.

Do not invent legal or marketing-consent wording. Preserve approved existing consent behavior.

## 16. Submission

Primary CTA:

`Submit Appraisal Request`

On submit:
1. validate
2. validate uploads
3. build structured payload
4. submit
5. prevent duplicate submission
6. show progress
7. show success/error

## 17. No Fake Instant Valuation

Unless a real valuation service exists, never display a generated value such as `$XX,XXX`.

Success should say that the appraisal request was submitted and the team will review/contact the customer.

## 18. Success State

Heading:

`Appraisal Request Submitted`

Message:

`Thanks for sending your vehicle information. Our team will review the details and contact you regarding the appraisal.`

Show:
- confirmation
- contact preference
- backend reference number if supplied

Actions:
- `Browse Vehicles`
- `Return Home`
- optional `Talk to Our Team`

Never fabricate an appraisal amount.

## 19. Error State

Heading:

`We Couldn't Submit Your Request`

Message:

`Please review your information and try again.`

Actions:
- `Try Again`
- `Call Our Team`

Preserve all entered data after failure.

## 20. Validation

Required states:
- default
- hover
- focus
- filled
- error
- disabled

Rules:
- valid year
- required Make/Model where applicable
- required Condition
- valid non-negative CAD price
- numeric horsepower/hours where applicable
- required name
- valid phone where required
- valid email
- message optional

Do not invent business-specific limits.

## 21. Desktop Layout — 1440px

Structure:

1. Global Header
2. Dark Hero
3. Benefit Strip
4. Main two-column workspace
   - left: stepper + active form
   - right: Trade-In Advantage / replacement vehicle / support
5. Why Trade In section
6. Final CTA
7. Global Footer

The page should feel structured, commercial and conversion-focused.

## 22. Tablet Layout — 768px

Use:
- shared tablet header
- compact hero
- compressed benefit strip
- guided stepper
- form
- advantage/support card below or beside only when there is sufficient space
- supporting section
- CTA
- footer

Do not keep a cramped two-column layout. Stack when required.

## 23. Mobile Layout — 375px

Use:
- shared mobile header
- compact hero
- compact benefits
- current-step/progress indicator
- one-column form
- advantage card
- accordions for supporting information where appropriate
- final CTA
- footer

All inputs/buttons should be touch-friendly and full width where appropriate.

No horizontal overflow.

## 24. Trade-In Advantage Card

Desktop side card, stacked on smaller screens.

Heading:

`Your Trade-In Advantage`

Communicate:
- fair/competitive review
- simple process
- potential use toward another vehicle
- expert support

If replacement vehicle context exists, show it.

CTA:

`Speak With Our Appraisal Team`

Use actual configured contact data.

## 25. Why Trade In Section

Use compact cards such as:

- Trusted Valuations
- Wide Selection
- Simple Process
- Local Support

These are supporting benefits, not guarantees.

Use approved JPG/PNG assets only.

## 26. Final CTA

Dark commercial-vehicle image CTA.

Example:

`Ready to See What Your Vehicle Is Worth?`

Supporting copy should invite the user to start the request or contact the team.

Primary:

`Contact Our Team`

Keep messaging consistent with approved business content.

## 27. Footer / Chat

Reuse global footer.

If the site has a global chat widget, reuse it. Do not create a second implementation.

Ensure floating chat does not cover mobile form actions.

## 28. Data Model

Recommended:

```ts
type TradeInStep =
  | "vehicle"
  | "condition"
  | "photos"
  | "contact"
  | "review";

type SubmissionState =
  | "idle"
  | "validating"
  | "submitting"
  | "success"
  | "error";

interface TradeInVehicle {
  type?: string;
  condition?: string;
  year?: number;
  make?: string;
  model?: string;
  horsepower?: number;
  hours?: number;
  price?: number;
  vin?: string;
}

interface TradeInContact {
  firstName: string;
  lastName: string;
  contactMethod?: string;
  phone?: string;
  email: string;
  message?: string;
}

interface TradeInRequest {
  vehicle: TradeInVehicle;
  contact: TradeInContact;
  photos?: string[];
  replacementVehicle?: {
    slug?: string;
    name?: string;
    price?: number;
  };
}
```

Adapt to existing project types.

## 29. Backend / CRM Ready

Frontend:
- form UI
- validation
- step management
- photo handling
- payload creation
- loading/error/success UI

Backend/CRM:
- lead creation
- appraisal request storage
- valuation logic if available
- file storage
- lead routing
- CRM/Salesforce integration
- notifications
- source attribution

Never expose API keys in the client.

Do not create a fake CRM.

## 30. Photo Handling

If supported:
- validate file type
- validate size
- secure upload
- return file references
- submit references with the request
- retry failures

Production image assets remain JPG/PNG.

## 31. Analytics

If existing analytics exists, support:
- `trade_in_view`
- `trade_in_started`
- `trade_in_vehicle_step_completed`
- `trade_in_condition_step_completed`
- `trade_in_photo_upload_started`
- `trade_in_photo_uploaded`
- `trade_in_contact_step_completed`
- `trade_in_submitted`
- `trade_in_submission_success`
- `trade_in_submission_error`
- `trade_in_contact_clicked`
- `trade_in_browse_vehicles_clicked`

Do not add a new analytics platform just for this page.

## 32. Accessibility

Required:
- semantic form
- correct labels
- keyboard navigation
- visible focus
- `aria-invalid`
- accessible errors
- accessible stepper
- accessible upload controls
- accessible success/error messaging
- no color-only state
- ~44px minimum touch targets
- logical tab order
- reduced-motion support

## 33. Motion

Use global motion tokens, approximately 160–320ms.

Use motion for:
- step transitions
- validation
- upload state
- success state

Respect `prefers-reduced-motion`.

## 34. Spacing

The project uses a general 40px minimum major-section separation.

**Do not use 40px between every element.**

Use smaller spacing for related elements:
- label → input
- input → helper
- field → field
- card title → content
- icon → label
- step → label

Use ~40px+ for true major section transitions.

The approved visual reference has priority.

Goal:

`structured + compact + breathable`

not:

`over-spaced + disconnected`.

## 35. Typography

Use the global typography from `design.md`.

Do not introduce another font.

Hierarchy:
- eyebrow
- H1
- section heading
- step heading
- field label
- helper
- body
- CTA
- consent/legal text

## 36. Color

Use existing Paradigm Fleet tokens.

- Red: CTA / active / selected / progress
- Black: strong text / dark hero / footer
- White: workspace
- Neutral gray: borders/helper text
- global semantic error token for errors

Do not introduce new brand colors.

## 37. Images

Approved project formats:
- JPG
- PNG

Use `next/image`.

Centralize image URLs.

Do not scatter external URLs in JSX.

Use approved commercial-vehicle imagery for hero/CTA/vehicle context.

Do not use generated placeholder imagery as production assets unless approved.

## 38. UI State Matrix

Must support:

| State | Required |
|---|---|
| Initial | Yes |
| Vehicle step | Yes |
| VIN lookup | Conditional |
| Manual entry | Yes |
| Condition step | Yes |
| Photo step | Yes |
| Photo uploading | Conditional |
| Contact step | Yes |
| Review | Yes |
| Validation errors | Yes |
| Submission loading | Yes |
| Success | Yes |
| Submission error | Yes |
| VDP replacement context | Conditional |
| Mobile stepper | Yes |
| Mobile action area | Yes if required |
| Keyboard focus | Yes |
| Reduced motion | Yes |

## 39. design.md Additions

Only add tokens not already present globally.

Potential additions:
- Trade-In stepper: active/completed/upcoming/error
- Upload UI: empty/uploading/uploaded/error/remove
- Success confirmation surface
- form error state
- mobile sticky action surface

Reuse existing spacing/radius/shadow tokens.

## 40. Do Not Do

Do not:
- invent instant appraisal values
- promise the highest value
- guarantee approval
- build a fake VIN decoder
- require VIN without a real VIN service
- remove heavy-equipment support
- remove live business fields without approval
- create duplicate global components
- create another header/footer
- introduce a new font or brand color
- use SVG production assets
- hardcode demo contact numbers
- hardcode fake inventory
- create a new CRM
- expose private API keys
- add unnecessary dependencies
- expand scope into a marketplace

## 41. Implementation Order

1. Inspect existing project.
2. Reuse global components.
3. Build page shell.
4. Build hero.
5. Build benefits.
6. Build stepper.
7. Build vehicle form.
8. Build conditional equipment fields.
9. Build condition step.
10. Build optional photo step.
11. Build contact step.
12. Build review.
13. Build success/error states.
14. Add VDP replacement context.
15. Connect backend/CRM submission.
16. Implement Desktop/Tablet/Mobile.
17. Accessibility pass.
18. Visual screenshot QA.
19. Fix visual differences.
20. Production build.

## 42. Visual QA — Mandatory

The page is not complete after the first implementation.

After implementation, run the application and capture:

- Desktop ~1440px
- Tablet ~768px
- Mobile ~375px

Compare each against the approved reference.

Check:
- container width
- hero height/crop
- header
- typography
- form dimensions
- stepper
- card dimensions
- spacing
- CTA dimensions
- borders/radius/shadows
- alignment
- responsive stacking
- footer
- mobile overflow

If anything differs, fix it, recapture and compare again.

Do not stop after one pass.

## 43. Responsive QA

After every significant layout change, re-check all three sizes.

Do not fix desktop in a way that breaks tablet/mobile.

Do not fix mobile by breaking desktop.

## 44. Acceptance Criteria

### Visual
- Desktop matches approved reference direction.
- Tablet matches approved direction.
- Mobile matches approved direction.
- Header/footer match the rest of the website.
- Hero hierarchy is correct.
- Stepper is clear.
- Form hierarchy is clear.
- Advantage/support card works.
- Supporting sections work.
- Spacing is balanced.
- No excessive whitespace.
- No cramped sections.

### Functional
- Vehicle information works.
- Heavy-equipment fields work when applicable.
- Condition works.
- Photos work when supported.
- Contact works.
- Validation works.
- Loading works.
- Success works.
- Error preserves data.
- VDP context works when supported.
- No fake appraisal value is generated.

### Responsive
- 1440px works.
- 768px works.
- 375px works.
- No horizontal overflow.
- Touch targets are usable.
- Stepper remains understandable.
- Sticky actions do not cover content.

### Engineering
- Shared components reused.
- Types defined.
- Backend/CRM isolated from UI.
- No unnecessary dependencies.
- No console errors.
- Production build succeeds.

## 45. Final UX Principle

The experience should answer:

> **"Can I quickly tell Paradigm Fleet what I have and start the appraisal process?"**

Ideal journey:

`VDP / Homepage → Trade-In Appraisal → Vehicle Details → Condition → Optional Photos → Contact → Submit → Confirmation → Browse Replacement Vehicles`

It should be simpler than a finance application and more structured than a generic contact form.

## 46. Next Page

After Trade-In is implemented and approved, continue with:

`Rental Listing Page (RRP)`

Then:

`Rental Vehicle Detail Page`

Then:

`Rental Reservation / Quote Request`

Then:

`Service Appointment Booking`

Then:

`Parts / Service templates`

All pages must reuse the same global design system and shared components.
