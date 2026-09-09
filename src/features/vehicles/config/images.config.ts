/**
 * Centralized local image configuration.
 *
 * design.md §7 / §13 (VDP spec): all image references live in one
 * data/config module so the source images can change, or real fleet
 * photography can be dropped in, without touching any component.
 *
 * Images live in `public/images/vehicles/`, sourced from the project's
 * `assets/` folder (real Paradigm Fleet yard photos + stock product shots
 * per vehicle category). Where the exact vehicle/category isn't covered by
 * a dedicated photo, the closest available category asset is reused —
 * swap in real photography per-vehicle whenever it's available.
 */

const BASE = "/images/vehicles";

/** Local asset paths, organized by what they depict — swap freely for real fleet photography. */
export const PHOTO_IDS = {
  heroFleetYard: `${BASE}/hero-bg.jpg`,
  // The one vehicle-specific photo available — reused for both real-world
  // Ford Transit Cargo Van listings (see vehicles.service.ts) instead of
  // the generic cargo van category shot below.
  fordTransitCargoVan: `${BASE}/2024-ford-transit-cargo-van.png`,
  cargoVanFront: `${BASE}/cargo-vans.png`,
  cargoVanSide: `${BASE}/cargo-vans.png`,
  cargoVanInterior: `${BASE}/cargo-vans.png`,
  passengerVanFront: `${BASE}/passenger-vans.png`,
  passengerVanSide: `${BASE}/passenger-vans.png`,
  passengerVanInterior: `${BASE}/passenger-vans.png`,
  pickupFront: `${BASE}/pickup-trucks.png`,
  pickupSide: `${BASE}/pickup-trucks.png`,
  pickupInterior: `${BASE}/pickup-trucks.png`,
  boxTruckFront: `${BASE}/cube-box-trucks.png`,
  boxTruckSide: `${BASE}/cube-box-trucks.png`,
  boxTruckInterior: `${BASE}/cube-box-trucks.png`,
  // No dedicated SUV/sedan photography in the assets folder — closest
  // available is the "Refrigerated / Other" catch-all shot.
  suvFront: `${BASE}/refrigerated-other.png`,
  suvSide: `${BASE}/refrigerated-other.png`,
  suvInterior: `${BASE}/refrigerated-other.png`,
  sedanFront: `${BASE}/refrigerated-other.png`,
  sedanSide: `${BASE}/refrigerated-other.png`,
  sedanInterior: `${BASE}/refrigerated-other.png`,
  // The Ford E-Series Cutaway listing IS a refrigerated body — exact match.
  evFront: `${BASE}/refrigerated-other.png`,
  evSide: `${BASE}/refrigerated-other.png`,
  evInterior: `${BASE}/refrigerated-other.png`,
  categoryVans: `${BASE}/cargo-vans.png`,
  categoryTrucks: `${BASE}/cube-box-trucks.png`,
  categoryServiceTrucks: `${BASE}/service-trucks.png`,
  categorySuv: `${BASE}/refrigerated-other.png`,
  categoryElectric: `${BASE}/refrigerated-other.png`,
  servicesYard: `${BASE}/our-service-section-img.jpg`,
  testimonialDriver: `${BASE}/our-service-section-img.jpg`,
  // Trades (plumbing/electrical/HVAC) map to the service truck photo;
  // logistics maps to the cargo van used for last-mile delivery.
  industryPlumbing: `${BASE}/service-trucks.png`,
  industryElectrical: `${BASE}/service-trucks.png`,
  industryHvac: `${BASE}/service-trucks.png`,
  industryLogistics: `${BASE}/cargo-vans.png`,
} as const;

export const heroImage = {
  url: PHOTO_IDS.heroFleetYard,
  alt: "Row of work-ready fleet vans and trucks parked at a Paradigm Fleet yard",
};

export const servicesImage = {
  url: PHOTO_IDS.servicesYard,
  alt: "Paradigm Fleet service and upfitting yard",
};

/**
 * Builds a vehicle's gallery from up to 3 angle paths. Several vehicles
 * only have one real photo available (front/side/interior all resolve to
 * the same local asset) — de-duping keeps the gallery honest (a single
 * photo shown once) instead of padding it with repeated thumbnails.
 */
export function vehicleImageSet(
  frontId: string,
  sideId: string,
  interiorId: string,
  altBase: string
) {
  const candidates = [
    { url: frontId, alt: `${altBase} — front three-quarter view` },
    { url: sideId, alt: `${altBase} — side profile view` },
    { url: interiorId, alt: `${altBase} — interior/cabin view` },
  ];
  const seen = new Set<string>();
  return candidates.filter(({ url }) => (seen.has(url) ? false : (seen.add(url), true)));
}

/** `width` is unused for local assets (next/image handles responsive sizing on its own) — kept so existing call sites don't need to change. */
export function categoryImage(id: string, width?: number) {
  void width;
  return id;
}
