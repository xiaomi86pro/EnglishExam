// lib/mappers/difficulty.ts

/* =========================================================
   DOMAIN DIFFICULTY TYPE
   ========================================================= */

export type Difficulty = "easy" | "medium" | "hard"

/* =========================================================
   QUESTION DIFFICULTY (1–5 → enum)
   ========================================================= */

/**
 * Map numeric question difficulty (1–5)
 * to domain difficulty.
 *
 * Scale:
 * 1–2   → easy
 * 3     → medium
 * 4–5   → hard
 *
 * Any invalid value will be clamped safely.
 */
export function mapQuestionDifficulty(
  value: number
): Difficulty {
  if (value <= 2) return "easy"
  if (value === 3) return "medium"
  return "hard"
}

/* =========================================================
   EXAM DIFFICULTY (Derived from question difficulties)
   ========================================================= */

/**
 * Derive exam difficulty from a list of numeric
 * question difficulty values (1–5).
 *
 * Strategy:
 * - Compute average
 * - Map average to domain difficulty
 *
 * If list is empty → default to "easy"
 */
export function deriveExamDifficulty(
  questionDifficulties: number[]
): Difficulty {
  const valid = questionDifficulties.filter(Number.isFinite);

  if (!valid.length) {
    return "easy";
  }

  const total = valid.reduce((sum, value) => sum + value, 0);

  const average = total / valid.length;

  return mapQuestionDifficulty(average);
}