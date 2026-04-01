import { QuestionFormContainer } from "@/components/domain/question/question-form-container";

export default function CreateQuestionPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Create MCQ Question
      </h1>

      <QuestionFormContainer />
    </div>
  );
}