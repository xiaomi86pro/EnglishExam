"use client";

import { useCallback, useEffect, useState } from "react";

import { useRpc } from "@/hooks/core/use-rpc";
import { mapQuestionDetailToUpdateForm } from "@/lib/adapters/question/question-detail.adapter";

import type { QuestionDetailRpcResponse } from "@/types/question/question.rpc";
import type { QuestionUpdateFormValues } from "@/types/question/question.form";

interface UseQuestionDetailResult {
  formValues: QuestionUpdateFormValues | undefined;
  detail: QuestionDetailRpcResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useQuestionDetail(
  questionId: number
): UseQuestionDetailResult {
  const { callRpc } = useRpc();

  const [detail, setDetail] =
    useState<QuestionDetailRpcResponse>();
  const [formValues, setFormValues] =
    useState<QuestionUpdateFormValues>();
  const [isLoading, setIsLoading] =
    useState(true);
  const [error, setError] =
    useState<Error | null>(null);

  const fetchQuestion = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data =
        await callRpc<QuestionDetailRpcResponse>(
          "rpc_get_question_detail",
          { p_question_id: questionId }
        );

      setDetail(data);
      setFormValues(
        mapQuestionDetailToUpdateForm(data)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to load question")
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