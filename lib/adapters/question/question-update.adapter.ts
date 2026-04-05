import type {
  QuestionUpdateRpcRequest,
} from "@/types/question/question.rpc";

import type {
  QuestionUpdateFormValues,
} from "@/types/question/question.form";

interface ToUpdatePayloadParams {
  questionId: number;
  lastUpdatedAt: string;
  values: QuestionUpdateFormValues;
}

import { mapDifficultyToNumber } from "@/lib/mappers/difficulty.mapper";

export function mapQuestionUpdateFormToPayload(
  params: ToUpdatePayloadParams
): QuestionUpdateRpcRequest {
  const { questionId, lastUpdatedAt, values } = params;

  return {
    questionId,
    lastUpdatedAt,

    questionText: values.questionText.trim(),
    explanation: values.explanation.trim() || null,

    difficulty: mapDifficultyToNumber(values.difficulty),
    categoryId: values.categoryId,
    gradeLevel: values.gradeLevel,
    isActive: values.isActive,

    options: values.options.map((option) => ({
      label: option.label,
      text: option.text.trim(),
      is_correct: option.isCorrect,
    })),

    tagIds: values.tagIds,
  };
}