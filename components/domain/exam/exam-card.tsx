// components/domain/exam-card.tsx

import { Card } from "@/components/ui/data-display/card";
import { ExamStateBadge } from "./exam-state-badge";
import {
  deriveExamDisplayState,
  type ExamStatus,
} from "@/lib/mappers/exam.mapper";

interface ExamCardProps {
  id: number;
  title: string;
  durationMinutes: number;
  status: ExamStatus;
  questionCount: number;
  createdAt: string;
}

export function ExamCard({
  title,
  durationMinutes,
  status,
  questionCount,
  createdAt,
}: ExamCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const displayState = deriveExamDisplayState({
    status,
    hasInstance: false,
  });

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ExamStateBadge state={displayState} />
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <div>Duration: {durationMinutes} minutes</div>
          <div>{questionCount} questions</div>
          <div>Created: {formattedDate}</div>
        </div>
      </div>
    </Card>
  );
}
