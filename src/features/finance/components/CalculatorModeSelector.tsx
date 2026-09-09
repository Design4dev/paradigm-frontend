"use client";

import { cn } from "@/lib/utils";
import type { CalculatorMode } from "@/features/finance/types/calculator.types";

const MODES: { id: CalculatorMode; title: string; body: string }[] = [
  {
    id: "vehiclePrice",
    title: "What price is the vehicle you're looking to buy?",
    body: "I know the vehicle price and want to see my estimated payment.",
  },
  {
    id: "targetPayment",
    title: "How much are you looking to spend per payment?",
    body: "I want to set a budget and see what vehicles I can afford.",
  },
];

/**
 * The two calculation-mode cards (§10/§11). Radio semantics under the hood
 * (one true selection, keyboard-operable) styled as selectable cards per the
 * reference — red border/accent when selected, neutral otherwise.
 */
export function CalculatorModeSelector({ mode, onChange }: { mode: CalculatorMode; onChange: (mode: CalculatorMode) => void }) {
  return (
    <div role="radiogroup" aria-label="Payment calculation type" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {MODES.map((option) => {
        const selected = mode === option.id;
        return (
          <label
            key={option.id}
            className={cn(
              "focus-within:ring-primary-red relative flex cursor-pointer flex-col gap-1.5 rounded-[var(--radius-card)] border-2 bg-surface p-4 transition-colors duration-[var(--duration-micro)]",
              selected ? "border-primary-red" : "border-border hover:border-dark-neutral/30"
            )}
          >
            <input
              type="radio"
              name="calculator-mode"
              value={option.id}
              checked={selected}
              onChange={() => onChange(option.id)}
              className="sr-only"
            />
            <span className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                  selected ? "border-primary-red" : "border-border"
                )}
              >
                {selected && <span className="h-2 w-2 rounded-full bg-primary-red" />}
              </span>
              <span className="text-label-m text-primary-black">{option.title}</span>
            </span>
            <span className="text-caption-s pl-[1.625rem] text-dark-neutral/60">{option.body}</span>
          </label>
        );
      })}
    </div>
  );
}
