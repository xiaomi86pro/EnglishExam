// components/ui/table/sortable-header.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type SortDirection = "asc" | "desc" | null;

interface SortableHeaderProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  direction?: SortDirection;
  onSort?: () => void;
}

export function SortableHeader({
  children,
  direction = null,
  onSort,
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
          <ChevronUp
            size={14}
            className={cn(
              direction === "asc"
                ? "opacity-100"
                : "opacity-30"
            )}
          />
          <ChevronDown
            size={14}
            className={cn(
              direction === "desc"
                ? "opacity-100"
                : "opacity-30"
            )}
          />
        </div>
      </div>
    </th>
  );
}