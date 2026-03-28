import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   CONTEXT
   ========================================================= */

interface FieldContextValue {
  id: string;
  helperId: string;
  errorId: string;
  hasError: boolean;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

export function useField() {
  const ctx = React.useContext(FieldContext);
  if (!ctx) {
    throw new Error("useField must be used within <FormField>");
  }
  return ctx;
}

/* =========================================================
   TYPES
   ========================================================= */

export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

/* =========================================================
   UTILS
   ========================================================= */

function generateId() {
  return `field-${Math.random().toString(36).slice(2, 9)}`;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function FormField({ children, className }: FormFieldProps) {
  const reactId = React.useId();
  const baseId = reactId || generateId();

  const helperId = `${baseId}-helper`;
  const errorId = `${baseId}-error`;

  // detect error presence
  let hasError = false;

  React.Children.forEach(children, (child: any) => {
    if (
      child?.type?.displayName === "FieldError" &&
      child.props?.children
    ) {
      hasError = true;
    }
  });

  const value: FieldContextValue = {
    id: baseId,
    helperId,
    errorId,
    hasError,
  };

  return (
    <FieldContext.Provider value={value}>
      <div
        className={cn(
          "flex flex-col gap-[var(--form-label-spacing)]",
          className
        )}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
}