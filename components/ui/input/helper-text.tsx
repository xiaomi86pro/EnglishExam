import * as React from "react";
import { cn } from "@/lib/utils";

interface HelperTextProps {
  children?: React.ReactNode;
  error?: boolean;
  className?: string;
}

export function HelperText({ children, error, className }: HelperTextProps) {
  if (!children) return null;

  return (
    <p
      className={cn(
        "mt-1 text-sm",
        error ? "text-[rgb(var(--destructive))]" : "text-[rgb(var(--muted-foreground))]",
        className
      )}
    >
      {children}
    </p>
  );
}