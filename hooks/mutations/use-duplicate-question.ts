"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useDuplicateQuestion() {
  const [isPending, setIsPending] = useState(false);

  const duplicateQuestion = async (questionId: number) => {
    const supabase = createClient();
    setIsPending(true);

    const { data, error } = await supabase.rpc(
      "rpc_duplicate_question",
      {
        p_question_id: questionId,
      },
    );

    setIsPending(false);

    if (error) throw error;

    return data;
  };

  return {
    duplicateQuestion,
    isPending,
  };
}