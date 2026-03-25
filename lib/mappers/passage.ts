export type PassageType = "reading" | "listening";

export function mapPassageType(audioUrl?: string | null): PassageType {
  return audioUrl ? "listening" : "reading";
}