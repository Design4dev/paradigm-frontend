"use client";

import { AccordionItem } from "@/components/ui/Accordion";
import { useVdpSections } from "@/features/vehicles/components/VdpSectionsContext";
import { MEDIA_QUERIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useRef } from "react";

export interface VdpSection {
  id: string;
  label: string;
  content: React.ReactNode;
}

/**
 * Section navigation (page-03-vdp.md §11). Desktop renders every section's
 * content together on the page with a sticky, rounded segmented tab bar
 * pinned just under the header — clicking a tab smoothly scrolls to that
 * section, and scroll-spy (IntersectionObserver) keeps the active tab in
 * sync as the visitor scrolls past each one, so it never requires
 * scrolling back up to switch sections. Tablet/mobile instead render every
 * section as an independent accordion row. Financing is intentionally not
 * part of this list — it's a standalone section elsewhere on the page.
 */
export function VehicleSectionNav({ sections }: { sections: VdpSection[] }) {
  const isDesktop = useMediaQuery(MEDIA_QUERIES.lgUp);
  const { activeId, setActiveId, scrollToSection } = useVdpSections();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!isDesktop) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Prefer whichever intersecting section is closest to the top of the viewport.
          const top = visible.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-156px 0px -60% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, sections.map((s) => s.id).join(",")]);

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
      {/* top-[85px] = header height (~69px) + 16px, so the bar sits with a visible gap under the header once stuck, not flush against it. */}
      <nav
        aria-label="Vehicle detail sections"
        className="sticky top-[85px] z-20 rounded-[var(--radius-card)] border border-border bg-surface p-1.5 shadow-sm"
      >
        <ul className="flex flex-wrap gap-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={activeId === section.id ? "true" : undefined}
                className={cn(
                  "focus-ring text-label-m whitespace-nowrap rounded-[var(--radius-control)] px-4 py-2.5 transition-colors duration-[var(--duration-micro)]",
                  activeId === section.id
                    ? "bg-primary-red text-primary-white"
                    : "text-dark-neutral/70 hover:bg-soft-gray hover:text-primary-black"
                )}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-14 pt-10">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
            // Matches the sticky nav's own height + top offset (+ its 16px gap under the header) so a scrolled-to section never lands hidden underneath it.
            className="scroll-mt-[152px]"
          >
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}
