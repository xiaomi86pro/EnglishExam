import type {
  BadgeTone,
  BadgeVariant,
} from "@/components/ui/data-display/badge";

import type { PassageType } from "@/lib/mappers/passage.mapper";

/* =========================================================
   TYPES
   ========================================================= */

export interface PassageTypeMeta {
  label: string;
  tone: BadgeTone;
  variant: BadgeVariant;
}

/* =========================================================
   UI MAPPING
   ========================================================= */

export const PASSAGE_TYPE_META: Record<
  PassageType,
  PassageTypeMeta
> = {
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