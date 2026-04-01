export interface QuestionRow {
  id: number
  question_type_id: number
  passage_id: number | null
  question_text: string
  grade_level: number
  explanation: string | null
  difficulty: number
  category_id: number
  is_active: boolean
  created_at: string | null
  updated_at: string | null
  deleted_at: string | null
  created_by: string | null
  updated_by: string | null
}

export interface OptionRow {
  id: number
  question_id: number
  option_label: "A" | "B" | "C" | "D"
  option_text: string
  is_correct: boolean
}