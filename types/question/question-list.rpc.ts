export interface QuestionListRpcRow {
  question_id: number;
  question_text: string;
  difficulty: number;
  grade_level: number;
  category_id: number;
  passage_id: number | null;
  passage_title: string | null;
  question_type_code: string | null;
  tag_ids: number[];
  option_count: number;
  answer_count: number;
  is_active: boolean;
  created_at: string;
  total_count: number;
}

export interface QuestionListFiltersRpc {
  search?: string;
  isActive?: boolean;
  categoryId?: number;
  questionTypeCode?: string;
  difficulty?: number;
}

export interface ListQuestionsParams {
  limit: number;
  offset: number;
  filters: QuestionListFiltersRpc;
}