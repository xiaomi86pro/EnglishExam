// types/engine.ts

/**
 * ENGINE QUESTION TYPES
 * Must match question_types.code in database exactly.
 */

export const ENGINE_QUESTION_TYPES = [
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

export type EngineQuestionType =
  (typeof ENGINE_QUESTION_TYPES)[number];

/**
 * Optional runtime guard
 * Use when casting data coming from Supabase.
 */
export function isEngineQuestionType(
  value: string
): value is EngineQuestionType {
  return ENGINE_QUESTION_TYPES.includes(
    value as EngineQuestionType
  );
}