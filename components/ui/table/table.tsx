// components/ui/table/table.tsx
import { cn } from "@/lib/utils";
import React from "react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-auto",
        "rounded-[var(--table-radius)] border",
        "border-[var(--table-border)] bg-[var(--table-bg)]"
      )}
    >
      <table
        className={cn(
          "w-full border-collapse text-left",
          "[font-size:var(--table-font-size)] [color:var(--table-text)]",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}