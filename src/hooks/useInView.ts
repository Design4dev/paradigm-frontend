"use client";

import { useEffect, useState } from "react";

/** True once any part of `ref`'s element is on-screen — used to pause auto-advancing carousels/sliders once they scroll out of view. */
export function useInView<T extends HTMLElement>(ref: React.RefObject<T | null>, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}
