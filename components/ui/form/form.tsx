import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
   ========================================================= */

export type FormProps =
  React.FormHTMLAttributes<HTMLFormElement>;

/* =========================================================
   COMPONENT
   ========================================================= */

export function Form({
  children,
  className,
  noValidate,
  ...props
}: FormProps) {
  return (
    <form
      noValidate={noValidate ?? true}
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