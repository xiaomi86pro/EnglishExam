import type { BadgeTone, BadgeVariant } from "@/lib/design-system/badge";
export type PassageType = "reading" | "listening";

export interface PassageTypeMeta {
  label: string;
  tone: BadgeTone;
  variant: BadgeVariant;
}

export const PASSAGE_TYPE_META: Record<PassageType, PassageTypeMeta> = {
  reading: {
    label: "Reading",
    tone: "info",
    variant: "subtle",
  },
  listening: {
    label: "Listening",
    tone: "purple",
    variant: "subtle",
  },
};

export function mapPassageType(audioUrl?: string | null): PassageType {
  return audioUrl ? "listening" : "reading";
}

export function mapPassageTypeMeta(type: PassageType): PassageTypeMeta {
  return PASSAGE_TYPE_META[type];
}