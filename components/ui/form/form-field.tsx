import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
   ========================================================= */

export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        "gap-[var(--form-label-spacing)]",
        className
      )}
    >
      {children}
    </div>
  );
}