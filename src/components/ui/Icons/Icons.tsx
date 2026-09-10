import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Car,
  Check,
  ClipboardList,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cog,
  CreditCard,
  Filter,
  Fuel,
  Gauge,
  Hash,
  Heart,
  IdCard,
  ImageOff,
  Info,
  LayoutGrid,
  List,
  ListChecks,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Package,
  Palette,
  Pause,
  Phone,
  Play,
  RefreshCw,
  Ruler,
  Search,
  SearchX,
  Share2,
  ShieldCheck,
  Star,
  ThumbsUp,
  Truck,
  Upload,
  User,
  Users,
  Wrench,
  X,
  XCircle,
  type LucideProps,
} from "lucide-react";
import type { SpecIconName } from "@/features/vehicles/types/vehicle.types";

/**
 * Icon system: production-ready SVG icons from `lucide-react`, chosen per
 * icon for what it actually represents (search → magnifying glass, phone →
 * handset, wrench → service, etc.) rather than filling space decoratively.
 * Every icon below is `currentColor`-based, so a wrapping `text-*` class
 * (or an explicit `tone`/`color` prop on the handful that need one
 * regardless of ambient context) controls it directly — no baked-color
 * file variants needed. All icons are decorative (`aria-hidden`); the
 * interactive control around them carries the real accessible label.
 */
export interface IconProps {
  className?: string;
}

const DEFAULT_SIZE = 20;
const DEFAULT_STROKE = 1.75;

function icon(Lucide: React.ComponentType<LucideProps>) {
  function IconComponent({ className }: IconProps) {
    return <Lucide aria-hidden="true" size={DEFAULT_SIZE} strokeWidth={DEFAULT_STROKE} className={className} />;
  }
  return IconComponent;
}

export const SearchIcon = icon(Search);
export const MenuIcon = icon(Menu);
export const CloseIcon = icon(X);
export const ChevronRightIcon = icon(ChevronRight);
export const ChevronLeftIcon = icon(ChevronLeft);
export const MapPinIcon = icon(MapPin);
export const CalendarIcon = icon(Calendar);
export const CheckIcon = icon(Check);
export const CheckCircleIcon = icon(CheckCircle2);
export const AlertIcon = icon(AlertTriangle);
export const StarIcon = icon(Star);
export const ImageOffIcon = icon(ImageOff);
export const MailIcon = icon(Mail);
export const ShareIcon = icon(Share2);
export const GaugeIcon = icon(Gauge);
export const FuelIcon = icon(Fuel);
export const SeatsIcon = icon(Users);
export const BodyIcon = icon(Car);
export const DrivetrainIcon = icon(Cog);
export const DimensionsIcon = icon(Ruler);
export const EngineIcon = icon(Cog);
export const VehicleTypeIcon = icon(Truck);
export const ShieldIcon = icon(ShieldCheck);
export const WrenchIcon = icon(Wrench);
export const TagIcon = icon(Hash);
export const SwatchIcon = icon(Palette);
export const ResourceIcon = icon(BookOpen);
export const ClipboardIcon = icon(ClipboardList);
export const NoResultsIcon = icon(SearchX);
export const InfoIcon = icon(Info);
export const ErrorIcon = icon(XCircle);
export const PauseIcon = icon(Pause);
export const PlayIcon = icon(Play);
export const UploadIcon = icon(Upload);
export const RetryIcon = icon(RefreshCw);
export const CustomerIcon = icon(User);
export const PaymentIcon = icon(CreditCard);
export const LockIcon = icon(Lock);
export const LicenseIcon = icon(IdCard);
export const ExtrasIcon = icon(Package);
export const ReviewIcon = icon(ListChecks);

/**
 * Social brand marks — `lucide-react` dropped its brand-icon set some
 * versions back, so these are hand-drawn to the same 24x24/stroke-1.75
 * geometry as every other icon here (not raster) so they stay crisp at any
 * size and pick up `currentColor` like the rest of the system.
 */
function brandIcon(paths: React.ReactNode) {
  function BrandIconComponent({ className, size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE }: LucideProps) {
    return (
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {paths}
      </svg>
    );
  }
  return BrandIconComponent;
}

export const LinkedinIcon = brandIcon(
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1.5A5.98 5.98 0 0 1 16 8Z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </>
);

export const InstagramIcon = brandIcon(
  <>
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <path d="M17.5 6.5h.01" />
  </>
);

export const FacebookIcon = brandIcon(
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
);

/**
 * Icons that need an explicit color regardless of ambient text color (e.g.
 * always-red-by-default on a light background, `tone="white"` on a solid
 * red/dark surface) — `tone` maps to a `text-*` class the SVG's
 * `currentColor` stroke/fill then picks up.
 */
function toneIcon(Lucide: React.ComponentType<LucideProps>, defaultTone: "red" | "white" | "dark" = "red") {
  const toneClass = { red: "text-primary-red", white: "text-primary-white", dark: "text-primary-black" } as const;
  function ToneIconComponent({ className, tone = defaultTone }: IconProps & { tone?: "red" | "white" | "dark" }) {
    return (
      <Lucide
        aria-hidden="true"
        size={DEFAULT_SIZE}
        strokeWidth={DEFAULT_STROKE}
        className={[toneClass[tone], className].filter(Boolean).join(" ")}
      />
    );
  }
  return ToneIconComponent;
}

export const PhoneIcon = toneIcon(Phone, "red");
export const ChatIcon = toneIcon(MessageCircle, "red");
export const GridIcon = toneIcon(LayoutGrid, "dark");
export const ListIcon = toneIcon(List, "dark");
export const FilterIcon = toneIcon(Filter, "dark");
export const ArrowRightIcon = toneIcon(ArrowRight, "red");

/** Always spins; `tone` picks the color for use on a light background vs. a solid red button. */
export function SpinnerIcon({ className, tone = "red" }: IconProps & { tone?: "red" | "white" }) {
  return (
    <Loader2
      aria-hidden="true"
      size={DEFAULT_SIZE}
      strokeWidth={DEFAULT_STROKE}
      className={["animate-spin", tone === "white" ? "text-primary-white" : "text-primary-red", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

/** Outline `ThumbsUpIconOutline`/filled `ThumbsUpIconFilled` are exported for the rare case something needs one explicitly, without the active-toggle wrapper. */
export function ThumbsUpIconOutline({ className }: IconProps) {
  return <ThumbsUp aria-hidden="true" size={DEFAULT_SIZE} strokeWidth={DEFAULT_STROKE} className={className} />;
}
export function ThumbsUpIconFilled({ className }: IconProps) {
  return (
    <ThumbsUp
      aria-hidden="true"
      size={DEFAULT_SIZE}
      strokeWidth={DEFAULT_STROKE}
      fill="currentColor"
      className={["text-primary-red", className].filter(Boolean).join(" ")}
    />
  );
}

/** Outline `HeartIconOutline`/filled `HeartIconFilled` are exported for the rare case something needs one explicitly, without the active-toggle wrapper. */
export function HeartIconOutline({ className }: IconProps) {
  return <Heart aria-hidden="true" size={DEFAULT_SIZE} strokeWidth={DEFAULT_STROKE} className={className} />;
}
export function HeartIconFilled({ className }: IconProps) {
  return (
    <Heart
      aria-hidden="true"
      size={DEFAULT_SIZE}
      strokeWidth={DEFAULT_STROKE}
      fill="currentColor"
      className={["text-primary-red", className].filter(Boolean).join(" ")}
    />
  );
}

/** Save/like toggle used on vehicle cards — filled + red once active, outline otherwise. */
export function HeartIcon({ className, active = false }: IconProps & { active?: boolean }) {
  return active ? <HeartIconFilled className={className} /> : <HeartIconOutline className={className} />;
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
