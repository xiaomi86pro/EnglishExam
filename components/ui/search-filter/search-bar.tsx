"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export function SearchBar({
  className,
  onSearch,
  ...props
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className={cn(
          "w-full rounded-md border px-4 py-2 text-sm",
          "bg-[var(--control-bg)]",
          "border-[var(--control-border)]",
          "text-[var(--control-text)]",
          "placeholder:text-[var(--control-muted)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--control-focus)] focus:ring-offset-2",
          "disabled:bg-[var(--control-disabled)] disabled:cursor-not-allowed disabled:opacity-70",
          className
        )}
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--control-muted)]">
        🔍
      </div>
    </div>
  );
}