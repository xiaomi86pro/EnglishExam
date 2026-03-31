import { Badge } from "@/components/ui/data-display/badge";
import {
  mapPassageType,
  mapPassageTypeMeta,
  type PassageType,
} from "@/lib/mappers/passage.mapper";

interface PassageTypeBadgeProps {
  type?: PassageType;
  audioUrl?: string | null;
}

export function PassageTypeBadge({ type, audioUrl }: PassageTypeBadgeProps) {
  const resolvedType = type ?? mapPassageType(audioUrl);
  const meta = mapPassageTypeMeta(resolvedType);

  return (
    <Badge tone={meta.tone} variant={meta.variant}>
      {meta.label}
    </Badge>
  );
}
