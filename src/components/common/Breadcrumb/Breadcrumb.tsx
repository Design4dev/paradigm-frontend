import { ChevronRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the last (current-page) item. */
  href?: string;
}

/**
 * Compact breadcrumb trail (page-03-vdp.md §5). Truncates gracefully on
 * mobile by letting long labels ellipsis rather than wrap, and keeps the
 * current page as plain (non-link) text with aria-current for screen
 * readers.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="text-caption-s flex min-w-0 items-center gap-1.5 text-dark-neutral/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={cn("flex min-w-0 items-center gap-1.5", isLast && "shrink")}>
              {index > 0 && <ChevronRightIcon className="h-3 w-3 shrink-0 opacity-50" />}
              {item.href && !isLast ? (
                <Link href={item.href} className="focus-ring truncate rounded hover:text-primary-red">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="truncate text-primary-black">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
