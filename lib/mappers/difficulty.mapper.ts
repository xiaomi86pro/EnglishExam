/* =========================================================
   TYPES
   ========================================================= */

export type Difficulty = "easy" | "medium" | "hard";

/* =========================================================
   CONSTANTS (BONUS IMPROVEMENT)
   ========================================================= */

const MIN_QUESTION_DIFFICULTY = 1;
const MAX_QUESTION_DIFFICULTY = 5;

const DIFFICULTY_TO_NUMBER = {
  easy: 1,
  medium: 3,
  hard: 5,
} as const;

/* =========================================================
   INTERNAL HELPERS
   ========================================================= */

function normalizeQuestionDifficulty(value: number): number {
  if (!Number.isFinite(value)) {
    return MIN_QUESTION_DIFFICULTY;
  }

  return Math.min(
    MAX_QUESTION_DIFFICULTY,
    Math.max(MIN_QUESTION_DIFFICULTY, value)
  );
}

/* =========================================================
   MAPPERS (PURE TRANSFORM ONLY)
   ========================================================= */

/**
 * Domain → DB
 */
export function mapDifficultyToNumber(
  difficulty: Difficulty
): number {
  return DIFFICULTY_TO_NUMBER[difficulty] ?? 2;
}

/**
 * DB → Domain
 */
export function mapQuestionDifficulty(
  value: number
): Difficulty {
  const normalizedValue = normalizeQuestionDifficulty(value);

  if (normalizedValue <= 2) return "easy";
  if (normalizedValue < 4) return "medium";

  return "hard";
}