// components/ui/form/form.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
   ========================================================= */

export interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function Form({
  children,
  className,
  ...props
}: FormProps) {
  return (
    <form
      className={cn(
        "flex flex-col",
        "gap-[var(--form-spacing-y)]",
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
}