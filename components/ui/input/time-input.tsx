import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimeInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export const TimeInput = React.forwardRef<
  HTMLInputElement,
  TimeInputProps
>(function TimeInput({ className, value, onChange, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="time"
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange?.(val || undefined);
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

TimeInput.displayName = "TimeInput";