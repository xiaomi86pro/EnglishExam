// components/domain/template-card.tsx

import Link from "next/link";

export interface TemplateCardData {
  id: number;
  name: string;
  sectionCount: number;
  totalQuestions: number;
  updatedAt: string | Date;
  isActive?: boolean; // optional but recommended
}

interface TemplateCardProps {
  template: TemplateCardData;
  href: string; // injected from parent (Admin / Teacher decide)
}

export function TemplateCard({ template, href }: TemplateCardProps) {
  const date =
    template.updatedAt instanceof Date
      ? template.updatedAt
      : new Date(template.updatedAt);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return (
    <Link
      href={href}
      className="block rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {template.name}
          </h3>

          {template.isActive !== undefined && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                template.isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {template.isActive ? "Active" : "Inactive"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-600">
          <p>Sections:</p>
          <p className="text-right font-medium">{template.sectionCount}</p>

          <p>Total Questions:</p>
          <p className="text-right font-medium">{template.totalQuestions}</p>

          <p>Last Updated:</p>
          <p className="text-right font-medium">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}
