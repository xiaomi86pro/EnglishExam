import * as React from "react";
import { useField } from "./form-field";

type ControlElement =
  | React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>
  | React.ReactElement<React.TextareaHTMLAttributes<HTMLTextAreaElement>>
  | React.ReactElement<React.SelectHTMLAttributes<HTMLSelectElement>>;

export interface FieldControlProps {
  children: ControlElement;
}

export function FieldControl({ children }: FieldControlProps) {
  const { id, helperId, errorId, hasError } = useField();

  const describedBy = hasError ? errorId : helperId;
  const child = children as React.ReactElement<any>;

  return React.cloneElement(child, {
    id: children.props.id ?? id,
    "aria-describedby": children.props["aria-describedby"] ?? describedBy,
    "aria-invalid":
      children.props["aria-invalid"] ?? (hasError ? true : undefined),
  });
}
