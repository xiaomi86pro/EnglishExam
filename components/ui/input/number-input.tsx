import * as React from "react";
import { cn } from "@/lib/utils";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: number | undefined;
  onChange?: (value: number | undefined) => void;
}

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputProps
>(function NumberInput({ className, value, onChange, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="number"
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange?.(val === "" ? undefined : Number(val));
      }}
      className={cn(
        "flex h-10 w-full rounded-md px-3 py-2 text-sm",
        "bg-[rgb(var(--background))]",
        "border border-[rgb(var(--border))]",
        "text-[rgb(var(--foreground))]",
        "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

NumberInput.displayName = "NumberInput";