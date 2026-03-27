// components/ui/form/field-group.tsx

import * as React from "react";
import { cn } from "@/lib/utils"; 

/* =========================================================
   TYPES
   ========================================================= */

export interface FieldGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  children: React.ReactNode;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function FieldGroup({
  direction = "col",
  children,
  className,
  ...props
}: FieldGroupProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-wrap items-center" : "flex-col",
        "gap-[var(--form-group-spacing)]",
        className
      )}
    >
      {children}
    </div>
  );
}