"use client";

import type { QuestionListItem } from "@/types/question/question-list.domain";
import type {
  QuestionListSortBy,
  SortOrder,
} from "@/types/question/question-list.rpc";

import { Table } from "@/components/ui/table/table";
import { SortableHeader } from "@/components/ui/table/sortable-header";

interface QuestionListTableProps {
  items: QuestionListItem[];
  sortBy: QuestionListSortBy;
  sortOrder: SortOrder;
  onSortChange: (field: QuestionListSortBy) => void;
}

export function QuestionListTable({
  items,
  sortBy,
  sortOrder,
  onSortChange,
}: QuestionListTableProps) {
  const getDirection = (
    field: QuestionListSortBy
  ): "asc" | "desc" | null =>
    sortBy === field ? sortOrder : null;

  return (
    <Table>
      <thead>
        <tr>
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
          <tr key={item.id}>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>{item.difficultyLabel}</td>
            <td>{item.usageCount}</td>
            <td>{item.questionText}</td>
            <td>{item.questionTypeCode ?? "--"}</td>
            <td>{item.isActive ? "Active" : "Inactive"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}