"use client";

import { useCallback, useEffect, useState } from "react";

import { mapQuestionDetailToUpdateForm } from "@/lib/adapters/question/question-detail.adapter";
import { fetchQuestionDetail } from "@/lib/domain/question/question.queries";
import type { QuestionDetail } from "@/types/question/question-detail.domain";
import type { QuestionUpdateFormValues } from "@/types/question/question.form";

interface UseQuestionDetailResult {
  formValues: QuestionUpdateFormValues | undefined;
  detail: QuestionDetail | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useQuestionDetail(questionId: number): UseQuestionDetailResult {
  const [detail, setDetail] = useState<QuestionDetail>();
  const [formValues, setFormValues] = useState<QuestionUpdateFormValues>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuestion = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const mappedDetail = await fetchQuestionDetail(questionId);

      setDetail(mappedDetail);
      setFormValues(mapQuestionDetailToUpdateForm(mappedDetail));
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load question"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [questionId]);

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
