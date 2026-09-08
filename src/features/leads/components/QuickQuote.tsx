"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { useQuote } from "@/features/leads/components/QuoteProvider";

interface QuickQuoteProps extends Omit<ButtonProps, "onClick"> {
  children: React.ReactNode;
}

/** Generic Quick Quote trigger for non-vehicle contexts (Hero, Final CTA). */
export function QuickQuote({ children, ...props }: QuickQuoteProps) {
  const { openQuote } = useQuote();

  return (
    <Button {...props} onClick={(event) => openQuote(undefined, event.currentTarget)}>
      {children}
    </Button>
  );
}
