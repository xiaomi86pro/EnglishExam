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
  onToggleSelection: (
    id: number,
    checked: boolean,
  ) => void;
}

export function QuestionListTable({
  items,
  sortBy,
  sortOrder,
  onSortChange,
  selectedIds,
  onToggleSelection,
}: QuestionListTableProps) {

  console.log("selectedIds", selectedIds);
  
  const getDirection = (
    field: QuestionListSortBy
  ): "asc" | "desc" | null =>
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
        />
      ))}
    </tbody>
  </Table>
);
}