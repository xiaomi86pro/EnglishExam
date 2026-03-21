"use client";

import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: FilterOption[];
}

export function FilterDropdown({
  className,
  options,
  ...props
}: FilterDropdownProps) {
  return (
    <select
      className={cn(
        "w-full rounded-md border px-3 py-2 text-sm",
        "bg-[var(--control-bg)]",
        "border-[var(--control-border)]",
        "text-[var(--control-text)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--control-focus)] focus:ring-offset-2",
        "disabled:bg-[var(--control-disabled)] disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}