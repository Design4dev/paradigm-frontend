import { BodyIcon, DimensionsIcon, DrivetrainIcon, MapPinIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const BENEFITS = [
  { icon: BodyIcon, title: "Work-Ready Inventory", body: "Vans, trucks and more" },
  { icon: DimensionsIcon, title: "Flexible Financing", body: "Solutions that fit" },
  { icon: DrivetrainIcon, title: "Custom Upfitting", body: "Built for your business" },
  { icon: MapPinIcon, title: "Local & Trusted", body: "Southern Ontario" },
];

/**
 * Compact 4-point benefit strip (page-01-homepage.md §9). Shared between the
 * Homepage Hero and the VRP (page-02-vrp.md §20 — "reuse the compact
 * Paradigm Fleet benefit strip from the Homepage") rather than duplicated.
 */
export function BenefitStrip({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <div
      className={cn(
        tone === "dark" ? "border-t border-primary-white/10 bg-primary-black/60" : "border-t border-border bg-soft-gray",
        className
      )}
    >
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:grid-cols-4 sm:gap-x-4">
        {BENEFITS.map((benefit, index) => (
          <div
            key={benefit.title}
            className={cn(
              "flex items-center gap-3",
              index > 0 && (tone === "dark" ? "sm:border-l sm:border-primary-white/10 sm:pl-4" : "sm:border-l sm:border-border sm:pl-4")
            )}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-red/15">
              <benefit.icon className="h-5 w-5 text-primary-red" />
            </span>
            <span>
              <span className={cn("text-label-m block", tone === "dark" ? "text-primary-white" : "text-primary-black")}>
                {benefit.title}
              </span>
              <span className={cn("text-caption-s block", tone === "dark" ? "text-primary-white/60" : "text-dark-neutral/60")}>
                {benefit.body}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
