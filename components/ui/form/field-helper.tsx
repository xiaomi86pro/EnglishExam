// components/ui/form/field-helper.tsx

import * as React from "react";
import clsx from "clsx";

export interface FieldHelperProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FieldHelper({
  children,
  className,
  id,
  ...props
}: FieldHelperProps) {
  if (!children) return null;

  return (
    <p
      id={id}
      className={clsx(
        "text-sm text-gray-500",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}