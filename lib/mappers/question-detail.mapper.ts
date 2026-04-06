import type { QuestionDetailRpcResponse } from "@/types/question/question.rpc";
import type { QuestionDetail } from "@/types/question/question-detail.domain";

export function mapQuestionDetail(
  row: QuestionDetailRpcResponse,
): QuestionDetail {
  return {
    id: row.id,
    questionText: row.question_text,
    explanation: row.explanation,
    difficulty: row.difficulty,
    categoryId: row.category_id,
    gradeLevel: row.grade_level,
    isActive: row.is_active,
    updatedAt: row.updated_at,
    questionType: row.question_type,
    passage: row.passage
      ? {
          id: row.passage.id,
          content: row.passage.content,
          audioUrl: row.passage.audio_url,
        }
      : null,
    options: row.options.map((option) => ({
      id: option.id,
      label: option.label,
      text: option.text,
      isCorrect: option.is_correct,
    })),
    tags: row.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
  };
}
