// lib/mappers/difficulty.ts

export type Difficulty = "easy" | "medium" | "hard";

const MIN_QUESTION_DIFFICULTY = 1;
const MAX_QUESTION_DIFFICULTY = 5;

function normalizeQuestionDifficulty(value: number): number {
  if (!Number.isFinite(value)) {
    return MIN_QUESTION_DIFFICULTY;
  }

  return Math.min(
    MAX_QUESTION_DIFFICULTY,
    Math.max(MIN_QUESTION_DIFFICULTY, value),
  );
}

export function mapQuestionDifficulty(value: number): Difficulty {
  const normalizedValue = normalizeQuestionDifficulty(value);

  if (normalizedValue <= 2) return "easy";
  if (normalizedValue < 4) return "medium";

  return "hard";
}

export function deriveExamDifficulty(
  questionDifficulties: number[],
): Difficulty {
  const validValues = questionDifficulties.filter(Number.isFinite);

  if (validValues.length === 0) {
    return "easy";
  }

  const total = validValues.reduce((sum, value) => sum + value, 0);
  const average = total / validValues.length;

  return mapQuestionDifficulty(average);
}
