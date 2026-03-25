import type { BadgeTone } from "@/lib/design-system/badge";

/* =========================================================
   DOMAIN QUESTION TYPE
   ========================================================= */

export type QuestionType =
    | "mcq_single"
    | "text_input"
    | "passage_mcq"
    | "passage_text"
    | "reorder"
    | "true_false"
    | "audio_mcq"
    | "audio_text"
    | "essay";

const QUESTION_TYPE_CODES = [
    "MCQ_SINGLE",
    "TEXT_INPUT",
    "PASSAGE_MCQ",
    "PASSAGE_TEXT",
    "REORDER",
    "TRUE_FALSE",
    "AUDIO_MCQ",
    "AUDIO_TEXT",
    "ESSAY",
] as const;

type QuestionTypeCode = (typeof QUESTION_TYPE_CODES)[number];

const QUESTION_TYPE_BY_CODE: Record<QuestionTypeCode, QuestionType> = {
    MCQ_SINGLE: "mcq_single",
    TEXT_INPUT: "text_input",
    PASSAGE_MCQ: "passage_mcq",
    PASSAGE_TEXT: "passage_text",
    REORDER: "reorder",
    TRUE_FALSE: "true_false",
    AUDIO_MCQ: "audio_mcq",
    AUDIO_TEXT: "audio_text",
    ESSAY: "essay",
};

const QUESTION_TYPE_CONFIG: Record<
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

/* =========================================================
   DB → DOMAIN
   ========================================================= */

/**
 * Map question_types.code (DB)
 * to domain-level QuestionType
 */
export function mapQuestionType(code: string): QuestionType {
    if (QUESTION_TYPE_CODES.includes(code as QuestionTypeCode)) {
        return QUESTION_TYPE_BY_CODE[code as QuestionTypeCode];
    }

    throw new Error(`Unknown question type code: ${code}`);
}


/** Label */

export function getQuestionTypeLabel(type: QuestionType): string {
    return QUESTION_TYPE_CONFIG[type].label;
}

export function getQuestionTypeTone(type: QuestionType): BadgeTone {
    return QUESTION_TYPE_CONFIG[type].tone;
}