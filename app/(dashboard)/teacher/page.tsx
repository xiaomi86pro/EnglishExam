"use client";

import { useMemo, useState } from "react";

import { useQuestionList } from "@/hooks/queries/use-question-list";
import { QuestionListItemRow } from "@/components/domain/question/question-list-item";
import { QuestionListToolbar } from "@/components/domain/question/question-toolbar";
import { useDebounce } from "@/hooks/use-debounce";

const PAGE_SIZE = 10;

export default function TeacherQuestionsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const debouncedSearch = useDebounce(search, 300);
  const offset = useMemo(() => (page - 1) * PAGE_SIZE, [page]);

  const { items, totalCount, isLoading, error } = useQuestionList({
    limit: PAGE_SIZE,
    offset,
    search: debouncedSearch,
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const toggleSelection = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );
  };

  const handleBulkDelete = () => {};

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-semibold">Question List</h1>
      <QuestionListToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        selectedCount={selectedIds.length}
        onBulkDelete={handleBulkDelete}
      />
      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading questions...</p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="p-2">Select</th>
                  <th className="p-2">ID</th>
                  <th className="p-2">Question</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Difficulty</th>
                  <th className="p-2">Created</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <QuestionListItemRow
                    key={item.id}
                    item={item}
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={(checked) =>
                      toggleSelection(item.id, Boolean(checked))
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total: {totalCount}</p>

            <div className="flex gap-2">
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
        </>
      )}
    </div>
  );
}
