// components/domain/exam-status-badge.tsx

import { Badge } from "@/components/ui/data-display/badge";
import {
  EXAM_STATUS_BADGE_CONFIG,
  type ExamStatus,
} from "@/lib/mappers/exam";

interface ExamStatusBadgeProps {
  status: ExamStatus;
  className?: string;
}

export function ExamStatusBadge({
  status,
  className,
}: ExamStatusBadgeProps) {
  const config = EXAM_STATUS_BADGE_CONFIG[status];

  return (
    <Badge
      tone={config.tone}
      variant={config.variant}
      size={config.size}
      className={className}
    >
      {config.label}
    </Badge>
  );
}