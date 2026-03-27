import * as React from "react";

export interface TimeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export const TimeInput = React.forwardRef<
  HTMLInputElement,
  TimeInputProps
>(function TimeInput({ value, onChange, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="time"
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