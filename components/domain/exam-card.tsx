// components/domain/exam-card.tsx

import { Card } from "@/components/ui/card";
import { ExamStatusBadge } from "./exam-status-badge";
import type { ExamStatus } from "@/lib/mappers/exam";

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

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ExamStatusBadge status={status} />
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
