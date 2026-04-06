"use client";

import { useCallback, useEffect, useState } from "react";

import { useRpc } from "@/hooks/core/use-rpc";
import { mapQuestionDetailToUpdateForm } from "@/lib/adapters/question/question-detail.adapter";
import { mapQuestionDetail } from "@/lib/mappers/question-detail.mapper";
import { mapQuestionDetailParamsToRpc } from "@/lib/adapters/question/question-detail-query.adapter";
import type { QuestionDetail } from "@/types/question/question-detail.domain";
import type { QuestionDetailRpcResponse } from "@/types/question/question.rpc";
import type { QuestionUpdateFormValues } from "@/types/question/question.form";

interface UseQuestionDetailResult {
  formValues: QuestionUpdateFormValues | undefined;
  detail: QuestionDetail | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useQuestionDetail(questionId: number): UseQuestionDetailResult {
  const { callRpc } = useRpc();

  const [detail, setDetail] = useState<QuestionDetail>();
  const [formValues, setFormValues] = useState<QuestionUpdateFormValues>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuestion = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await callRpc<QuestionDetailRpcResponse>(
        "rpc_get_question_detail",
        mapQuestionDetailParamsToRpc(questionId),
      );

      const mappedDetail = mapQuestionDetail(data);

      setDetail(mappedDetail);
      setFormValues(mapQuestionDetailToUpdateForm(mappedDetail));
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load question"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [callRpc, questionId]);

  useEffect(() => {
    void fetchQuestion();
  }, [fetchQuestion]);

  return {
    formValues,
    detail,
    isLoading,
    error,
    refetch: fetchQuestion,
  };
}
