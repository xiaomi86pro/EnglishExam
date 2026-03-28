import * as React from "react";
import { cn } from "@/lib/utils";
import { useField } from "./form-field";

export interface FieldHelperProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FieldHelper({
  children,
  className,
  ...props
}: FieldHelperProps) {
  const { helperId, hasError } = useField();

  if (hasError || !children) return null;

  return (
    <p
      id={helperId}
      className={cn(
        "mt-1 text-[var(--field-helper-color)] text-sm",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

FieldHelper.displayName = "FieldHelper";