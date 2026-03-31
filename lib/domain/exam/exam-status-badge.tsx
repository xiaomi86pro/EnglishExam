import type {
  BadgeTone,
  BadgeVariant,
  BadgeSize,
} from "@/components/ui/data-display/badge";

import type { ExamStatus } from "@/lib/mappers/exam.mapper";

export interface ExamStatusBadgeConfig {
  label: string;
  tone: BadgeTone;
  variant: BadgeVariant;
  size: BadgeSize;
}

export const EXAM_STATUS_BADGE_CONFIG: Record<
  ExamStatus,
  ExamStatusBadgeConfig
> = {
  active: {
    label: "Active",
    tone: "success",
    variant: "subtle",
    size: "sm",
  },
  inactive: {
    label: "Inactive",
    tone: "neutral",
    variant: "subtle",
    size: "sm",
  },
};