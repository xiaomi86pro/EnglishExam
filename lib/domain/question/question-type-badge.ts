import type {
  BadgeTone,
} from "@/components/ui/data-display/badge";

import type {
  QuestionType,
} from "@/lib/domain/question/question-type";

/* =========================================================
   UI CONFIG
   ========================================================= */

export const QUESTION_TYPE_CONFIG: Record<
  QuestionType,
  { label: string; tone: BadgeTone }
> = {
  mcq_single: {
    label: "Multiple Choice",
    tone: "info",
  },
  text_input: {
    label: "Text Input",
    tone: "neutral",
  },
  passage_mcq: {
    label: "Passage MCQ",
    tone: "purple",
  },
  passage_text: {
    label: "Passage Text",
    tone: "purple",
  },
  reorder: {
    label: "Reorder",
    tone: "warning",
  },
  true_false: {
    label: "True / False",
    tone: "success",
  },
  audio_mcq: {
    label: "Audio MCQ",
    tone: "info",
  },
  audio_text: {
    label: "Audio Text",
    tone: "info",
  },
  essay: {
    label: "Essay",
    tone: "danger",
  },
};