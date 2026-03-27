"use client"

import React from "react"
import { cn } from "@/lib/utils"

// UI (your custom form system)
import { FormField } from "@/components/ui/form/form-field"
import { FieldLabel } from "@/components/ui/form/field-label"
import { FieldError } from "@/components/ui/form/field-error"
import { FieldHelper } from "@/components/ui/form/field-helper"

import { Input } from "@/components/ui/input/text-input"
import { Textarea } from "@/components/ui/input/textarea"
import { Select } from "@/components/ui/input/select"

// domain mappers
import type { QuestionType } from "@/lib/mappers/question-type"
import { getQuestionTypeLabel } from "@/lib/mappers/question-type"

import type { Difficulty } from "@/lib/mappers/difficulty"

/* =========================================================
   TYPES
   ========================================================= */

export interface QuestionEditorValue {
  content: string
  type: QuestionType
  difficulty: Difficulty
}

export interface QuestionEditorProps {
  value: QuestionEditorValue
  onChange: (value: QuestionEditorValue) => void

  errors?: Partial<Record<keyof QuestionEditorValue, string>>
  disabled?: boolean
  className?: string
}

/* =========================================================
   CONSTANTS
   ========================================================= */

const QUESTION_TYPES: QuestionType[] = [
  "mcq_single",
  "text_input",
  "passage_mcq",
  "passage_text",
  "reorder",
  "true_false",
  "audio_mcq",
  "audio_text",
  "essay",
]

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"]

/* =========================================================
   COMPONENT
   ========================================================= */

export function QuestionEditor(props: QuestionEditorProps) {
  const { value, onChange, errors, disabled, className } = props

  function update<K extends keyof QuestionEditorValue>(
    key: K,
    next: QuestionEditorValue[K]
  ) {
    onChange({ ...value, [key]: next })
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-2xl border p-6",
        "bg-[var(--card-bg)] border-[var(--card-border)]",
        className
      )}
    >
      {/* CONTENT */}
      <FormField>
        <FieldLabel required>Nội dung câu hỏi</FieldLabel>

        <Textarea
          value={value.content}
          onChange={(e) => update("content", e.target.value)}
          placeholder="Nhập nội dung câu hỏi..."
          disabled={disabled}
        />

        {errors?.content && <FieldError message={errors.content} />}
        <FieldHelper>Có thể dùng HTML/markdown nếu editor hỗ trợ</FieldHelper>
      </FormField>

      {/* TYPE + DIFFICULTY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TYPE */}
        <FormField>
          <FieldLabel required>Loại câu hỏi</FieldLabel>

          <Select
            value={value.type}
            onChange={(v) => update("type", v as QuestionType)}
            disabled={disabled}
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {getQuestionTypeLabel(t)}
              </option>
            ))}
          </Select>

          {errors?.type && <FieldError message={errors.type} />}
        </FormField>

        {/* DIFFICULTY */}
        <FormField>
          <FieldLabel required>Độ khó</FieldLabel>

          <Select
            value={value.difficulty}
            onChange={(v) => update("difficulty", v as Difficulty)}
            disabled={disabled}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>

          {errors?.difficulty && (
            <FieldError message={errors.difficulty} />
          )}
        </FormField>
      </div>
    </div>
  )
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
