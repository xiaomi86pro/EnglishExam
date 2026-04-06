import type { QuestionDetail } from "@/types/question/question-detail.domain";

import type { QuestionUpdateFormValues } from "@/types/question/question.form";

import { mapQuestionDifficulty } from "@/lib/mappers/difficulty.mapper";

export function mapQuestionDetailToUpdateForm(
  detail: QuestionDetail,
): QuestionUpdateFormValues {
  return {
    questionText: detail.questionText,
    explanation: detail.explanation ?? "",
    difficulty: mapQuestionDifficulty(detail.difficulty),
    categoryId: detail.categoryId,
    gradeLevel: detail.gradeLevel,
    isActive: detail.isActive,
    options: detail.options.map((option) => ({
      id: option.id,
      label: option.label,
      text: option.text,
      isCorrect: option.isCorrect,
    })),
    tagIds: detail.tags.map((tag) => tag.id),
  };
}
