// components/ui/form/field-label.tsx

import * as React from "react";
import clsx from "clsx";

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
  if (!children) return null;

  return (
    <label
      className={clsx(
        "block text-sm font-medium text-gray-900",
        className
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {required && (
          <span
            aria-hidden="true"
            className="text-red-500"
          >
            *
          </span>
        )}
      </span>
    </label>
  );
}