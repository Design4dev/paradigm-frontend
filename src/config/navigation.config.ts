export interface NavItem {
  label: string;
  href: string;
  /**
   * Opens this item in a new browser tab (`target="_blank" rel="noopener
   * noreferrer"`), matching the current deployed Paradigm Fleet site's
   * behavior for Rentals. Intentional navigation/UX behavior inherited from
   * the live site — not an SEO requirement. Rendered by `Navbar` and
   * `MobileMenu`.
   */
  newTab?: boolean;
}

/**
 * Primary marketing-site navigation, shared by Header, Navbar and
 * MobileMenu (page-01-homepage.md §4). Every href below resolves to a real
 * page or a real anchor on an existing page — no "#" placeholders — per
 * §26/§29's "no dead-end CTA/nav" requirement. Rentals has its own page at
 * /rentals and opens in a new tab (see `newTab` above); Upfitting/Financing
 * still point at their section on /services until those get dedicated
 * pages; Service & Parts routes to /contact (no standalone page exists yet).
 */
export const primaryNav: NavItem[] = [
  { label: "Inventory", href: "/vehicles" },
  { label: "Rentals", href: "/rentals", newTab: true },
  { label: "Upfitting", href: "/services#upfitting" },
  { label: "Financing", href: "/services#leasing-financing" },
  { label: "Service & Parts", href: "/contact" },
  { label: "About Us", href: "/about" },
];

export const footerCompanyNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our History", href: "/about#history" },
  { label: "Careers", href: "/contact" },
  { label: "News & Resources", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const footerServiceNav: NavItem[] = [
  { label: "Sales", href: "/services#sales" },
  { label: "Rentals", href: "/rentals" },
  { label: "Find Your Fleet", href: "/rentals/find-your-fleet" },
  { label: "Leasing & Financing", href: "/services#leasing-financing" },
  { label: "Payment Calculator", href: "/payment-calculator" },
  { label: "Trade-In Appraisal", href: "/trade-in" },
  { label: "Upfitting", href: "/services#upfitting" },
  { label: "Service & Parts", href: "/contact" },
];

export const footerInventoryNav: NavItem[] = [
  { label: "Cargo Vans", href: "/vehicles?type=Cargo+Van" },
  { label: "Cube / Box Trucks", href: "/vehicles?type=Box+Truck" },
  { label: "Pickup Trucks", href: "/vehicles?type=Pickup+Truck" },
  { label: "Passenger Vans", href: "/vehicles?type=Passenger+Van" },
  { label: "Refrigerated / Other", href: "/vehicles?type=Refrigerated" },
];

export const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Pages", href: "/admin/pages" },
  { label: "Inventory", href: "/admin/content" },
];
