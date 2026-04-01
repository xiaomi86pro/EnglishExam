import type {
  QuestionFormValues,
  QuestionPayload,
  QuestionOptionPayload,
} from "@/types/question";
import { mapDifficultyToNumber } from "@/lib/mappers/difficulty.mapper";

/**
 * UI Form → RPC Payload (p_payload)
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

    options: values.options
      .map<QuestionOptionPayload>((o) => ({
        option_text: o.option_text,
        is_correct: o.is_correct,
        order: o.order,
      }))
      .sort((a, b) => a.order - b.order),
  };
}

