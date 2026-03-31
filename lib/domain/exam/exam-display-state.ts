import type { ExamStatus } from "@/lib/mappers/exam.mapper";

/* =========================================================
   TYPES
   ========================================================= */

export type ExamDisplayState =
  | "inactive"
  | "not_started"
  | "in_progress"
  | "submitted"
  | "graded";

export interface DeriveExamDisplayStateParams {
  status: ExamStatus;
  hasInstance: boolean;
  submittedAt?: string | null;
  gradedAt?: string | null;
}

/* =========================================================
   DOMAIN LOGIC
   ========================================================= */

export function deriveExamDisplayState(
  params: DeriveExamDisplayStateParams
): ExamDisplayState {
  const { status, hasInstance, submittedAt, gradedAt } = params;

  if (status === "inactive") return "inactive";
  if (!hasInstance) return "not_started";
  if (gradedAt) return "graded";
  if (submittedAt) return "submitted";

  return "in_progress";
}