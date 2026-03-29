import type { QuestionFormValues } from "@/types/question";

export function QuestionCard({ question }: { question: QuestionFormValues }) {
  return (
    <div className="border p-4 flex flex-col gap-2">

      <div className="font-medium">
        {question.question_text}
      </div>

      <ul className="flex flex-col gap-1">
        {question.options.map((opt) => (
          <li
            key={opt.label}
            className={
              opt.is_correct ? "font-bold text-green-600" : ""
            }
          >
            {opt.label}. {opt.text}
          </li>
        ))}
      </ul>

      {question.explanation && (
        <div className="text-sm text-muted">
          {question.explanation}
        </div>
      )}
    </div>
  );
}