"use client";

import { QuickQuoteModal } from "@/features/leads/components/QuickQuoteModal";
import { QuoteProvider } from "@/features/leads/components/QuoteProvider";
import { SearchOverlay } from "@/features/search/components/SearchOverlay";
import { SearchProvider } from "@/features/search/components/SearchProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QuoteProvider>
      <SearchProvider>
        {children}
        <QuickQuoteModal />
        <SearchOverlay />
      </SearchProvider>
    </QuoteProvider>
  );
}
