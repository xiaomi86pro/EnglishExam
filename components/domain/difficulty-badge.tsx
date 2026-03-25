// components/domain/difficulty-badge.tsx

import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/mappers/difficulty";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; className: string }
> = {
  easy: {
    label: "Easy",
    className: "bg-emerald-100 text-emerald-700",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-100 text-amber-700",
  },
  hard: {
    label: "Hard",
    className: "bg-rose-100 text-rose-700",
  },
};

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  const config = DIFFICULTY_CONFIG[difficulty];

  if (!config) return null;

  return (
    <span
      aria-label={`Difficulty: ${config.label}`}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
