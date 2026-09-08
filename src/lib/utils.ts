type ClassValue = string | number | null | undefined | false | ClassValue[];

function flatten(value: ClassValue, out: string[]) {
  if (!value && value !== 0) return;
  if (Array.isArray(value)) {
    value.forEach((item) => flatten(item, out));
    return;
  }
  out.push(String(value));
}

/** Minimal `clsx`-style class combiner — avoids adding a dependency. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  values.forEach((value) => flatten(value, out));
  return out.join(" ");
}
