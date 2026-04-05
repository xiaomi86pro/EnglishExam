import { QuestionListContainer } from "@/components/domain/question/question-list-container";

export default function QuestionListPage() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Question List
      </h1>
      <QuestionListContainer />
    </div>
  );
}