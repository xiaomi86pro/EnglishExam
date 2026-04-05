export interface QuestionOptionFormValue {
  option_text: string
  is_correct: boolean
}

export interface QuestionFormValues {
  question_text: string
  explanation: string
  grade_level: number
  difficulty: "easy" | "medium" | "hard"
  category_id: number
  options: [
    QuestionOptionFormValue,
    QuestionOptionFormValue,
    QuestionOptionFormValue,
    QuestionOptionFormValue
  ]
  tag_ids: number[]
}

export interface QuestionUpdateFormOption {
  id?: number;
  label: "A" | "B" | "C" | "D";
  text: string;
  isCorrect: boolean;
}

export interface QuestionUpdateFormValues {
  questionText: string;
  explanation: string;
  difficulty: number;
  categoryId: number | null;
  gradeLevel: number | null;
  isActive: boolean;
  options: QuestionUpdateFormOption[];
  tagIds: number[];
}