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
  search,
  isActive,
}: ListQuestionsParams) {
  const [result, setResult] = useState<QuestionListResult>({
    items: [],
    totalCount: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const supabase = createClient();

      setIsLoading(true);
      setError(null);

      console.log("rpc search", search);

      const { data, error } = await supabase.rpc("rpc_list_questions_v2", {
        p_limit: limit,
        p_offset: offset,
        p_search: search ?? null,
        p_is_active: isActive ?? null,
      });

      console.log("rpc result", {
        search,
        count: data?.length,
        first: data?.[0],
        error,
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
  }, [limit, offset, search, isActive]);

  return {
    items: result.items,
    totalCount: result.totalCount,
    isLoading,
    error,
  };
}
