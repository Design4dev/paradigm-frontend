import type { ReactNode } from "react";

/** A component that accepts an optional Tailwind `className` override. */
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: ReactNode;
}

/** Cursor-free, offset-free pagination shape used by mock/list endpoints in this prototype. */
export interface Paginated<T> {
  items: T[];
  total: number;
}
