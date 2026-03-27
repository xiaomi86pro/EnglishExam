// components/domain/exam-state-badge.tsx

import { Badge } from "@/components/ui/data-display/badge";
import type { BadgeTone } from "@/lib/design-system/badge";
import type { ExamDisplayState } from "@/lib/mappers/exam";

interface ExamStateBadgeProps {
  state: ExamDisplayState;
  className?: string;
}

const STATE_CONFIG: Record<
  ExamDisplayState,
  { label: string; tone: BadgeTone }
> = {
  inactive: {
    label: "Inactive",
    tone: "neutral",
  },
  not_started: {
    label: "Not Started",
    tone: "neutral",
  },
  in_progress: {
    label: "In Progress",
    tone: "warning",
  },
  submitted: {
    label: "Submitted",
    tone: "info",
  },
  graded: {
    label: "Graded",
    tone: "success",
  },
};

export function ExamStateBadge({ state, className }: ExamStateBadgeProps) {
  const config = STATE_CONFIG[state];

  return (
    <Badge tone={config.tone} className={className}>
      {config.label}
    </Badge>
  );
}