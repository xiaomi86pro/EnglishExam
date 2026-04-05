export interface CreateQuestionOptionPayload {
  option_text: string
  is_correct: boolean
  order: 0 | 1 | 2 | 3
}

export interface CreateQuestionPayload {
  question_text: string
  explanation?: string
  grade_level: number
  difficulty: number
  category_id: number
  options: [
    CreateQuestionOptionPayload,
    CreateQuestionOptionPayload,
    CreateQuestionOptionPayload,
    CreateQuestionOptionPayload
  ]
}

export interface CreateQuestionRpcInput {
  p_question_type_code: "MCQ_SINGLE"
  p_passage_id: null
  p_payload: CreateQuestionPayload
  p_tag_ids?: number[]
}

export type CreateQuestionRpcResponse = number

export interface QuestionCategoryRpcRow {
  id: number
  code: string
  name: string
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

export interface QuestionDetailRpcOption {
  id: number;
  label: "A" | "B" | "C" | "D";
  text: string;
  is_correct: boolean;
}

export interface QuestionDetailRpcTag {
  id: number;
  name: string;
}

export interface QuestionDetailRpcPassage {
  id: number;
  content: string;
  audio_url: string | null;
}

export interface QuestionDetailRpcResponse {
  id: number;
  question_text: string;
  explanation: string | null;
  difficulty: number;
  category_id: number | null;
  grade_level: number | null;
  is_active: boolean;
  updated_at: string;
  question_type: string;
  passage: QuestionDetailRpcPassage | null;
  options: QuestionDetailRpcOption[];
  tags: QuestionDetailRpcTag[];
}

export interface QuestionUpdateRpcOption {
  label: "A" | "B" | "C" | "D";
  text: string;
  is_correct: boolean;
}

export interface QuestionUpdateRpcTextAnswer {
  accepted_answer: string;
}

export interface QuestionUpdateRpcRequest {
  questionId: number;
  questionText: string;
  explanation: string | null;
  difficulty: number;
  categoryId: number | null;
  gradeLevel: number | null;
  isActive: boolean;
  lastUpdatedAt: string;
  options?: QuestionUpdateRpcOption[];
  textAnswers?: QuestionUpdateRpcTextAnswer[];
  tagIds?: number[];
}

export type QuestionUpdateRpcResponse = number;

export interface QuestionDeleteRpcRequest {
  questionId: number;
  lastUpdatedAt: string;
}

export type QuestionDeleteRpcResponse = number;

export interface QuestionDuplicateRpcRequest {
  questionId: number;
}

export interface QuestionDuplicateRpcResponse {
  new_question_id: number;
}