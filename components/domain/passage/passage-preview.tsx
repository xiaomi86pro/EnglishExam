// components/domain/passage-preview.tsx

import { Card } from "@/components/ui/data-display/card";
import { PassageTypeBadge } from "./passage-type-badge";

interface PassagePreviewProps {
  id: number;
  content: string;
  audioUrl?: string | null;
  questionCount: number;
}

export function PassagePreview({
  content,
  audioUrl,
  questionCount,
}: PassagePreviewProps) {
  return (
    <Card className="rounded-xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <PassageTypeBadge audioUrl={audioUrl} />

          <span className="text-sm text-muted-foreground">
            {questionCount} questions
          </span>
        </div>

        <p className="text-sm line-clamp-4 whitespace-pre-line">{content}</p>
      </div>
    </Card>
  );
}
