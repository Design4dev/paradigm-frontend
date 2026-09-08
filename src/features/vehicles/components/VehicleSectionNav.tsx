"use client";

import { AccordionItem } from "@/components/ui/Accordion";
import { useVdpSections } from "@/features/vehicles/components/VdpSectionsContext";
import { MEDIA_QUERIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface VdpSection {
  id: string;
  label: string;
  content: React.ReactNode;
}

/**
 * Section navigation (page-03-vdp.md §11). Desktop renders a true tab strip
 * — sticky under the header so it's always reachable, switching tabs swaps
 * the panel below instantly instead of scrolling/jumping to an anchor
 * further down the page. Tablet/mobile instead render every section as an
 * independent accordion row, headers doubling as the nav. Both share the
 * same `activeId` (via `VdpSectionsProvider`) so a cross-link elsewhere on
 * the page (VehiclePrice's "View Pricing Details") can drive either mode.
 */
export function VehicleSectionNav({ sections }: { sections: VdpSection[] }) {
  const isDesktop = useMediaQuery(MEDIA_QUERIES.lgUp);
  const { activeId, setActiveId } = useVdpSections();
  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];

  if (!isDesktop) {
    return (
      <div id="vdp-sections" className="flex flex-col divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface px-5">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            title={section.label}
            contentClassName="pb-5"
            open={activeId === section.id}
            onOpenChange={(open) => setActiveId(open ? section.id : null)}
          >
            {section.content}
          </AccordionItem>
        ))}
      </div>
    );
  }

  return (
    <div id="vdp-sections">
      <nav aria-label="Vehicle detail sections" className="sticky top-[69px] z-20 -mx-1 border-b border-border bg-surface px-1">
        <ul className="flex flex-wrap gap-6">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => setActiveId(section.id)}
                aria-current={activeSection?.id === section.id ? "true" : undefined}
                className={cn(
                  "focus-ring text-label-m -mb-px border-b-2 py-3 transition-colors duration-[var(--duration-micro)]",
                  activeSection?.id === section.id
                    ? "border-primary-red text-primary-red"
                    : "border-transparent text-dark-neutral/60 hover:text-primary-black"
                )}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pt-10">{activeSection?.content}</div>
    </div>
  );
}
