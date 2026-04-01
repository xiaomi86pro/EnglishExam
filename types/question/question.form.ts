export interface QuestionOptionFormValue {
  option_text: string
  is_correct: boolean
}

export interface QuestionFormValues {
  question_text: string
  explanation: string
  grade_level: number
  difficulty: "easy" | "medium" | "hard"
  category_id: number
  options: [
    QuestionOptionFormValue,
    QuestionOptionFormValue,
    QuestionOptionFormValue,
    QuestionOptionFormValue
  ]
  tag_ids: number[]
}