// lib/mappers/exam.ts

/* =========================================================
   EXAM STATUS (Business Configuration Layer)
   ========================================================= */

export type ExamStatus = "active" | "inactive"

/**
 * Map database boolean (exams.is_active)
 * to domain-level ExamStatus.
 */
export function mapExamStatus(is_active: boolean): ExamStatus {
  return is_active ? "active" : "inactive"
}

/* =========================================================
   EXAM STATE (Student Runtime Layer)
   ========================================================= */

export type ExamState =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "graded"

export interface DeriveExamStateParams {
  /**
   * Whether an exam instance exists for this student.
   * In Model A, instance is created at start time.
   */
  hasInstance: boolean

  /**
   * When student submits the exam.
   * Null if not submitted.
   */
  submittedAt: string | null

  /**
   * When teacher finishes grading.
   * Null if not graded.
   */
  gradedAt: string | null
}

/**
 * Derive runtime exam state from raw database fields.
 *
 * Priority order:
 * 1. No instance         -> not_started
 * 2. Graded              -> graded
 * 3. Submitted           -> submitted
 * 4. Otherwise           -> in_progress
 */
export function deriveExamState(
  params: DeriveExamStateParams
): ExamState {
  const { hasInstance, submittedAt, gradedAt } = params

  if (!hasInstance) return "not_started"
  if (gradedAt) return "graded"
  if (submittedAt) return "submitted"
  return "in_progress"
}