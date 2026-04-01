import { mapDifficultyToNumber } from "@/lib/mappers/difficulty.mapper";
import type { CreateQuestionPayload } from "@/types/question/question.rpc";
import type { QuestionFormValues } from "@/types/question/question.form";

/**
 * UI Form → RPC Payload
 * A1 - MCQ_SINGLE
 */
export function mapFormToPayload(
  values: QuestionFormValues
): CreateQuestionPayload {
  return {
    question_text: values.question_text.trim(),
    explanation: values.explanation?.trim() || undefined,
    difficulty: mapDifficultyToNumber(values.difficulty),
    grade_level: values.grade_level,
    category_id: values.category_id,

    options: values.options.map((opt, index) => ({
      option_text: opt.option_text.trim(),
      is_correct: opt.is_correct,
      order: index as 0 | 1 | 2 | 3,
    })) as CreateQuestionPayload["options"],
  };
}