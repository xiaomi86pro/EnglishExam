import {
  QUESTION_TYPE_BY_CODE,
  type QuestionType,
  type QuestionTypeCode,
} from "@/lib/domain/question/question-type";

/**
 * DB → Domain
 */
export function mapQuestionType(
  code: string
): QuestionType {
  if (
    Object.prototype.hasOwnProperty.call(
      QUESTION_TYPE_BY_CODE,
      code
    )
  ) {
    return QUESTION_TYPE_BY_CODE[
      code as QuestionTypeCode
    ];
  }

  throw new Error(`Unknown question type code: ${code}`);
}