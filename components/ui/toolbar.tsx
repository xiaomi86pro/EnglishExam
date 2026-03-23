"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}

export function Toolbar({ left, right, className }: ToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        "py-4",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {left}
      </div>

      <div className="flex items-center gap-2">
        {right}
      </div>
    </div>
  );
}