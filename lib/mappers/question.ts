// lib/mappers/question.ts

import {
  QuestionFormValues,
  QuestionPayload,
} from "@/types/question";

export function mapFormToPayload(
  values: QuestionFormValues
): QuestionPayload {
  return {
    question_text: values.question_text,
    explanation: values.explanation,
    difficulty: values.difficulty,
    grade_level: values.grade_level,
    category_id: values.category_id,

    options: values.options.map((opt) => ({
      label: opt.label,
      text: opt.text,
      is_correct: opt.is_correct,
    })),
  };
}

/* =========================
   DEFAULT FORM
========================= */
export function createDefaultMCQForm(): QuestionFormValues {
  return {
    question_text: "",
    explanation: "",
    difficulty: 1,
    grade_level: undefined,
    category_id: undefined,

    options: [
      { label: "A", text: "", is_correct: false },
      { label: "B", text: "", is_correct: false },
      { label: "C", text: "", is_correct: false },
      { label: "D", text: "", is_correct: false },
    ],
  };
}