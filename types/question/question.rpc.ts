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