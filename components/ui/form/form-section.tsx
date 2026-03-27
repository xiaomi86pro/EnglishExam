// components/ui/form/form-section.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
   ========================================================= */

export interface FormSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function FormSection({
  title,
  description,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col",
        "gap-[var(--form-spacing-y)]",
        "mb-[var(--form-section-spacing)]",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && (
            <h3
              className={cn(
                "text-base font-semibold",
                "text-[rgb(var(--text-primary))]"
              )}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={cn(
                "text-sm",
                "text-[rgb(var(--text-muted))]"
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}