export interface QuestionListItem {
  id: number;
  questionText: string;
  difficulty: number;
  difficultyLabel: string;
  gradeLevel: number;
  categoryId: number;
  passageId: number | null;
  passageTitle: string | null;
  questionTypeCode: string | null;
  optionCount: number;
  answerCount: number;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionListResult {
  items: QuestionListItem[];
  totalCount: number;
}

export type QuestionListSortBy =
  | "created_at"
  | "updated_at"
  | "difficulty"
  | "usage_count";

export type SortOrder = "asc" | "desc";
