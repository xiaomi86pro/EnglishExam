import * as React from "react";

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export const DateInput = React.forwardRef<
  HTMLInputElement,
  DateInputProps
>(function DateInput({ value, onChange, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="date"
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange?.(val || undefined);
      }}
      className="border rounded px-3 py-2 w-full"
      {...props}
    />
  );
});