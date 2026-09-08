"use client";

import { CheckIcon } from "@/components/ui/Icons";
import type { Vehicle } from "@/features/vehicles/types/vehicle.types";
import Image from "next/image";
import { useState } from "react";

/**
 * "Key Features" visual cards (page-03-vdp.md §14). Each card pairs a real
 * feature elaboration with one of the vehicle's own gallery photos (cycled
 * by index) rather than fabricated macro photography we don't have.
 * "View All Features" expands the vehicle's full feature-tag list inline —
 * there's no separate features page to link to.
 */
export function VehicleKeyFeatures({ vehicle }: { vehicle: Vehicle }) {
  const [expanded, setExpanded] = useState(false);
  const highlights = vehicle.keyFeatures ?? [];

  if (highlights.length === 0) return null;

  return (
    <section aria-labelledby="features-heading">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="features-heading" className="text-heading-l">
          Key Features
        </h2>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="focus-ring text-label-m rounded text-primary-red hover:underline"
        >
          {expanded ? "Hide All Features ←" : "View All Features →"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((feature, index) => {
          const image = vehicle.images[index % vehicle.images.length];
          return (
            <div key={feature.title} className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
              <div className="relative aspect-[4/3] w-full bg-soft-gray">
                <Image src={image.url} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-label-m text-primary-black">{feature.title}</p>
                <p className="text-caption-s mt-1 text-dark-neutral/60">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {expanded && (
        <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 rounded-[var(--radius-card)] border border-border bg-soft-gray p-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicle.features.map((tag) => (
            <li key={tag} className="text-body-m flex items-start gap-2 text-primary-black">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-red" />
              {tag}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
