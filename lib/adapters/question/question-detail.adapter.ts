import type {
  QuestionDetailRpcResponse,
} from "@/types/question/question.rpc";

import type {
  QuestionUpdateFormValues,
} from "@/types/question/question.form";

import { mapQuestionDifficulty } from "@/lib/mappers/difficulty.mapper";

export function mapQuestionDetailToUpdateForm(
  detail: QuestionDetailRpcResponse
): QuestionUpdateFormValues {
  return {
    questionText: detail.question_text,
    explanation: detail.explanation ?? "",
    difficulty: mapQuestionDifficulty(detail.difficulty),
    categoryId: detail.category_id,
    gradeLevel: detail.grade_level,
    isActive: detail.is_active,
    options: detail.options.map((option) => ({
      id: option.id,
      label: option.label,
      text: option.text,
      isCorrect: option.is_correct,
    })),
    tagIds: detail.tags.map((tag) => tag.id),
  };
}