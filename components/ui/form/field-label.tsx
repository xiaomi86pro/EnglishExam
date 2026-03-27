// components/ui/form/field-label.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
   ========================================================= */

export interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function FieldLabel({
  children,
  required,
  className,
  ...props
}: FieldLabelProps) {
  if (!children) return null;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-1",
        "text-[var(--field-label-size)]",
        "font-[var(--field-label-weight)]",
        "text-[rgb(var(--field-label-color))]",
        className
      )}
      {...props}
    >
      <span>{children}</span>

      {required && (
        <span aria-hidden="true" className="text-[rgb(var(--text-danger))]">
          *
        </span>
      )}
    </label>
  );
}