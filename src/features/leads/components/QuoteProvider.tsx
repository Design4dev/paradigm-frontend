"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export interface QuotePrefill {
  slug: string;
  name: string;
  /** Shown inside the quote form so the visitor never has to re-state which vehicle they mean (page-03-vdp.md §22). */
  stockNumber?: string;
  priceLabel?: string;
  /** No separate test-drive scheduler exists yet — "Book a Test Drive" opens this same real lead form with adjusted copy. */
  intent?: "quote" | "test-drive";
}

interface QuoteContextValue {
  isOpen: boolean;
  vehicle: QuotePrefill | null;
  openQuote: (vehicle?: QuotePrefill, trigger?: HTMLElement | null) => void;
  closeQuote: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [vehicle, setVehicle] = useState<QuotePrefill | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openQuote = useCallback((nextVehicle?: QuotePrefill, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setVehicle(nextVehicle ?? null);
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, vehicle, openQuote, closeQuote, triggerRef }),
    [isOpen, vehicle, openQuote, closeQuote]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
}
