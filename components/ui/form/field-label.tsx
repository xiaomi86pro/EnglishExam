import * as React from "react";
import { cn } from "@/lib/utils";
import { useField } from "./form-field";

export type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function FieldLabel({
  children,
  className,
  ...props
}: FieldLabelProps) {
  const { id, required } = useField();

  return (
    <label
      htmlFor={props.htmlFor ?? id}
      aria-required={required || undefined}
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