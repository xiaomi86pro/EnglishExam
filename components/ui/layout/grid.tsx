import React from "react";
import { cn } from "@/lib/utils";

type GridProps = {
  cols?: number;
  gap?: number;
  className?: string;
  children: React.ReactNode;
};

export function Grid({
  cols = 2,
  gap = 6,
  className,
  children,
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${cols}`,
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
}