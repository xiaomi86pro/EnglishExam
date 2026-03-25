// components/domain/exam-state-badge.tsx

import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/lib/design-system/badge";
import type { ExamState } from "@/lib/mappers/exam";

interface ExamStateBadgeProps {
  state: ExamState;
}

const STATE_CONFIG: Record<
  ExamState,
  { label: string; tone: BadgeTone }
> = {
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

export function ExamStateBadge({ state }: ExamStateBadgeProps) {
  const config = STATE_CONFIG[state];

  return <Badge tone={config.tone}>{config.label}</Badge>;
}