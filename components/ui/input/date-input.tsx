import * as React from "react";
import { cn } from "@/lib/utils";

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export const DateInput = React.forwardRef<
  HTMLInputElement,
  DateInputProps
>(function DateInput({ className, value, onChange, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="date"
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange?.(val || undefined);
      }}
      className={cn("ui-input-control aria-[invalid=true]:border-[rgb(var(--destructive))] aria-[invalid=true]:ring-[rgb(var(--destructive))]", className)}
      {...props}
    />
  );
});

DateInput.displayName = "DateInput";