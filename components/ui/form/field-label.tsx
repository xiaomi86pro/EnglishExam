import * as React from "react";
import { cn } from "@/lib/utils";
import { useField } from "./form-field";

export interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function FieldLabel({
  children,
  required,
  className,
  ...props
}: FieldLabelProps) {
  const { id } = useField();

  return (
    <label
      htmlFor={id}
      className={cn(
        "text-sm font-medium leading-none",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-[var(--field-error-color)]">*</span>
      )}
    </label>
  );
}

FieldLabel.displayName = "FieldLabel";