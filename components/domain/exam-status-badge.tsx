// components/domain/exam-status-badge.tsx

import { cn } from "@/lib/utils"
import type { ExamStatus } from "@/lib/mappers/exam"

interface ExamStatusBadgeProps {
  status: ExamStatus
}

const STATUS_CONFIG: Record<
  ExamStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-100 text-emerald-700",
  },
  inactive: {
    label: "Inactive",
    className: "bg-slate-100 text-slate-600",
  },
}

export function ExamStatusBadge({ status }: ExamStatusBadgeProps) {
  const config = STATUS_CONFIG[status]

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