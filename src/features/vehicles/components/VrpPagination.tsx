"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface VrpPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Prev / numbered pages (with ellipsis once there are enough of them) / Next
 * — page-02-vrp.md §18. The algorithm supports many pages (e.g. a real
 * "1 2 3 4 5 … 50" backend result set); it just renders fewer numbers today
 * because the honest mock dataset only has a couple of pages worth of
 * vehicles (page-02-vrp.md §27 — don't invent inventory).
 */
export function VrpPagination({ page, totalPages, onPageChange }: VrpPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageList(page, totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-border text-primary-black transition-colors duration-[var(--duration-micro)] hover:border-primary-red hover:text-primary-red disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-primary-black"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {pages.map((entry, index) =>
        entry === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="text-body-m px-1.5 text-dark-neutral/50">
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            aria-label={`Page ${entry}`}
            aria-current={entry === page ? "page" : undefined}
            onClick={() => onPageChange(entry)}
            className={cn(
              "text-label-m focus-ring flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] transition-colors duration-[var(--duration-micro)]",
              entry === page ? "bg-primary-red text-primary-white" : "text-primary-black hover:bg-soft-gray"
            )}
          >
            {entry}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-border text-primary-black transition-colors duration-[var(--duration-micro)] hover:border-primary-red hover:text-primary-red disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-primary-black"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}

function getPageList(current: number, total: number): (number | "ellipsis")[] {
  const delta = 1;
  const range: (number | "ellipsis")[] = [];
  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  range.push(1);
  if (start > 2) range.push("ellipsis");
  for (let i = start; i <= end; i++) range.push(i);
  if (end < total - 1) range.push("ellipsis");
  if (total > 1) range.push(total);

  return range;
}
