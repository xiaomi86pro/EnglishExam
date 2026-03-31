import { mapQuestionDifficulty } from "@/lib/mappers/difficulty.mapper";

/* =========================================================
   TYPES
   ========================================================= */

export type Difficulty = "easy" | "medium" | "hard";

/* =========================================================
   DOMAIN LOGIC
   ========================================================= */

/**
 * Derive overall exam difficulty from question difficulties
 */
export function deriveExamDifficulty(
  questionDifficulties: number[]
): Difficulty {
  const validValues = questionDifficulties.filter(Number.isFinite);

  if (validValues.length === 0) {
    return "easy";
  }

  const total = validValues.reduce(
    (sum, value) => sum + value,
    0
  );

  const average = total / validValues.length;

  return mapQuestionDifficulty(average);
}