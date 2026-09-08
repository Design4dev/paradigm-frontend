"use client";

import { useEffect, useState } from "react";

/**
 * Next.js re-mounts `template.tsx` on every navigation, giving us a short,
 * restrained opacity/transform transition between the Homepage and VDP
 * (page-01-homepage.md §10, design.md §6) without a large theatrical
 * animation library.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`transition-[opacity,transform] duration-300 ease-[var(--ease-out-standard)] motion-reduce:transition-none ${
        entered ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
