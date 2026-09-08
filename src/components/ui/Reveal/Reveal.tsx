"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

/**
 * Subtle opacity + translate reveal on first viewport entry
 * (design.md §6 / page-01-homepage.md §10). No-ops under
 * prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [observedVisible, setObservedVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setObservedVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const visible = reducedMotion || observedVisible;
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-[var(--ease-out-standard)]",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
