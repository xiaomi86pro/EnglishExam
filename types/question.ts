// types/question.ts

export type QuestionType = "mcq_single";

export interface QuestionOption {
  label: string;
  text: string;
  is_correct: boolean;
}

/* =========================
   FORM VALUES
========================= */
export interface QuestionFormValues {
  question_text: string;
  explanation?: string;
  difficulty: number;
  grade_level?: number;
  category_id?: number;

  options: QuestionOption[];
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

  options: QuestionOption[];
}

/* =========================
   DTO (optional for later)
========================= */
export interface QuestionDTO {
  id: number;
  question_text: string;
  explanation?: string;
  difficulty?: number;
}