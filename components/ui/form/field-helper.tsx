// components/ui/form/field-helper.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
   ========================================================= */

export type FieldHelperProps = React.HTMLAttributes<HTMLParagraphElement>;

/* =========================================================
   COMPONENT
   ========================================================= */

export function FieldHelper({
  children,
  className,
  id,
  ...props
}: FieldHelperProps) {
  if (!children) return null;

  return (
    <p
      id={id}
      className={cn(
        "text-[var(--field-helper-size)]",
        "text-[rgb(var(--field-helper-color))]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}