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
      className={cn("ui-input-control aria-[invalid=true]:border-[rgb(var(--destructive))] aria-[invalid=true]:ring-[rgb(var(--destructive))]", className)}
      {...props}
    />
  );
});

NumberInput.displayName = "NumberInput";