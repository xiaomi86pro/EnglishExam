import * as React from "react";
import { useField } from "./form-field";
import { cn } from "@/lib/utils";


type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  disabled?: boolean;
};

type ControlElement = React.ReactElement<ControlProps>;

export interface FieldControlProps {
  children: ControlElement;
}

export function FieldControl({ children }: FieldControlProps) {
  const { id, helperId, errorId, hasError, disabled } = useField();

  const describedBy = hasError ? errorId : helperId;

  const child = React.Children.only(children) as ControlElement;

  const mergedDescribedBy = cn(
    child.props["aria-describedby"],
    describedBy
  ) || undefined;

  return React.cloneElement(child, {
    id: child.props.id ?? id,
    "aria-describedby": mergedDescribedBy,
    "aria-invalid":
      child.props["aria-invalid"] ?? (hasError || undefined),
    disabled: child.props.disabled ?? disabled,
  });
}