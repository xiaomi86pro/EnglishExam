"use client";

import { Input } from "@/components/ui/input/text-input";
import { Select } from "@/components/ui/input/select";
import type { QuestionCategorySelectOption } from "@/lib/mappers/question-category.mapper";

type Props = {
  search: string;
  categoryId?: number;
  questionTypeCode?: string;
  difficulty?: number;
  viewMode: "table" | "card";
  categoryOptions: QuestionCategorySelectOption[];
  onSearchChange: (v: string) => void;
  onCategoryChange: (v?: number) => void;
  onQuestionTypeChange: (v?: string) => void;
  onDifficultyChange: (v?: number) => void;
  onViewModeChange: (viewMode: "table" | "card") => void;
  onClearFilters: () => void;
  selectedCount: number;
  onBulkDelete?: () => void;
};

const QUESTION_TYPE_OPTIONS = [
  "MCQ_SINGLE",
  "TEXT_INPUT",
  "TRUE_FALSE",
  "PASSAGE_MCQ",
  "PASSAGE_TEXT",
  "REORDER",
  "AUDIO_MCQ",
  "AUDIO_TEXT",
  "ESSAY",
];

export function QuestionListToolbar({
  search,
  categoryId,
  questionTypeCode,
  difficulty,
  viewMode,
  categoryOptions,
  onSearchChange,
  onCategoryChange,
  onQuestionTypeChange,
  onDifficultyChange,
  onViewModeChange,
  onClearFilters,
  selectedCount,
  onBulkDelete,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search questions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-72"
        />

        <Select
          value={categoryId ?? ""}
          onChange={(e) =>
            onCategoryChange(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className="min-w-[180px]"
        >
          <option value="">All categories</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={questionTypeCode ?? ""}
          onChange={(e) =>
            onQuestionTypeChange(e.target.value || undefined)
          }
          className="min-w-[180px]"
        >
          <option value="">All types</option>
          {QUESTION_TYPE_OPTIONS.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </Select>

        <Select
          value={difficulty ?? ""}
          onChange={(e) =>
            onDifficultyChange(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className="min-w-[140px]"
        >
          <option value="">All difficulty</option>
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              Difficulty {level}
            </option>
          ))}
        </Select>

        <button
          onClick={onClearFilters}
          className="rounded-md border px-3 py-2 text-sm"
        >
          Clear
        </button>

        <div className="inline-flex rounded-md border p-1">
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={`rounded px-3 py-1 text-sm ${
              viewMode === "table" ? "bg-muted font-medium" : ""
            }`}
          >
            Table
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("card")}
            className={`rounded px-3 py-1 text-sm ${
              viewMode === "card" ? "bg-muted font-medium" : ""
            }`}
          >
            Card
          </button>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm">{selectedCount} selected</span>
          <button
            onClick={onBulkDelete}
            className="rounded-md border px-3 py-1 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
