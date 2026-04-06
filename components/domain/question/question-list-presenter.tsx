"use client";

import { QuestionCardGrid } from "./question-card-grid";
import { QuestionListTable } from "./question-list-table";

import type { QuestionListItem } from "@/types/question/question-list.domain";
import type {
  QuestionListSortBy,
  SortOrder,
} from "@/types/question/question-list.domain";

interface QuestionListPresenterProps {
  viewMode: "table" | "card";
  items: QuestionListItem[];
  sortBy: QuestionListSortBy;
  sortOrder: SortOrder;
  onSortChange: (field: QuestionListSortBy) => void;
  selectedIds: Set<number>;
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: () => void;
  selection: {
    isSelected: (id: number) => boolean;
    toggle: (id: number, checked: boolean) => void;
  };
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
}

export function QuestionListPresenter({
  viewMode,
  items,
  sortBy,
  sortOrder,
  onSortChange,
  selectedIds,
  allSelected,
  someSelected,
  onSelectAll,
  selection,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}: QuestionListPresenterProps) {
  if (viewMode === "table") {
    return (
      <QuestionListTable
        items={items}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
        selectedIds={selectedIds}
        allSelected={allSelected}
        someSelected={someSelected}
        onSelectAll={onSelectAll}
        onToggleSelection={selection.toggle}
        onView={onView}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    );
  }

  return (
    <QuestionCardGrid
      items={items}
      selection={selection}
      onView={onView}
      onEdit={onEdit}
      onDuplicate={onDuplicate}
      onDelete={onDelete}
    />
  );
}
