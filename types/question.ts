// types/question.ts

import type { Difficulty } from "@/lib/mappers/difficulty.mapper";

/* =========================
   QUESTION TYPE
========================= */
export type QuestionType = "mcq_single";

export const QUESTION_TYPE = {
  MCQ_SINGLE: 1,
} as const;

/* =========================
   OPTION TYPES
========================= */

/**
 * UI Form Option (FE state)
 */
export interface QuestionOptionForm {
  id: string; // FE temp id (uuid)
  option_text: string;
  is_correct: boolean;
  order: number;
}

/**
 * RPC Payload Option (BE contract)
 */
export interface QuestionOptionPayload {
  option_text: string;
  is_correct: boolean;
  order: number;
}

/* =========================
   FORM VALUES
========================= */

export interface QuestionFormValues {
  question_text: string;
  explanation?: string;
  difficulty: Difficulty;
  grade_level?: number;
  category_id?: number;

  options: QuestionOptionForm[];
}

/* =========================
   RPC PAYLOAD
========================= */

export interface QuestionPayload {
  question_text: string;
  explanation?: string;
  difficulty?: number;
  grade_level?: number;
  category_id?: number;
  options: QuestionOptionPayload[];
}

/* =========================
   DTO (for read later)
========================= */

export interface QuestionDTO {
  id: number;
  question_text: string;
  explanation?: string;
  difficulty?: number;
}
