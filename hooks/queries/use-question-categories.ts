import { useEffect, useState } from "react";
import { fetchQuestionCategories } from "@/lib/domain/question/question.queries";

import type { QuestionCategory } from "@/types/question/question-category.domain";

export function useQuestionCategories() {
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const mappedCategories = await fetchQuestionCategories();
        setCategories(mappedCategories);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load categories");
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
}
