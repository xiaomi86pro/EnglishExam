import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import type { QuestionListRpcRow } from "@/types/question/question-list.rpc";
import type {
  QuestionListQuery,
  QuestionListResult,
} from "@/types/question/question-list.domain";
import { mapQuestionListParamsToRpc } from "@/lib/adapters/question/question-list-query.adapter";
import { mapQuestionListResult } from "@/lib/mappers/question-list.mapper";

export function useQuestionList({
  limit,
  offset,
  filters,
  sortBy = "createdAt",
  sortOrder = "desc",
}: QuestionListQuery) {
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

      const rpcParams = mapQuestionListParamsToRpc({
        limit,
        offset,
        filters,
        sortBy,
        sortOrder,
      });

      const { data, error } = await supabase.rpc(
        "rpc_list_questions_v2",
        rpcParams
      );

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