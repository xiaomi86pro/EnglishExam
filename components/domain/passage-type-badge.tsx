import { Badge } from "@/components/ui/badge";
import type { PassageType } from "@/lib/mappers/passage";

interface PassageTypeBadgeProps {
  type: PassageType;
}

const PASSAGE_TYPE_CONFIG: Record<
  PassageType,
  { label: string; className: string }
> = {
  reading: {
    label: "Reading",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  listening: {
    label: "Listening",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

export function PassageTypeBadge({ type }: PassageTypeBadgeProps) {
  const config = PASSAGE_TYPE_CONFIG[type];

  return <Badge className={config.className}>{config.label}</Badge>;
}
