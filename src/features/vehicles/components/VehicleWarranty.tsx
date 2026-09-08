import { ShieldIcon, WrenchIcon } from "@/components/ui/Icons";
import { WARRANTY_ITEMS } from "@/features/vehicles/services/vehicles.service";
import Link from "next/link";

const iconByName = { shield: ShieldIcon, wrench: WrenchIcon } as const;

/** Warranty & Protection (page-03-vdp.md §16) — static, approved company-wide coverage copy, not a per-vehicle claim. */
export function VehicleWarranty() {
  return (
    <section aria-labelledby="warranty-heading">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="warranty-heading" className="text-heading-l">
          Warranty & Protection
        </h2>
        <Link href="/contact" className="focus-ring text-label-m rounded text-primary-red hover:underline">
          Learn More →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {WARRANTY_ITEMS.map((item) => {
          const Icon = iconByName[item.icon];
          return (
            <div key={item.label} className="flex flex-col items-start gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-gray">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-label-m text-primary-black">{item.label}</p>
                <p className="text-caption-s text-dark-neutral/60">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
