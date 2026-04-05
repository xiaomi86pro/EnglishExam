"use client";

import { useEffect, useState } from "react";

import { QuestionEditor } from "@/components/domain/question/question-editor";

import { useQuestionDetail } from "@/hooks/queries/use-question-detail";
import { useUpdateQuestion } from "@/hooks/mutations/use-update-question";

import type { QuestionUpdateFormValues } from "@/types/question/question.form";

interface QuestionUpdateContainerProps {
  questionId: number;
}

export function QuestionUpdateContainer({
  questionId,
}: QuestionUpdateContainerProps) {
  const { formValues, detail, isLoading } =
    useQuestionDetail(questionId);

  const {
    updateQuestion,
    isLoading: isUpdating,
  } = useUpdateQuestion();

  const [value, setValue] =
    useState<QuestionUpdateFormValues>();

  useEffect(() => {
    if (formValues) {
      setValue(formValues);
    }
  }, [formValues]);

  async function handleSubmit() {
    if (!value || !detail) return;

    await updateQuestion({
      questionId: detail.id,
      lastUpdatedAt: detail.updated_at,
      values: value,
    });
  }

  if (isLoading || !value) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="space-y-6">
      <QuestionEditor
        value={value}
        onChange={setValue}
        disabled={isUpdating}
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isUpdating}
        className="rounded-xl border px-4 py-2"
      >
        {isUpdating ? "Updating..." : "Update Question"}
      </button>
    </div>
  );
}