// components/domain/template-card.tsx

import Link from "next/link";

export interface TemplateCardData {
  id: number;
  name: string;
  sectionCount: number;
  totalQuestions: number;
  updatedAt: string;
}

interface TemplateCardProps {
  template: TemplateCardData;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(template.updatedAt));

  return (
    <Link
      href={`/dashboard/admin/templates/${template.id}`}
      className="block rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>

        <div className="text-sm text-gray-600 space-y-1">
          <p>Sections: {template.sectionCount}</p>
          <p>Total Questions: {template.totalQuestions}</p>
          <p>Last Updated: {formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
