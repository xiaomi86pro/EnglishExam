"use client";

import { useState } from "react";

import { useQuestionList } from "@/hooks/queries/use-question-list";
import { QuestionListTable } from "./question-list-table";

import type {
  QuestionListSortBy,
  SortOrder,
} from "@/types/question/question-list.rpc";

export function QuestionListContainer() {
  const [sortBy, setSortBy] =
    useState<QuestionListSortBy>("created_at");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("desc");

  const { items, totalCount, isLoading, error } =
    useQuestionList({
      limit: 10,
      offset: 0,
      filters: {},
      sortBy,
      sortOrder,
    });

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
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Total: {totalCount}
      </p>

      <QuestionListTable
        items={items}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
    </div>
  );
}