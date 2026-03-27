import { EngineQuestionType } from "@/types/engine"
import {
  mapQuestionDifficulty,
  Difficulty,
} from "@/lib/mappers/difficulty"
import { DifficultyBadge } from "@/components/domain/badges/difficulty-badge"
import { QuestionTypeBadge } from "@/components/domain/question/question-type-badge"

interface Option {
  id: number | string;
  content: string;
}

interface QuestionPreviewProps {
  content: string
  type: EngineQuestionType
  difficulty: number | Difficulty
  options?: Option[]
  index?: number
}

export function QuestionPreview({
  content,
  type,
  difficulty,
  options,
  index,
}: QuestionPreviewProps) {
  const normalizedDifficulty: Difficulty =
  typeof difficulty === "number"
    ? mapQuestionDifficulty(difficulty)
    : difficulty

  const isMCQ =
    type === "MCQ_SINGLE" ||
    type === "PASSAGE_MCQ" ||
    type === "AUDIO_MCQ";

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <QuestionTypeBadge type={type} />
        <DifficultyBadge difficulty={normalizedDifficulty} />
      </div>

      {/* Content */}
      <div className="text-sm text-gray-800 whitespace-pre-line">
        {index !== undefined && (
          <span className="font-medium mr-2">Q{index}.</span>
        )}
        {content}
      </div>

      {/* Option Preview */}
      {isMCQ && options && options.length > 0 && (
        <div className="space-y-2 pt-2">
          {options.map((option, i) => (
            <div
              key={option.id}
              className="text-sm border rounded-md px-3 py-2 bg-gray-50"
            >
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {option.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}