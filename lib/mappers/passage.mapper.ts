/* =========================================================
   TYPES
   ========================================================= */

export type PassageType = "reading" | "listening";

/* =========================================================
   MAPPER
   ========================================================= */

/**
 * DB → Domain
 */
export function mapPassageType(
  audioUrl?: string | null
): PassageType {
  return audioUrl ? "listening" : "reading";
}