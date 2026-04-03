export interface QuestionCardModel {
  id: number
  question_text: string
  difficulty_label: string
  grade_level: number
  category_id: number
  is_active: boolean
}

export interface QuestionListFilters {
  search: string
  categoryId?: number
  questionTypeCode?: string
  difficulty?: number
}