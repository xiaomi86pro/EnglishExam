// components/ui/table/empty-state.tsx
import React from "react";

interface EmptyStateProps {
  colSpan?: number;
  message?: string;
}

export function EmptyState({
  colSpan,
  message = "No data available.",
}: EmptyStateProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-[var(--table-padding-x)] py-10 text-center text-[var(--table-muted)]"
      >
        {message}
      </td>
    </tr>
  );
}