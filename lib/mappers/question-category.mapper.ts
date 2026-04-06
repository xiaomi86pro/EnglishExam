import type { QuestionCategory } from "@/types/question/question-category.domain";

export interface QuestionCategorySelectOption {
  value: string;
  label: string;
}

export function mapQuestionCategoryToSelectOption(
  category: QuestionCategory
): QuestionCategorySelectOption {
  return {
    value: String(category.id),
    label: `${category.code} - ${category.name}`,
  };
}