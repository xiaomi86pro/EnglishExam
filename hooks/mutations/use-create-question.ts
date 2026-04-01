import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { QuestionFormValues } from "@/types/question";
import { mapFormToPayload } from "@/lib/mappers/question.mapper";

/**
 * Domain validation for MCQ_SINGLE
 */
function validateMCQ(options: QuestionFormValues["options"]) {
  const correctCount = options.filter((o) => o.is_correct).length;

  if (options.length !== 4) {
    throw new Error("MCQ must have exactly 4 options");
  }

  if (correctCount !== 1) {
    throw new Error("MCQ must have exactly 1 correct answer");
  }

  if (options.some((o) => !o.option_text.trim())) {
    throw new Error("Option text cannot be empty");
  }
}

export function useCreateQuestion() {
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createQuestion = async (
    values: QuestionFormValues,
    options?: {
      tagIds?: number[];
      passageId?: number | null;
    }
  ): Promise<number> => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Validate (domain level)
      validateMCQ(values.options);

      // 2. Map → payload
      const payload = mapFormToPayload(values);

      // 3. Call RPC
      const { data, error } = await supabase.rpc("rpc_create_question", {
        p_question_type_code: "MCQ_SINGLE",
        p_passage_id: options?.passageId ?? null,
        p_payload: payload,
        p_tag_ids: options?.tagIds ?? null,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("No question id returned");
      }

      return data as number;
    } catch (err: any) {
      setError(err.message || "Failed to create question");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createQuestion,
    isLoading,
    error,
  };
}

