import type { QuestionFormValues } from "@/types/question";

/**
 * Default state for MCQ form
 */
export function createDefaultMCQForm(): QuestionFormValues {
  return {
    question_text: "",
    explanation: "",
    difficulty: "easy",
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