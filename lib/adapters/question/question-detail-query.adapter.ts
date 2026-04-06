export function mapQuestionDetailParamsToRpc(
  questionId: number
) {
  return {
    p_question_id: questionId,
  };
}