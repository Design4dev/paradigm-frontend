import { Input, type InputProps } from "@/components/ui/Input";

/** Vehicle Price / Down Payment / Target Payment fields — Input with a fixed "$" adornment (§40). */
export function CurrencyInput(props: Omit<InputProps, "leadingText" | "type" | "inputMode">) {
  return <Input {...props} type="text" inputMode="decimal" leadingText="$" />;
}

/** APR field — Input with a fixed "%" adornment (§40). */
export function PercentageInput(props: Omit<InputProps, "trailingText" | "type" | "inputMode">) {
  return <Input {...props} type="text" inputMode="decimal" trailingText="%" />;
}
