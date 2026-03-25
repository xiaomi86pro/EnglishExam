/* =========================================================
   DOMAIN ANSWER STATE
   ========================================================= */

export type AnswerState =
  | "unanswered"
  | "answered"
  | "correct"
  | "incorrect";

/* =========================================================
   DERIVE ANSWER STATE
   ========================================================= */

interface DeriveAnswerStateParams {
  selectedOptionLabel: string | null;
  answerText: string | null;
  isCorrect: boolean | null;
}

/**
 * Derive answer state from user_answers row.
 */
export function deriveAnswerState(
  params: DeriveAnswerStateParams
): AnswerState {
  const { selectedOptionLabel, answerText, isCorrect } = params;

  const hasAnswer =
    !!selectedOptionLabel ||
    (answerText !== null && answerText.trim().length > 0);

  if (!hasAnswer) return "unanswered";

  if (isCorrect === true) return "correct";
  if (isCorrect === false) return "incorrect";

  return "answered";
}