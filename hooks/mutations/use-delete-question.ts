"use client";

import { useCallback, useState } from "react";

import { useRpc } from "@/hooks/core/use-rpc";

import type {
  QuestionDeleteRpcRequest,
  QuestionDeleteRpcResponse,
} from "@/types/question/question.rpc";

interface UseDeleteQuestionResult {
  deleteQuestion: (
    payload: QuestionDeleteRpcRequest
  ) => Promise<QuestionDeleteRpcResponse>;
  isLoading: boolean;
  error: Error | null;
}

export function useDeleteQuestion(): UseDeleteQuestionResult {
  const { callRpc } = useRpc();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteQuestion = useCallback(
    async (
      payload: QuestionDeleteRpcRequest
    ): Promise<QuestionDeleteRpcResponse> => {
      try {
        setIsLoading(true);
        setError(null);

        return await callRpc<QuestionDeleteRpcResponse>(
          "rpc_delete_question",
          payload
        );
      } catch (err) {
        const nextError =
          err instanceof Error
            ? err
            : new Error("Failed to delete question");

        setError(nextError);
        throw nextError;
      } finally {
        setIsLoading(false);
      }
    },
    [callRpc]
  );

  return {
    deleteQuestion,
    isLoading,
    error,
  };
}