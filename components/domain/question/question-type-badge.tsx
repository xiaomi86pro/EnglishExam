import { Badge } from "@/components/ui/data-display/badge";
import {
  getQuestionTypeLabel,
  getQuestionTypeTone,
  mapQuestionType,
} from "@/lib/mappers/question-type";
import type { EngineQuestionType } from "@/types/engine";

type QuestionTypeBadgeProps = {
  type: EngineQuestionType;
  className?: string;
};

export function QuestionTypeBadge({
  type,
  className,
}: QuestionTypeBadgeProps) {
  const normalizedType = mapQuestionType(type);

  return (
    <Badge
      tone={getQuestionTypeTone(normalizedType)}
      variant="subtle"
      size="sm"
      className={className}
    >
      {getQuestionTypeLabel(normalizedType)}
    </Badge>
  );
}