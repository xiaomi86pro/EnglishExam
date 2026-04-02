export interface QuestionListItem {
  id: number;
  questionText: string;
  difficulty: number;
  difficultyLabel: string;
  gradeLevel: number;
  categoryId: number;
  passageTitle: string | null;
  questionTypeCode: string | null;
  optionCount: number;
  answerCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface QuestionListResult {
  items: QuestionListItem[];
  totalCount: number;
}