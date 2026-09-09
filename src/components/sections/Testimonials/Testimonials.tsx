"use client";

import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCard, type Testimonial } from "@/components/sections/TestimonialCard";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

/**
 * Representative customer sentiment, paraphrased from Paradigm Fleet's
 * public reviews (page-01-homepage.md §16/§21 — real content, not invented
 * claims). Attributed by role/location rather than a private individual's
 * name; see README "Testimonials" note before this ships with real,
 * client-approved, individually-attributed quotes.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They outfit the van and take care of everything — very honest people. We were in a fully set-up work van inside a week.",
    role: "Trades Contractor",
    location: "Hamilton, ON",
  },
  {
    quote:
      "Interior shelving, ladder rack, decals — all handled quickly and communicated clearly the whole way through.",
    role: "Fleet Operations Lead",
    location: "Burlington, ON",
  },
  {
    quote:
      "Knowledgeable staff who went above and beyond to get our crew vehicles on the road with the right upfit for our jobs.",
    role: "Owner, HVAC Services",
    location: "Kitchener, ON",
  },
];

const AUTO_ADVANCE_MS = 6000;

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const inView = useInView(trackRef);

  // Scrolls the track itself (`track.scrollTo`), never an ancestor — unlike
  // `Element.scrollIntoView()`, which can bubble up and scroll the whole
  // page vertically to bring an off-screen card back into view. That bug
  // was the cause of the page jumping to this section on its own while the
  // auto-advance timer kept firing after the visitor had scrolled away.
  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const wrapped = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    const card = track.children[wrapped] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
    setActiveIndex(wrapped);
  };

  // Reads the ACTUAL current slide from live scroll position rather than
  // trusting `activeIndex` state, which can lag behind mid-scroll (e.g. the
  // visitor clicks Next again before the previous smooth-scroll finishes) —
  // that lag was the cause of Prev/Next occasionally jumping two slides on
  // mobile instead of exactly one.
  const getCurrentIndex = () => {
    const track = trackRef.current;
    if (!track) return activeIndex;
    const cardWidth = (track.children[0] as HTMLElement | undefined)?.offsetWidth ?? track.clientWidth;
    const index = Math.round(track.scrollLeft / (cardWidth + 20));
    return Math.min(Math.max(index, 0), TESTIMONIALS.length - 1);
  };

  const handleScroll = () => setActiveIndex(getCurrentIndex());

  const goToRelative = (delta: 1 | -1) => scrollToIndex(getCurrentIndex() + delta);

  // Auto-slide — pauses on hover/focus (so it never fights a reading user),
  // stops entirely once the carousel scrolls out of view, and is disabled
  // under prefers-reduced-motion.
  useEffect(() => {
    if (paused || reducedMotion || !inView) return;
    const interval = setInterval(() => {
      scrollToIndex(activeIndex + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, paused, reducedMotion, inView]);

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="container-page py-16 sm:py-20">
      <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 id="reviews-heading" className="text-heading-l max-w-xl">
          Trusted by Businesses Across Southern Ontario
        </h2>
        <div className="flex items-center gap-2">
          <IconButton aria-label="Previous testimonial" onClick={() => goToRelative(-1)}>
            <ChevronLeftIcon className="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Next testimonial" onClick={() => goToRelative(1)}>
            <ChevronRightIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </Reveal>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="grid grid-flow-col auto-cols-[85%] items-stretch gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 sm:auto-cols-[46%] lg:auto-cols-[31.5%]"
      >
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.role} className="h-full snap-start">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {TESTIMONIALS.map((testimonial, index) => (
          <button
            key={testimonial.role}
            type="button"
            aria-label={`Show testimonial ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => scrollToIndex(index)}
            className={`focus-ring h-2 w-2 rounded-full transition-colors duration-[var(--duration-micro)] ${
              index === activeIndex ? "bg-primary-red" : "bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
