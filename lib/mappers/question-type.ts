/* =========================================================
   DOMAIN QUESTION TYPE
   ========================================================= */

export type QuestionType =
  | "mcq_single"
  | "text_input"
  | "passage_mcq"
  | "passage_text"
  | "reorder"
  | "true_false"
  | "audio_mcq"
  | "audio_text"
  | "essay";

/* =========================================================
   DB → DOMAIN
   ========================================================= */

/**
 * Map question_types.code (DB)
 * to domain-level QuestionType
 */
export function mapQuestionType(code: string): QuestionType {
  switch (code) {
    case "MCQ_SINGLE":
      return "mcq_single";
    case "TEXT_INPUT":
      return "text_input";
    case "PASSAGE_MCQ":
      return "passage_mcq";
    case "PASSAGE_TEXT":
      return "passage_text";
    case "REORDER":
      return "reorder";
    case "TRUE_FALSE":
      return "true_false";
    case "AUDIO_MCQ":
      return "audio_mcq";
    case "AUDIO_TEXT":
      return "audio_text";
    case "ESSAY":
      return "essay";
    default:
      throw new Error(`Unknown question type code: ${code}`);
  }
}

/** Label */

export function getQuestionTypeLabel(type: QuestionType): string {
  switch (type) {
    case "mcq_single":
      return "Multiple Choice";
    case "text_input":
      return "Text Input";
    case "passage_mcq":
      return "Passage MCQ";
    case "passage_text":
      return "Passage Text";
    case "reorder":
      return "Reorder";
    case "true_false":
      return "True / False";
    case "audio_mcq":
      return "Audio MCQ";
    case "audio_text":
      return "Audio Text";
    case "essay":
      return "Essay";
  }
}