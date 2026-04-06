import { mapQuestionDetailParamsToRpc } from "@/lib/adapters/question/question-detail-query.adapter";
import { mapQuestionListParamsToRpc } from "@/lib/adapters/question/question-list-query.adapter";
import { mapQuestionCategories } from "@/lib/mappers/question-category.mapper";
import { mapQuestionDetail } from "@/lib/mappers/question-detail.mapper";
import { mapQuestionListResult } from "@/lib/mappers/question-list.mapper";
import { createClient } from "@/lib/supabase/client";
import type { QuestionCategory } from "@/types/question/question-category.domain";
import type { QuestionDetail } from "@/types/question/question-detail.domain";
import type {
  QuestionListQuery,
  QuestionListResult,
} from "@/types/question/question-list.domain";
import type { QuestionListRpcRow } from "@/types/question/question-list.rpc";
import type {
  QuestionCategoryRpcRow,
  QuestionDetailRpcResponse,
} from "@/types/question/question.rpc";

export async function fetchQuestionList(
  query: QuestionListQuery,
): Promise<QuestionListResult> {
  const supabase = createClient();
  const rpcParams = mapQuestionListParamsToRpc(query);

  const { data, error } = await supabase.rpc("rpc_list_questions_v2", rpcParams);

  if (error) {
    throw new Error(error.message);
  }

  return mapQuestionListResult((data ?? []) as QuestionListRpcRow[]);
}

export async function fetchQuestionDetail(
  questionId: number,
): Promise<QuestionDetail> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc(
    "rpc_get_question_detail",
    mapQuestionDetailParamsToRpc(questionId),
  );

  if (error) {
    throw new Error(error.message);
  }

  return mapQuestionDetail(data as QuestionDetailRpcResponse);
}

export async function fetchQuestionCategories(): Promise<QuestionCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("rpc_get_question_categories");

  if (error) {
    throw new Error(error.message);
  }

  return mapQuestionCategories((data ?? []) as QuestionCategoryRpcRow[]);
}
