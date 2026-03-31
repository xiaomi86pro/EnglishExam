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
   DB CODE (STRICT)
   ========================================================= */

export const QUESTION_TYPE_CODES = [
  "MCQ_SINGLE",
  "TEXT_INPUT",
  "PASSAGE_MCQ",
  "PASSAGE_TEXT",
  "REORDER",
  "TRUE_FALSE",
  "AUDIO_MCQ",
  "AUDIO_TEXT",
  "ESSAY",
] as const;

export type QuestionTypeCode =
  (typeof QUESTION_TYPE_CODES)[number];

export const QUESTION_TYPE_BY_CODE: Record<
  QuestionTypeCode,
  QuestionType
> = {
  MCQ_SINGLE: "mcq_single",
  TEXT_INPUT: "text_input",
  PASSAGE_MCQ: "passage_mcq",
  PASSAGE_TEXT: "passage_text",
  REORDER: "reorder",
  TRUE_FALSE: "true_false",
  AUDIO_MCQ: "audio_mcq",
  AUDIO_TEXT: "audio_text",
  ESSAY: "essay",
};