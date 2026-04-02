import type { QuestionCategoryRpcRow } from "@/types/question/question.rpc"

export interface QuestionCategorySelectOption {
  value: string
  label: string
}

export function mapQuestionCategoryToSelectOption(
  category: QuestionCategoryRpcRow
): QuestionCategorySelectOption {
  return {
    value: String(category.id),
    label: `${category.code} - ${category.name}`,
  }
}