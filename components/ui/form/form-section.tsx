// components/ui/form/form-section.tsx

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FormSectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col",
        "gap-[var(--form-spacing-y)]",
        "mb-[var(--form-section-spacing)]",
        className
      )}
    >
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && (
            <h3 className="text-base font-semibold">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  )
}