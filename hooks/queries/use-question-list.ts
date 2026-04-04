import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import type {
  ListQuestionsParams,
  QuestionListRpcRow,
} from "@/types/question/question-list.rpc";

import type { QuestionListResult } from "@/types/question/question-list.domain";

import { mapQuestionListResult } from "@/lib/mappers/question-list.mapper";

export function useQuestionList({
  limit,
  offset,
  filters,
  sortBy = "created_at",
  sortOrder = "desc",
}: ListQuestionsParams) {
  const supabase = createClient();

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

      const { data, error } = await supabase.rpc("rpc_list_questions_v2", {
        p_limit: limit,
        p_offset: offset,
        p_search: search ?? null,
        p_is_active: isActive ?? null,
        p_category_id: categoryId ?? null,
        p_question_type_code: questionTypeCode ?? null,
        p_difficulty: difficulty ?? null,
        p_sort_by: sortBy,
        p_sort_order: sortOrder,
      });

      if (error) {
        setError(error.message);
        setResult({
          items: [],
          totalCount: 0,
        });
        setIsLoading(false);
        return;
      }

      const mapped = mapQuestionListResult(
        (data ?? []) as QuestionListRpcRow[],
      );

      setResult(mapped);
      setIsLoading(false);
    };

    void fetchQuestions();
  }, [
    supabase,
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