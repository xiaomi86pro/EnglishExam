import * as React from "react";
import { cn } from "@/lib/utils";
import { useField } from "./form-field";

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export function FieldError({
  message,
  className,
  ...props
}: FieldErrorProps) {
  const { errorId, error } = useField();

  const content = message ?? error;

  if (!content) return null;

  return (
    <p
      id={errorId}
      role="alert"
      aria-live="polite"
      className={cn(
        "mt-1",
        "text-[var(--field-error-text-size)]",
        "font-[var(--field-error-weight)]",
        "text-[var(--field-error-color)]",
        className
      )}
      {...props}
    >
      {content}
    </p>
  );
}