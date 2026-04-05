"use client";

import { useMemo, useState } from "react";

import { useQuestionList } from "@/hooks/queries/use-question-list";
import { useQuestionCategories } from "@/hooks/queries/use-question-categories";
import { useDebounce } from "@/hooks/use-debounce";

import { QuestionListToolbar } from "./question-toolbar";
import { QuestionListTable } from "./question-list-table";

import { mapQuestionCategoryToSelectOption } from "@/lib/mappers/question-category.mapper";

import type {
  QuestionListSortBy,
  SortOrder,
} from "@/types/question/question-list.rpc";

const PAGE_SIZE = 10;

export function QuestionListContainer() {
  // ===============================
  // filter state
  // ===============================
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [questionTypeCode, setQuestionTypeCode] = useState<
    string | undefined
  >();
  const [difficulty, setDifficulty] = useState<number | undefined>();

  // ===============================
  // sort state
  // ===============================
  const [sortBy, setSortBy] =
    useState<QuestionListSortBy>("created_at");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("desc");

  // ===============================
  // pagination state
  // ===============================
  const [page, setPage] = useState(1);

  // ===============================
  // selection state
  // ===============================
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  const offset = useMemo(
    () => (page - 1) * PAGE_SIZE,
    [page],
  );

  const { categories } = useQuestionCategories();

  const categoryOptions = categories.map(
    mapQuestionCategoryToSelectOption,
  );

  const { items, totalCount, isLoading, error } =
    useQuestionList({
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

  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / PAGE_SIZE),
  );

  const resetToFirstPage = () => {
    setPage(1);
  };

  const handleSortChange = (
    field: QuestionListSortBy,
  ) => {
    if (sortBy === field) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : "asc",
      );
      return;
    }

    setSortBy(field);
    setSortOrder("desc");
    resetToFirstPage();
  };

  const toggleSelection = (
    id: number,
    checked: boolean,
  ) => {
    setSelectedIds((prev) =>
      checked
        ? [...prev, id]
        : prev.filter((itemId) => itemId !== id),
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategoryId(undefined);
    setQuestionTypeCode(undefined);
    setDifficulty(undefined);
    resetToFirstPage();
  };

  const handleBulkDelete = () => {
    // scope 4
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  
  console.log("container selectedIds", selectedIds);
  
  return (
    <div className="space-y-4">
      <QuestionListToolbar
        search={search}
        categoryId={categoryId}
        questionTypeCode={questionTypeCode}
        difficulty={difficulty}
        categoryOptions={categoryOptions}
        selectedCount={selectedIds.length}
        onSearchChange={(value) => {
          setSearch(value);
          resetToFirstPage();
        }}
        onCategoryChange={(value) => {
          setCategoryId(value);
          resetToFirstPage();
        }}
        onQuestionTypeChange={(value) => {
          setQuestionTypeCode(value);
          resetToFirstPage();
        }}
        onDifficultyChange={(value) => {
          setDifficulty(value);
          resetToFirstPage();
        }}
        onClearFilters={handleClearFilters}
        onBulkDelete={handleBulkDelete}
      />

      <p className="text-sm text-muted-foreground">
        Total: {totalCount}
      </p>

      <QuestionListTable
        items={items}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        selectedIds={selectedIds}
        onToggleSelection={toggleSelection}
      />

      <div className="flex items-center justify-end gap-2">
        <button
          className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span className="text-sm">
          {page} / {totalPages}
        </span>

        <button
          className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}