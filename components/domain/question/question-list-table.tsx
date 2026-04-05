"use client";

import type { QuestionListItem } from "@/types/question/question-list.domain";
import type {
  QuestionListSortBy,
  SortOrder,
} from "@/types/question/question-list.rpc";
import { QuestionListItemRow } from "./question-list-item";
import { Table } from "@/components/ui/table/table";
import { SortableHeader } from "@/components/ui/table/sortable-header";

interface QuestionListTableProps {
  items: QuestionListItem[];
  sortBy: QuestionListSortBy;
  sortOrder: SortOrder;
  onSortChange: (field: QuestionListSortBy) => void;
  selectedIds: number[];
  onToggleSelection: (id: number, checked: boolean) => void;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
}

export function QuestionListTable({
  items,
  sortBy,
  sortOrder,
  onSortChange,
  selectedIds,
  onToggleSelection,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}: QuestionListTableProps) {
  const getDirection = (field: QuestionListSortBy): "asc" | "desc" | null =>
    sortBy === field ? sortOrder : null;

  return (
    <Table>
      <thead>
        <tr>
          <th>Select</th>

          <SortableHeader
            direction={getDirection("created_at")}
            onSort={() => onSortChange("created_at")}
          >
            Created
          </SortableHeader>

          <SortableHeader
            direction={getDirection("updated_at")}
            onSort={() => onSortChange("updated_at")}
          >
            Updated
          </SortableHeader>

          <SortableHeader
            direction={getDirection("difficulty")}
            onSort={() => onSortChange("difficulty")}
          >
            Difficulty
          </SortableHeader>

          <SortableHeader
            direction={getDirection("usage_count")}
            onSort={() => onSortChange("usage_count")}
          >
            Usage
          </SortableHeader>

          <th>Question</th>
          <th>Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <QuestionListItemRow
            key={item.id}
            item={item}
            checked={selectedIds.includes(item.id)}
            onCheckedChange={(checked) =>
              onToggleSelection(item.id, Boolean(checked))
            }
            onView={() => onView(item.id)}
            onEdit={() => onEdit(item.id)}
            onDelete={() => onDelete(item.id)}
            onDuplicate={() => onDuplicate(item.id)}
          />
        ))}
      </tbody>
    </Table>
  );
}
