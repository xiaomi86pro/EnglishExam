// lib/mappers/exam.ts
import type {
  BadgeTone,
  BadgeVariant,
  BadgeSize,
} from "@/lib/design-system/badge";
/* =========================================================
   EXAM STATUS (Business Configuration Layer)
   ========================================================= */

export type ExamStatus = "active" | "inactive";

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

/**
 * Map database boolean (exams.is_active)
 * to domain-level ExamStatus.
 */
export function mapExamStatus(is_active: boolean): ExamStatus {
  return is_active ? "active" : "inactive";
}

/* =========================================================
   EXAM DISPLAY STATE (Unified UI Layer)
   ========================================================= */

export type ExamDisplayState =
  | "inactive"
  | "not_started"
  | "in_progress"
  | "submitted"
  | "graded";

export interface DeriveExamDisplayStateParams {
  /**
   * Domain-level exam status.
   */
  status: ExamStatus;
  /**
   * Whether an exam instance exists for this student.
   * In Model A, instance is created at start time.
   */
  hasInstance: boolean;

  /**
   * When student submits the exam.
   * Null if not submitted.
   */
  submittedAt?: string | null;

  /**
   * When teacher finishes grading.
   * Null if not graded.
   */
  gradedAt?: string | null;
}

/**
 * Derive unified exam display state from raw database fields.
 *
 * Priority order:
 * 1. Inactive exam       -> inactive
 * 2. No instance         -> not_started
 * 3. Graded              -> graded
 * 4. Submitted           -> submitted
 * 5. Otherwise           -> in_progress
 */
export function deriveExamDisplayState(
  params: DeriveExamDisplayStateParams,
): ExamDisplayState {
  const { status, hasInstance, submittedAt, gradedAt } = params;

  if (status === "inactive") return "inactive";
  if (!hasInstance) return "not_started";
  if (gradedAt) return "graded";
  if (submittedAt) return "submitted";
  return "in_progress";
}