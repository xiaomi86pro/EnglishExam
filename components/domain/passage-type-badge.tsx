import { Badge } from "@/components/ui/badge";

interface PassageTypeBadgeProps {
  audioUrl?: string | null;
}

export function PassageTypeBadge({ audioUrl }: PassageTypeBadgeProps) {
  const isListening = !!audioUrl;

  if (isListening) {
    return (
      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
        Listening
      </Badge>
    );
  }

  return (
    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
      Reading
    </Badge>
  );
}