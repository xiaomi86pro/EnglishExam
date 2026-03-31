export type AnswerState =
  | "unanswered"
  | "answered"
  | "correct"
  | "incorrect";

interface GetAnswerStateParams {
  selectedOptionLabel?: string | null;
  answerText?: string | null;
  isCorrect?: boolean | null;
}

export function getAnswerState(
  params: GetAnswerStateParams
): AnswerState {
  const { selectedOptionLabel, answerText, isCorrect } = params;

  const hasAnswer =
    !!selectedOptionLabel ||
    (answerText != null && answerText.trim().length > 0);

  if (!hasAnswer) return "unanswered";

  if (isCorrect === true) return "correct";
  if (isCorrect === false) return "incorrect";

  return "answered";
}