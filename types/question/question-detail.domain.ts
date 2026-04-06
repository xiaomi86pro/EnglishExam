export interface QuestionDetailOption {
  id: number;
  label: "A" | "B" | "C" | "D";
  text: string;
  isCorrect: boolean;
}

export interface QuestionDetailTag {
  id: number;
  name: string;
}

export interface QuestionDetailPassage {
  id: number;
  content: string;
  audioUrl: string | null;
}

export interface QuestionDetail {
  id: number;
  questionText: string;
  explanation: string | null;
  difficulty: number;
  categoryId: number | null;
  gradeLevel: number | null;
  isActive: boolean;
  updatedAt: string;
  questionType: string;
  passage: QuestionDetailPassage | null;
  options: QuestionDetailOption[];
  tags: QuestionDetailTag[];
}
