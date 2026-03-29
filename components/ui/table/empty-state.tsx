// components/ui/table/empty-state.tsx
import { cn } from "@/lib/utils";

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
        className={cn(
          "px-[var(--table-padding-x)] py-10 text-center text-[var(--table-muted)]"
        )}      >
        {message}
      </td>
    </tr>
  );
}