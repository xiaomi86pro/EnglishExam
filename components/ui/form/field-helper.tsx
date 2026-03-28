import * as React from "react";
import { cn } from "@/lib/utils";
import { useField } from "./form-field";

export type FieldHelperProps =
  React.HTMLAttributes<HTMLParagraphElement>;

export function FieldHelper({
  children,
  className,
  ...props
}: FieldHelperProps) {
  const { helperId } = useField();

  if (!children) return null;

  return (
    <p
      id={helperId}
      className={cn(
        "mt-1",
        "text-[var(--field-helper-text-size)]",
        "text-[var(--field-helper-color)]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}