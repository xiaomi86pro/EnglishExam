// components/ui/table/table-row.tsx
import { cn } from "@/lib/utils";
import React from "react";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export function TableRow({
  children,
  className,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-[var(--table-border)]",
        "hover:bg-[var(--table-row-hover)] transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}