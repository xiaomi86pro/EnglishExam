"use client";

import { useCallback, useState } from "react";

import { useRpc } from "@/hooks/core/use-rpc";
import { mapQuestionUpdateFormToPayload } from "@/lib/adapters/question/question-update.adapter";

import type { QuestionUpdateFormValues } from "@/types/question/question.form";
import type { QuestionUpdateRpcResponse } from "@/types/question/question.rpc";

interface UpdateQuestionParams {
  questionId: number;
  lastUpdatedAt: string;
  values: QuestionUpdateFormValues;
}

interface UseUpdateQuestionResult {
  updateQuestion: (
    params: UpdateQuestionParams
  ) => Promise<QuestionUpdateRpcResponse>;
  isLoading: boolean;
  error: Error | null;
}

export function useUpdateQuestion(): UseUpdateQuestionResult {
  const { callRpc } = useRpc();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateQuestion = useCallback(
    async ({
      questionId,
      lastUpdatedAt,
      values,
    }: UpdateQuestionParams) => {
      try {
        setIsLoading(true);
        setError(null);

        const payload = mapQuestionUpdateFormToPayload({
          questionId,
          lastUpdatedAt,
          values,
        });

        return await callRpc<QuestionUpdateRpcResponse>(
          "rpc_update_question",
          payload
        );
      } catch (err) {
        const nextError =
          err instanceof Error
            ? err
            : new Error("Failed to update question");

        setError(nextError);
        throw nextError;
      } finally {
        setIsLoading(false);
      }
    },
    [callRpc]
  );

  return {
    updateQuestion,
    isLoading,
    error,
  };
}