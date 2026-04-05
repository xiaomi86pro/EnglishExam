"use client";

import { cn } from "@/lib/utils";

// UI (your custom form system)
import { FormField } from "@/components/ui/form/form-field";
import { FieldLabel } from "@/components/ui/form/field-label";
import { FieldError } from "@/components/ui/form/field-error";
import { FieldHelper } from "@/components/ui/form/field-helper";
import { FieldControl } from "@/components/ui/form/field-control";

import { Textarea } from "@/components/ui/input/textarea";
import { Select } from "@/components/ui/input/select";

/* =========================================================
   TYPES
   ========================================================= */
import type {
  QuestionUpdateFormValues,
} from "@/types/question/question.form";

export interface QuestionEditorProps {
  value: QuestionUpdateFormValues;
  onChange: (
    value: QuestionUpdateFormValues
  ) => void;

  errors?: Partial<
    Record<keyof QuestionUpdateFormValues, string>
  >;
  disabled?: boolean;
  className?: string;
}

/* =========================================================
   CONSTANTS
   ========================================================= */

const DIFFICULTIES: QuestionUpdateFormValues["difficulty"][] = [
  "easy",
  "medium",
  "hard",
];

/* =========================================================
   COMPONENT
   ========================================================= */

export function QuestionEditor(props: QuestionEditorProps) {
  const { value, onChange, errors, disabled, className } = props;

  function update<K extends keyof QuestionUpdateFormValues>(
    key: K,
    next: QuestionUpdateFormValues[K],
  ) {
    onChange({ ...value, [key]: next });
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-2xl border p-6",
        "bg-[var(--card-bg)] border-[var(--card-border)]",
        className,
      )}
    >
      {/* QuestionText */}
      <FormField error={errors?.questionText} required disabled={disabled}>
        <FieldLabel>Nội dung câu hỏi</FieldLabel>

        <FieldControl>
          <Textarea
            value={value.questionText}
            onChange={(e) => update("questionText", e.target.value)}
            placeholder="Nhập nội dung câu hỏi..."
          />
        </FieldControl>

        {!errors?.questionText && (
          <FieldHelper>Có thể dùng HTML/markdown nếu editor hỗ trợ</FieldHelper>
        )}

        <FieldError />
      </FormField>

      {/* DIFFICULTY */}
      <FormField>
        <FieldLabel>Độ khó</FieldLabel>

        <FieldControl>
          <Select
            value={value.difficulty}
            onChange={(e) =>
              update(
                "difficulty",
                e.target.value as QuestionUpdateFormValues["difficulty"]
              )
            }
            disabled={disabled}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </FieldControl>

        <FieldError id="question-difficulty-error">
          {errors?.difficulty}
        </FieldError>
      </FormField>
    </div>
  );
}

/* =========================================================
   NOTES
   =========================================================

   - Stateless controlled component
   - Domain-safe: uses QuestionType + Difficulty
   - No DB leakage (no numeric difficulty here)
   - Ready to plug into form lib (react-hook-form later)

   NEXT STEP (recommended):
   - Extract QuestionContentEditor (rich text)
   - Add AnswerEditor per question type (MCQ, TEXT...)

*/
