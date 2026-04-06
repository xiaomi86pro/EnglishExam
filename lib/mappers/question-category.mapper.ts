import type { QuestionCategoryRpcRow } from "@/types/question/question.rpc";
import type { QuestionCategory } from "@/types/question/question-category.domain";

export function mapQuestionCategories(
  rows: QuestionCategoryRpcRow[],
): QuestionCategory[] {
  return rows.map((row) => ({
    id: row.id,
    code: row.code,
    name: row.name,
  }));
}
