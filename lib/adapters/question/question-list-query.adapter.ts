import type { ListQuestionsParams } from "@/types/question/question-list.rpc";

const sortByMap = {
  createdAt: "created_at",
  updatedAt: "updated_at",
  difficulty: "difficulty",
  usageCount: "usage_count",
} as const;

export function mapQuestionListParamsToRpc(
  params: ListQuestionsParams
) {
  const {
    limit,
    offset,
    filters,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  return {
    p_limit: limit,
    p_offset: offset,
    p_search: filters.search ?? null,
    p_is_active: filters.isActive ?? null,
    p_category_id: filters.categoryId ?? null,
    p_question_type_code: filters.questionTypeCode ?? null,
    p_difficulty: filters.difficulty ?? null,
    p_sort_by: sortByMap[sortBy],
    p_sort_order: sortOrder,
  };
}