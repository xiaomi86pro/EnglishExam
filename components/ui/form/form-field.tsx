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
  error?: string;

  required?: boolean;
  disabled?: boolean;
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

  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export function FormField({
  children,
  className,
  error,
  required,
  disabled,
}: FormFieldProps) {
  const baseId = React.useId();

  const helperId = `${baseId}-helper`;
  const errorId = `${baseId}-error`;

  const value: FieldContextValue = {
    id: baseId,
    helperId,
    errorId,
    hasError: !!error,
    error,
    required,
    disabled,
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