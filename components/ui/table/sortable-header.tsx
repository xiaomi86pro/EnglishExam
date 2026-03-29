// components/ui/table/sortable-header.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

type SortDirection = "asc" | "desc" | null;

interface SortableHeaderProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  direction?: SortDirection;
  onSort?: () => void;
  ascIcon?: React.ReactNode;
  descIcon?: React.ReactNode;
}

export function SortableHeader({
  children,
  direction = null,
  onSort,
  ascIcon,
  descIcon,
  className,
  ...props
}: SortableHeaderProps) {
  return (
    <th
      onClick={onSort}
      className={cn(
        "px-[var(--table-padding-x)] py-[var(--table-padding-y)]",
        "font-[var(--table-header-weight)]",
        "cursor-pointer select-none",
        "transition-colors",
        "hover:text-[var(--table-text)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        <div className="flex flex-col">
          <span
            className={cn(
              "text-xs leading-none",
              direction === "asc" ? "opacity-100" : "opacity-30"
            )}
            aria-hidden="true"
          >
            {ascIcon ?? "▲"}
          </span>
          <span
            className={cn(
              "text-xs leading-none",
              direction === "desc" ? "opacity-100" : "opacity-30"
            )}
            aria-hidden="true"
          >
            {descIcon ?? "▼"}
          </span>
        </div>
      </div>
    </th>
  );
}