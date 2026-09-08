"use client";

import { useCallback, useState } from "react";

/**
 * A `useState`-shaped hook backed by `localStorage`. Safe to call during SSR
 * (falls back to `initialValue` until mounted) and swallows storage errors
 * (private browsing, quota, disabled storage) instead of throwing.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage unavailable (private mode, quota, SSR) — state still updates in-memory.
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setStoredValue] as const;
}
