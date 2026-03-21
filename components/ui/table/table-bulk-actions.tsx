// components/ui/table/table-bulk-actions.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface BulkActionsProps {
  selectedCount: number;
  children: React.ReactNode;
}

export function TableBulkActions({
  selectedCount,
  children,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "mb-4 rounded-xl px-4 py-3",
        "bg-[var(--table-bulk-bg)] text-[var(--table-bulk-text)]"
      )}
    >
      <span className="text-sm font-medium">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
}