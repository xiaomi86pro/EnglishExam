// components/domain/exam-state-badge.tsx

import { cn } from "@/lib/utils"
import type { ExamState } from "@/lib/mappers/exam"

interface ExamStateBadgeProps {
  state: ExamState
}

const STATE_CONFIG: Record<
  ExamState,
  { label: string; className: string }
> = {
  not_started: {
    label: "Not Started",
    className: "bg-slate-100 text-slate-600",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-amber-100 text-amber-700",
  },
  submitted: {
    label: "Submitted",
    className: "bg-blue-100 text-blue-700",
  },
  graded: {
    label: "Graded",
    className: "bg-emerald-100 text-emerald-700",
  },
}

export function ExamStateBadge({ state }: ExamStateBadgeProps) {
  const config = STATE_CONFIG[state]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}