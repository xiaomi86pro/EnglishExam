"use client";

import { Input } from "@/components/ui/input/text-input";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  selectedCount: number;
  onBulkDelete?: () => void;
};

export function QuestionListToolbar({
  search,
  onSearchChange,
  selectedCount,
  onBulkDelete,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Input
        placeholder="Search questions..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm">
            {selectedCount} selected
          </span>
          <button
            onClick={onBulkDelete}
            className="rounded-md border px-3 py-1 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}