import React from "react";
import clsx from "clsx";

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
      className={clsx(
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