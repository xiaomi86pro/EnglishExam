"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuestionList } from "@/hooks/queries/use-question-list";
import { useQuestionCategories } from "@/hooks/queries/use-question-categories";
import { useDebounce } from "@/hooks/use-debounce";
import { useSelection } from "@/hooks/core/use-selection";
import { QuestionListToolbar } from "./question-toolbar";
import { QuestionListPresenter } from "./question-list-presenter";
import { mapQuestionCategoryToSelectOption} from "@/lib/mappers/question-category.mapper";

import type {
  QuestionListSortBy,
  SortOrder,
} from "@/types/question/question-list.domain";
import { useDuplicateQuestion } from "@/hooks/mutations/use-duplicate-question";
import { useSoftDeleteQuestion } from "@/hooks/mutations/use-soft-delete-question";

const PAGE_SIZE = 10;

export function QuestionListContainer() {
  // ===============================
  // filter state
  // ===============================
  const router = useRouter();
  const { duplicateQuestion } = useDuplicateQuestion();
  const { softDeleteQuestion } = useSoftDeleteQuestion();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [questionTypeCode, setQuestionTypeCode] = useState<
    string | undefined
  >();
  const [difficulty, setDifficulty] = useState<number | undefined>();

  // ===============================
  // sort state
  // ===============================
  const [sortBy, setSortBy] = useState<QuestionListSortBy>("createdAt");

  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // ===============================
  // pagination state
  // ===============================
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  // ===============================
  // selection state
  // ===============================
  const {
    selectedIds,
    selectedCount,
    isSelected,
    toggle,
    selectMany,
    removeMany,
    clear,
  } = useSelection<number>();

  const debouncedSearch = useDebounce(search, 300);

  const offset = useMemo(() => (page - 1) * PAGE_SIZE, [page]);

  const { categories } = useQuestionCategories();

  const categoryOptions = categories.map(mapQuestionCategoryToSelectOption);

  const { items, totalCount, isLoading, error } = useQuestionList({
    limit: PAGE_SIZE,
    offset,
    filters: {
      search: debouncedSearch,
      categoryId,
      questionTypeCode,
      difficulty,
    },
    sortBy,
    sortOrder,
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const resetListContext = () => {
    clear();
    setPage(1);
  };

  const handleSortChange = (field: QuestionListSortBy) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortBy(field);
    setSortOrder("desc");
    resetListContext();
  };

  const currentPageIds = useMemo(() => items.map((item) => item.id), [items]);

  const allCurrentPageSelected =
    currentPageIds.length > 0 && currentPageIds.every((id) => isSelected(id));

  const someCurrentPageSelected =
    currentPageIds.some((id) => isSelected(id)) && !allCurrentPageSelected;

  const handleSelectAllCurrentPage = () => {
    if (allCurrentPageSelected) {
      removeMany(currentPageIds);
      return;
    }

    selectMany(currentPageIds);
  };

  const handleView = (id: number) => {
    router.push(`/dashboard/teacher/questions/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/dashboard/teacher/questions/${id}/edit`);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategoryId(undefined);
    setQuestionTypeCode(undefined);
    setDifficulty(undefined);
    resetListContext();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?",
    );

    if (!confirmed) return;

    await softDeleteQuestion(id);
    router.refresh();
  };

  const handleDuplicate = async (id: number) => {
    await duplicateQuestion(id);
    router.refresh();
  };

  const handleBulkDelete = async () => {
    if (selectedCount === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedCount} selected questions?`,
    );

    if (!confirmed) return;

    await Promise.all(Array.from(selectedIds, (id) => softDeleteQuestion(id)));

    clear();
    router.refresh();
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <QuestionListToolbar
        search={search}
        categoryId={categoryId}
        questionTypeCode={questionTypeCode}
        difficulty={difficulty}
        viewMode={viewMode}
        categoryOptions={categoryOptions}
        selectedCount={selectedCount}
        onSearchChange={(value) => {
          setSearch(value);
          resetListContext();
        }}
        onCategoryChange={(value) => {
          setCategoryId(value);
          resetListContext();
        }}
        onQuestionTypeChange={(value) => {
          setQuestionTypeCode(value);
          resetListContext();
        }}
        onDifficultyChange={(value) => {
          setDifficulty(value);
          resetListContext();
        }}
        onViewModeChange={setViewMode}
        onClearFilters={handleClearFilters}
        onBulkDelete={handleBulkDelete}
      />

      <p className="text-sm text-muted-foreground">Total: {totalCount}</p>

      <QuestionListPresenter
        viewMode={viewMode}
        items={items}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        selectedIds={selectedIds}
        allSelected={allCurrentPageSelected}
        someSelected={someCurrentPageSelected}
        onSelectAll={handleSelectAllCurrentPage}
        selection={{ isSelected, toggle }}
        onView={handleView}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />

      <div className="flex items-center justify-end gap-2">
        <button
          className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => {
            clear();
            setPage((prev) => prev - 1);
          }}
        >
          Prev
        </button>

        <span className="text-sm">
          {page} / {totalPages}
        </span>

        <button
          className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => {
            clear();
            setPage((prev) => prev - 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
