"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        "rounded-md border px-4 py-3",
        "bg-[var(--control-bg)] border-[var(--control-border)]",
        className
      )}
    >
      {children}
    </div>
  );
}