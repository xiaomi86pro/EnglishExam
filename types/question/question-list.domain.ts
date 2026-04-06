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
  | "createdAt"
  | "updatedAt"
  | "difficulty"
  | "usageCount";

export type SortOrder = "asc" | "desc";

export interface QuestionListQuery {
  limit: number;
  offset: number;
  filters: {
    search?: string;
    isActive?: boolean;
    categoryId?: number;
    questionTypeCode?: string;
    difficulty?: number;
  };
  sortBy?: QuestionListSortBy;
  sortOrder?: SortOrder;
}