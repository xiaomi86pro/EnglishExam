// components/ui/form/form-field.tsx

import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./field-label";
import { FieldError } from "./field-error";
import { FieldHelper } from "./field-helper";

/* =========================================================
   TYPES
   ========================================================= */

export interface FormFieldProps {
  label?: React.ReactNode;
  required?: boolean;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  children: React.ReactElement;
  className?: string;
  id?: string;
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

export function FormField({
  label,
  required,
  error,
  helperText,
  children,
  className,
  id,
}: FormFieldProps) {
  // base id
  const reactId = React.useId();
  const baseId = id || reactId || generateId();

  const inputId = baseId;
  const helperId = `${baseId}-helper`;
  const errorId = `${baseId}-error`;

  const hasError = Boolean(error);

  /* =========================================================
     ARIA DESCRIBEDBY
     ========================================================= */

  let describedBy: string | undefined;

  if (hasError) {
    describedBy = errorId;
  } else if (helperText) {
    describedBy = helperId;
  }

  /* =========================================================
     CLONE CHILD (inject props into input)
     ========================================================= */

  const childProps = children.props as any;

const child = React.cloneElement(
  children as React.ReactElement<any>,
  {
    id: childProps.id || inputId,
    "aria-describedby":
      childProps["aria-describedby"] || describedBy,
    "aria-invalid":
      childProps["aria-invalid"] ??
      (hasError ? true : undefined),
  }
);
  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div
      className={cn(
        "flex flex-col",
        "gap-[var(--form-label-spacing)]",
        className
      )}
    >
      {/* LABEL */}
      {label && (
        <FieldLabel htmlFor={inputId} required={required}>
          {label}
        </FieldLabel>
      )}

      {/* INPUT */}
      {child}

      {/* ERROR / HELPER */}
      {hasError ? (
        <FieldError id={errorId}>{error}</FieldError>
      ) : (
        helperText && (
          <FieldHelper id={helperId}>{helperText}</FieldHelper>
        )
      )}
    </div>
  );
}