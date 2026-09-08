import Image from "next/image";
import type { SpecIconName } from "@/features/vehicles/types/vehicle.types";

/**
 * Icons are pre-rendered PNG files under public/images/icons/ (generated
 * once from the original vector artwork) rather than inline SVG — every
 * icon below is a thin wrapper around next/image so call sites are
 * unchanged (className, size via Tailwind h-N and w-N utilities, etc.). All icons are
 * decorative; the interactive control around them carries the real label.
 */
export interface IconProps {
  className?: string;
}

function icon(src: string, extraClassName?: string) {
  function IconComponent({ className }: IconProps) {
    const classes = extraClassName ? `${extraClassName} ${className ?? ""}`.trim() : className;
    return <Image src={src} alt="" width={64} height={64} aria-hidden="true" className={classes} />;
  }
  return IconComponent;
}

export const SearchIcon = icon("/images/icons/search-icon.png");
export const MenuIcon = icon("/images/icons/menu-icon.png");
export const CloseIcon = icon("/images/icons/close-icon.png");
export const ChevronRightIcon = icon("/images/icons/chevron-right-icon.png");
export const ChevronLeftIcon = icon("/images/icons/chevron-left-icon.png");
export const MapPinIcon = icon("/images/icons/map-pin-icon.png");
export const CalendarIcon = icon("/images/icons/calendar-icon.png");
export const CheckIcon = icon("/images/icons/check-icon.png");
export const CheckCircleIcon = icon("/images/icons/check-circle-icon.png");
export const AlertIcon = icon("/images/icons/alert-icon.png");
export const StarIcon = icon("/images/icons/star-icon.png");
export const ThumbsUpIconOutline = icon("/images/icons/thumbs-up-icon.png");
export const ThumbsUpIconFilled = icon("/images/icons/thumbs-up-icon-red.png");
export const ImageOffIcon = icon("/images/icons/image-off-icon.png");
const PhoneIconRed = icon("/images/icons/phone-icon.png");
const PhoneIconWhite = icon("/images/icons/phone-icon-white.png");

/**
 * Baked red by default — invisible on a red background. `tone="white"`
 * swaps to an explicit white-recolored file rather than relying on CSS
 * color inheritance (which raster icons don't support).
 */
export function PhoneIcon({ className, tone = "red" }: IconProps & { tone?: "red" | "white" }) {
  const Icon = tone === "white" ? PhoneIconWhite : PhoneIconRed;
  return <Icon className={className} />;
}
export const MailIcon = icon("/images/icons/mail-icon.png");
export const ShareIcon = icon("/images/icons/share-icon.png");
export const GaugeIcon = icon("/images/icons/gauge-icon.png");
export const FuelIcon = icon("/images/icons/fuel-icon.png");
export const SeatsIcon = icon("/images/icons/seats-icon.png");
export const BodyIcon = icon("/images/icons/body-icon.png");
export const DrivetrainIcon = icon("/images/icons/drivetrain-icon.png");
export const DimensionsIcon = icon("/images/icons/dimensions-icon.png");
export const EngineIcon = icon("/images/icons/engine-icon.png");
export const VehicleTypeIcon = icon("/images/icons/vehicle-type-icon.png");
export const ShieldIcon = icon("/images/icons/shield-icon.png");
export const WrenchIcon = icon("/images/icons/wrench-icon.png");
export const TagIcon = icon("/images/icons/tag-icon.png");
export const SwatchIcon = icon("/images/icons/swatch-icon.png");

const ChatIconRed = icon("/images/icons/chat-icon.png");
const ChatIconWhite = icon("/images/icons/chat-icon-white.png");

/** "Chat with Us" VDP contact action + the mobile floating chat button. */
export function ChatIcon({ className, tone = "red" }: IconProps & { tone?: "red" | "white" }) {
  const Icon = tone === "white" ? ChatIconWhite : ChatIconRed;
  return <Icon className={className} />;
}

const GridIconDark = icon("/images/icons/grid-icon.png");
const GridIconWhite = icon("/images/icons/grid-icon-white.png");
const ListIconDark = icon("/images/icons/list-icon.png");
const ListIconWhite = icon("/images/icons/list-icon-white.png");
const FilterIconDark = icon("/images/icons/filter-icon.png");
const FilterIconWhite = icon("/images/icons/filter-icon-white.png");

/** VRP grid/list view toggle — `tone="white"` for use on a solid red active button. */
export function GridIcon({ className, tone = "dark" }: IconProps & { tone?: "dark" | "white" }) {
  const Icon = tone === "white" ? GridIconWhite : GridIconDark;
  return <Icon className={className} />;
}
export function ListIcon({ className, tone = "dark" }: IconProps & { tone?: "dark" | "white" }) {
  const Icon = tone === "white" ? ListIconWhite : ListIconDark;
  return <Icon className={className} />;
}
/** VRP "Filters (N)" trigger — `tone="white"` for the solid red mobile button. */
export function FilterIcon({ className, tone = "dark" }: IconProps & { tone?: "dark" | "white" }) {
  const Icon = tone === "white" ? FilterIconWhite : FilterIconDark;
  return <Icon className={className} />;
}

/** Two color variants exist as separate files — pick with `tone`. */
export function ArrowRightIcon({ className, tone = "red" }: IconProps & { tone?: "red" | "white" }) {
  const src = tone === "white" ? "/images/icons/arrow-right-icon-white.png" : "/images/icons/arrow-right-icon.png";
  return <Image src={src} alt="" width={64} height={64} aria-hidden="true" className={className} />;
}

/** Always spins; two color variants exist for light vs. on-red-button use. */
export function SpinnerIcon({ className, tone = "red" }: IconProps & { tone?: "red" | "white" }) {
  const src = tone === "white" ? "/images/icons/spinner-icon-white.png" : "/images/icons/spinner-icon.png";
  return (
    <Image
      src={src}
      alt=""
      width={64}
      height={64}
      aria-hidden="true"
      className={`animate-spin ${className ?? ""}`.trim()}
    />
  );
}

/** Save/like toggle used on vehicle cards — two color variants for the unsaved/saved state. */
export function ThumbsUpIcon({ className, active = false }: IconProps & { active?: boolean }) {
  const Icon = active ? ThumbsUpIconFilled : ThumbsUpIconOutline;
  return <Icon className={className} />;
}

const specIconMap: Record<SpecIconName, (props: IconProps) => React.ReactElement> = {
  transmission: GaugeIcon,
  fuel: FuelIcon,
  seats: SeatsIcon,
  mileage: GaugeIcon,
  body: BodyIcon,
  drivetrain: DrivetrainIcon,
  dimensions: DimensionsIcon,
  engine: EngineIcon,
  color: SwatchIcon,
  identifier: TagIcon,
};

export function SpecIcon({ name, ...props }: { name: SpecIconName } & IconProps) {
  const Icon = specIconMap[name];
  return <Icon {...props} />;
}
