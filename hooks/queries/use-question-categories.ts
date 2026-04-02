import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { QuestionCategoryRpcRow } from "@/types/question/question.rpc"

export function useQuestionCategories() {
  const [categories, setCategories] = useState<QuestionCategoryRpcRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient()

      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase.rpc(
        "rpc_get_question_categories"
      )

      if (error) {
        setError(error.message)
        setCategories([])
        setIsLoading(false)
        return
      }

      setCategories((data ?? []) as QuestionCategoryRpcRow[])
      setIsLoading(false)
    }

    void fetchCategories()
  }, [])

  return {
    categories,
    isLoading,
    error,
  }
}