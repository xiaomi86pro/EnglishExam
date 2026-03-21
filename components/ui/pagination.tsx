"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(
          "rounded-md border px-3 py-1 text-sm",
          "bg-[var(--control-bg)]",
          "border-[var(--control-border)]",
          "text-[var(--control-text)]",
          "hover:bg-[var(--control-hover)]",
          "disabled:bg-[var(--control-disabled)] disabled:opacity-70 disabled:cursor-not-allowed"
        )}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={cn(
            "rounded-md border px-3 py-1 text-sm",
            p === page
              ? "bg-[var(--control-active)] border-[var(--control-border)]"
              : "bg-[var(--control-bg)] border-[var(--control-border)] hover:bg-[var(--control-hover)]"
          )}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={cn(
          "rounded-md border px-3 py-1 text-sm",
          "bg-[var(--control-bg)]",
          "border-[var(--control-border)]",
          "text-[var(--control-text)]",
          "hover:bg-[var(--control-hover)]",
          "disabled:bg-[var(--control-disabled)] disabled:opacity-70 disabled:cursor-not-allowed"
        )}
      >
        Next
      </button>
    </div>
  );
}