"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSoftDeleteQuestion() {
  const [isPending, setIsPending] = useState(false);

  const softDeleteQuestion = async (questionId: number) => {
    const supabase = createClient();
    setIsPending(true);

    const { error } = await supabase.rpc(
      "rpc_soft_delete_question",
      {
        p_question_id: questionId,
      },
    );

    setIsPending(false);

    if (error) throw error;
  };

  return {
    softDeleteQuestion,
    isPending,
  };
}