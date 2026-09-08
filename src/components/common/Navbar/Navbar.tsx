"use client";

import type { NavItem } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Primary marketing-site nav list, shared by the desktop Header and MobileMenu. */
export function Navbar({ items, className, itemClassName }: { items: NavItem[]; className?: string; itemClassName?: string }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "focus-ring text-label-m relative inline-flex items-center px-3 py-2 text-primary-black transition-colors duration-[var(--duration-micro)] hover:text-primary-red",
                active && "font-bold text-primary-red",
                itemClassName
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-red transition-transform duration-[var(--duration-micro)] ease-[var(--ease-out-standard)]",
                  active ? "scale-x-100" : "scale-x-0"
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
