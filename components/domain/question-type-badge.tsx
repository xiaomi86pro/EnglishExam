import { Badge } from "@/components/ui/badge";
import { EngineQuestionType } from "@/types/engine";

type QuestionTypeBadgeProps = {
  type: EngineQuestionType;
};

const labelMap: Record<EngineQuestionType, string> = {
  MCQ_SINGLE: "MCQ",
  TEXT_INPUT: "Text Input",
  PASSAGE_MCQ: "Passage MCQ",
  PASSAGE_TEXT: "Passage Text",
  REORDER: "Reorder",
  TRUE_FALSE: "True / False",
  AUDIO_MCQ: "Audio MCQ",
  AUDIO_TEXT: "Audio Text",
  ESSAY: "Essay",
};

export function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  return (
    <Badge
      className="
        text-xs font-medium
        bg-gray-100
        text-gray-700
      "
    >
      {labelMap[type]}
    </Badge>
  );
}