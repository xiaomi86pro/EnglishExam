"use client";

import { createClient } from "@/lib/supabase/client";
import type {
  CreateQuestionRpcInput,
  CreateQuestionRpcResponse,
} from "@/types/question/question.rpc";

export function useCreateQuestion() {
  const supabase = createClient();

  const createQuestion = async (
    input: CreateQuestionRpcInput
  ): Promise<CreateQuestionRpcResponse> => {
    const { data, error } = await supabase.rpc(
      "rpc_create_question",
      input
    );

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return { createQuestion };
}