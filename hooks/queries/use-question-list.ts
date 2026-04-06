import { useEffect, useState } from "react";

import type {
  QuestionListQuery,
  QuestionListResult,
} from "@/types/question/question-list.domain";
import { fetchQuestionList } from "@/lib/domain/question/question.queries";

export function useQuestionList({
  limit,
  offset,
  filters,
  sortBy = "createdAt",
  sortOrder = "desc",
}: QuestionListQuery) {
  const {
    search,
    isActive,
    categoryId,
    questionTypeCode,
    difficulty,
  } = filters;

  const [result, setResult] = useState<QuestionListResult>({
    items: [],
    totalCount: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const mapped = await fetchQuestionList({
          limit,
          offset,
          filters: {
            search,
            isActive,
            categoryId,
            questionTypeCode,
            difficulty,
          },
          sortBy,
          sortOrder,
        });

        setResult(mapped);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load questions");
        setResult({
          items: [],
          totalCount: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    void fetchQuestions();
  }, [
    limit,
    offset,
    search,
    isActive,
    categoryId,
    questionTypeCode,
    difficulty,
    sortBy,
    sortOrder,
  ]);

  return {
    items: result.items,
    totalCount: result.totalCount,
    isLoading,
    error,
  };
}
