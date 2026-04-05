import type {
  QuestionListRpcRow,
} from "@/types/question/question-list.rpc";
import type {
  QuestionListItem,
  QuestionListResult,
} from "@/types/question/question-list.domain";
import { mapQuestionDifficulty } from "@/lib/mappers/difficulty.mapper";

export function mapQuestionListRow(
  row: QuestionListRpcRow
): QuestionListItem {
  return {
    id: row.question_id,
    questionText: row.question_text,
    difficulty: row.difficulty,
    difficultyLabel: mapQuestionDifficulty(row.difficulty),
    gradeLevel: row.grade_level,
    categoryId: row.category_id,
    passageId: row.passage_id,
    passageTitle: row.passage_title,
    questionTypeCode: row.question_type_code,
    optionCount: row.option_count,
    answerCount: row.answer_count,
    usageCount: row.usage_count,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapQuestionListResult(
  rows: QuestionListRpcRow[]
): QuestionListResult {
  return {
    items: rows.map(mapQuestionListRow),
    totalCount: rows[0]?.total_count ?? 0,
  };
}