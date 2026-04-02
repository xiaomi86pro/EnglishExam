"use client";

import { useState } from "react";
import { mapFormToPayload } from "@/lib/adapters/question/question-form.adapter";
import { useCreateQuestion } from "@/hooks/mutations/use-create-question";
import { useQuestionCategories } from "@/hooks/queries/use-question-categories";
import { mapQuestionCategoryToSelectOption } from "@/lib/mappers/question-category.mapper";
import type { QuestionFormValues } from "@/types/question/question.form";
import { QuestionForm } from "../../../lib/domain/question/question-form-view";

export function QuestionFormContainer() {
  const { createQuestion } = useCreateQuestion();

  const { categories, isLoading: isLoadingCategories } =
    useQuestionCategories();

  const categoryOptions = categories.map(
    mapQuestionCategoryToSelectOption
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdId, setCreatedId] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: QuestionFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const payload = mapFormToPayload(values);

      const questionId = await createQuestion({
        p_question_type_code: "MCQ_SINGLE",
        p_passage_id: null,
        p_payload: payload,
        p_tag_ids: values.tag_ids,
      });

      setCreatedId(questionId);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Create question failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <QuestionForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitError={submitError}
      createdId={createdId}
      categoryOptions={categoryOptions}
      isLoadingCategories={isLoadingCategories}
    />
  );
}