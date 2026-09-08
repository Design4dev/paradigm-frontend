import { MapPinIcon, StarIcon, ThumbsUpIconOutline, WrenchIcon } from "@/components/ui/Icons";

/**
 * Compact trust strip (page-03-vdp.md §10). Uses the exact short labels
 * shown in the VDP reference ("Competitive Financing", "Upfitting
 * Available", "Canada-Wide Support", "Trusted by Businesses") rather than
 * the Homepage/VRP BenefitStrip's differently-worded two-line copy — this
 * page's own reference screenshot is the priority-1 source of truth for it.
 * Icons are reused from the existing set rather than adding new ones.
 */
const TRUST_POINTS = [
  { icon: StarIcon, label: "Competitive Financing" },
  { icon: WrenchIcon, label: "Upfitting Available" },
  { icon: MapPinIcon, label: "Canada-Wide Support" },
  { icon: ThumbsUpIconOutline, label: "Trusted by Businesses" },
];

export function VehicleTrustCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {TRUST_POINTS.map((point) => (
        <div key={point.label} className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-border bg-surface px-3 py-4 text-center">
          <point.icon className="h-6 w-6" />
          <span className="text-caption-s text-primary-black">{point.label}</span>
        </div>
      ))}
    </div>
  );
}
