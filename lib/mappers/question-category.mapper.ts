import type { QuestionCategory } from "@/types/question/question-category.domain";
import type { QuestionCategoryRpcRow } from "@/types/question/question.rpc";

export interface QuestionCategorySelectOption {
  value: string;
  label: string;
}

export function mapQuestionCategories(
  rows: QuestionCategoryRpcRow[]
): QuestionCategory[] {
  return rows.map((row) => ({
    id: row.id,
    code: row.code,
    name: row.name,
  }));
}

export function mapQuestionCategoryToSelectOption(
  category: QuestionCategory
): QuestionCategorySelectOption {
  return {
    value: String(category.id),
    label: `${category.code} - ${category.name}`,
  };
}