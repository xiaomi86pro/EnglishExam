import * as React from "react";

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number | undefined;
  onChange?: (value: number | undefined) => void;
}

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputProps
>(function NumberInput({ value, onChange, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="number"
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange?.(val === "" ? undefined : Number(val));
      }}
      className="border rounded px-3 py-2 w-full"
      {...props}
    />
  );
});