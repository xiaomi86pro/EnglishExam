// components/domain/difficulty-badge.tsx

import { Badge } from "@/components/ui/data-display/badge";
import type { BadgeTone } from "@/lib/design-system/badge";
import type { Difficulty } from "@/lib/mappers/difficulty";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; tone: BadgeTone }
> = {
  easy: {
    label: "Easy",
    tone: "success",
  },
  medium: {
    label: "Medium",
    tone: "warning",
  },
  hard: {
    label: "Hard",
    tone: "danger",
  },
};

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <Badge tone={config.tone} variant="subtle" size="sm" className={className}>
      {config.label}
    </Badge>
  );
}
