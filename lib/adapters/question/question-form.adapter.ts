import { mapDifficultyToNumber } from "@/lib/mappers/difficulty.mapper";
import type {
  QuestionFormValues,
  QuestionPayload,
} from "@/types/question";

/**
 * UI Form → RPC Payload
 */
export function mapFormToPayload(
  values: QuestionFormValues
): QuestionPayload {
  return {
    question_text: values.question_text,
    explanation: values.explanation,
    difficulty: mapDifficultyToNumber(values.difficulty),
    grade_level: values.grade_level,
    category_id: values.category_id,

    options: values.options.map((opt) => ({
      label: opt.label,
      text: opt.text,
      is_correct: opt.is_correct,
    })),
  };
}