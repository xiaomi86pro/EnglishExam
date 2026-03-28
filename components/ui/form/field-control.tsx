import * as React from "react";
import { useField } from "./form-field";

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

type ControlElement = React.ReactElement<ControlProps>;

export interface FieldControlProps {
  children: ControlElement;
}

export function FieldControl({ children }: FieldControlProps) {
  const { id, helperId, errorId, hasError } = useField();

  const describedBy = hasError ? errorId : helperId;

  const child = React.Children.only(children); // ✅ runtime guard

  return React.cloneElement(child, {
    id: child.props.id ?? id,
    "aria-describedby":
      child.props["aria-describedby"] ?? describedBy,
    "aria-invalid":
      child.props["aria-invalid"] ?? (hasError ? true : undefined),
  });
}