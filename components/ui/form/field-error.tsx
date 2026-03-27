import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FieldError({
  children,
  className,
  id,
  ...props
}: FieldErrorProps) {
  if (!children) return null;

  return (
    <p
      id={id}
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
      {children}
    </p>
  );
}