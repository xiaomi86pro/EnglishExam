import { cn } from "@/lib/utils";
import {
  BADGE_TONE_STYLES,
  BADGE_SIZE_STYLES,
  type BadgeTone,
  type BadgeVariant,
  type BadgeSize,
} from "./tokens";

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export function Badge({
  children,
  tone = "neutral",
  variant = "subtle",
  size = "sm",
  className,
}: BadgeProps) {
  const toneStyle =
    BADGE_TONE_STYLES[tone]?.[variant] ??
    BADGE_TONE_STYLES["neutral"]["subtle"];

  const sizeStyle = BADGE_SIZE_STYLES[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border",
        sizeStyle,
        toneStyle,
        className,
      )}
    >
      {children}
    </span>
  );
}

export type { BadgeTone, BadgeVariant, BadgeSize } from "./tokens";