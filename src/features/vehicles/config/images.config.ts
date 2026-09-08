/**
 * Centralized remote image configuration.
 *
 * design.md §7 / §13 (VDP spec): all remote image URLs live in one
 * data/config module so the image host can change, or real fleet
 * photography can be dropped in, without touching any component.
 * next.config.ts only needs remotePatterns for this one host.
 */

const UNSPLASH_HOST = "https://images.unsplash.com";

/** Builds a sized, optimized Unsplash source URL for a given photo id. */
function unsplash(photoId: string, width = 1600) {
  return `${UNSPLASH_HOST}/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Stable Unsplash photo ids used across hero, category and fleet imagery. */
export const PHOTO_IDS = {
  heroFleetYard: "photo-1519641471654-76ce0107ad1b",
  cargoVanFront: "photo-1601362840469-51e4d8d58785",
  cargoVanSide: "photo-1554744512-d6c603f27c54",
  cargoVanInterior: "photo-1591768793355-74d04bb6608f",
  passengerVanFront: "photo-1519003722824-194d4455a60c",
  passengerVanSide: "photo-1533473359331-0135ef1b58bf",
  passengerVanInterior: "photo-1517524008697-84bbe3c3fd98",
  pickupFront: "photo-1568605117036-5fe5e7bab0b7",
  pickupSide: "photo-1541899481282-d53bffe3c35d",
  pickupInterior: "photo-1503376780353-7e6692767b70",
  boxTruckFront: "photo-1494976388531-d1058494cdd8",
  boxTruckSide: "photo-1580273916550-e323be2ae537",
  boxTruckInterior: "photo-1449965408869-eaa3f722e40d",
  suvFront: "photo-1533106418989-88406c7cc8ca",
  suvSide: "photo-1571127236794-81c0bbfe1ce3",
  suvInterior: "photo-1552519507-da3b142c6e3d",
  sedanFront: "photo-1549317661-bd32c8ce0db2",
  sedanSide: "photo-1605559424843-9e4c228bf1c2",
  sedanInterior: "photo-1552519507-da3b142c6e3d",
  evFront: "photo-1593941707882-a5bba14938c7",
  evSide: "photo-1620891549027-942fdc95d3f5",
  evInterior: "photo-1617788138017-80ad40651399",
  categoryVans: "photo-1601362840469-51e4d8d58785",
  categoryTrucks: "photo-1494976388531-d1058494cdd8",
  categorySuv: "photo-1571127236794-81c0bbfe1ce3",
  categoryElectric: "photo-1593941707882-a5bba14938c7",
  servicesYard: "photo-1520340356584-f9917d1eea6f",
  testimonialDriver: "photo-1580489944761-15a19d654956",
  industryPlumbing: "photo-1607472829122-63c9dc6c9c4b",
  industryElectrical: "photo-1621905251189-08b45d6a269e",
  industryHvac: "photo-1621905252507-b35492cc74b4",
  industryLogistics: "photo-1519003722824-194d4455a60c",
} as const;

export const heroImage = {
  url: unsplash(PHOTO_IDS.heroFleetYard, 2000),
  alt: "Row of work-ready fleet vans and trucks parked at a Paradigm Fleet yard",
};

export const servicesImage = {
  url: unsplash(PHOTO_IDS.servicesYard, 1600),
  alt: "Paradigm Fleet service and upfitting yard",
};

export function vehicleImageSet(
  frontId: string,
  sideId: string,
  interiorId: string,
  altBase: string
) {
  return [
    { url: unsplash(frontId, 1600), alt: `${altBase} — front three-quarter view` },
    { url: unsplash(sideId, 1600), alt: `${altBase} — side profile view` },
    { url: unsplash(interiorId, 1600), alt: `${altBase} — interior/cabin view` },
  ];
}

export function categoryImage(id: string, width = 900) {
  return unsplash(id, width);
}
