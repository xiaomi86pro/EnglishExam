"use client";

import { useState } from "react";
import type { QuestionFormValues } from "@/types/question/question.form";

interface QuestionFormProps {
  onSubmit: (values: QuestionFormValues) => Promise<void>;
  isSubmitting?: boolean;
  submitError?: string | null;
  createdId?: number | null;
}

const defaultValues: QuestionFormValues = {
  question_text: "",
  explanation: "",
  grade_level: 10,
  difficulty: "medium",
  category_id: 1,
  options: [
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
  ],
  tag_ids: [],
};

export function QuestionForm({
  onSubmit,
  isSubmitting = false,
  submitError = null,
  createdId = null,
}: QuestionFormProps) {
  const [form, setForm] = useState<QuestionFormValues>(defaultValues);

  const updateOption = (index: number, option_text: string) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { ...opt, option_text } : opt
      ) as QuestionFormValues["options"],
    }));
  };

  const setCorrectOption = (index: number) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => ({
        ...opt,
        is_correct: i === index,
      })) as QuestionFormValues["options"],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border p-6 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-medium">Question Text</label>
        <textarea
          value={form.question_text}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, question_text: e.target.value }))
          }
          className="min-h-24 w-full rounded-xl border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Explanation</label>
        <textarea
          value={form.explanation}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, explanation: e.target.value }))
          }
          className="min-h-20 w-full rounded-xl border p-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Grade Level</label>
          <input
            type="number"
            min={6}
            max={12}
            value={form.grade_level}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                grade_level: Number(e.target.value),
              }))
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Category ID</label>
          <input
            type="number"
            min={1}
            value={form.category_id}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                category_id: Number(e.target.value),
              }))
            }
            className="w-full rounded-xl border p-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Difficulty</label>
        <select
          value={form.difficulty}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              difficulty: e.target.value as QuestionFormValues["difficulty"],
            }))
          }
          className="w-full rounded-xl border p-3"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Options</p>
        {form.options.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-6 font-semibold">
              {String.fromCharCode(65 + index)}
            </span>
            <input
              value={option.option_text}
              onChange={(e) => updateOption(index, e.target.value)}
              className="flex-1 rounded-xl border p-3"
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              required
            />
            <input
              type="radio"
              checked={option.is_correct}
              onChange={() => setCorrectOption(index)}
            />
          </div>
        ))}
      </div>

      {submitError && (
        <div className="rounded-xl border p-3 text-sm">{submitError}</div>
      )}

      {createdId && (
        <div className="rounded-xl border p-3 text-sm">
          Created question #{createdId}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-2xl border px-5 py-3 font-medium"
      >
        {isSubmitting ? "Creating..." : "Create Question"}
      </button>
    </form>
  );
}
