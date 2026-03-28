import * as React from "react";
import { cn } from "@/lib/utils";

interface HelperTextProps {
  children?: React.ReactNode;
  className?: string;
}

export function HelperText({ children, className }: HelperTextProps) {
  if (!children) return null;

  return (
    <p className={cn("ui-helper-text", className)}>
      {children}
    </p>
  );
}