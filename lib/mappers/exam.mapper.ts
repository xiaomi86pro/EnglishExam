/* =========================================================
   TYPES
   ========================================================= */

export type ExamStatus = "active" | "inactive";

/* =========================================================
   MAPPERS
   ========================================================= */

/**
 * DB → Domain
 */
export function mapExamStatus(is_active: boolean): ExamStatus {
  return is_active ? "active" : "inactive";
}