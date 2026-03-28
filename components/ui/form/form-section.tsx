import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
   ========================================================= */

export interface FormSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
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
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={title ? headingId : undefined}
      className={cn(
        "flex flex-col",
        "gap-[var(--form-spacing-y)]",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && (
            <h3
              id={headingId}
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