// components/ui/input/checkbox.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(
  (
    {
      className,
      checked = false,
      indeterminate = false,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);

    // Merge forwarded ref + internal ref
    React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

    // Set indeterminate state
    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <input
        type="checkbox"
        ref={internalRef}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className={cn(
          "h-4 w-4 rounded",
          "border-[rgb(var(--border))]",
          "text-[rgb(var(--foreground))]",
          "focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";