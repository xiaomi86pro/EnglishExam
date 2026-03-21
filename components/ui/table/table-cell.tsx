// components/ui/table/table-cell.tsx
import { cn } from "@/lib/utils";
import React from "react";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function TableCell({
  children,
  className,
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn(
        "px-[var(--table-padding-x)] py-[var(--table-padding-y)]",
        "align-middle",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}