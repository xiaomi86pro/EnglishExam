// components/ui/table/table-header.tsx
import { cn } from "@/lib/utils";
import React from "react";

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export function TableHeader({
  children,
  className,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      className={cn(
        "sticky top-0 z-10",
        "bg-[var(--table-header-bg)]",
        "text-[var(--table-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}