import React from "react";
import { cn } from "@/lib/utils";

const gridColsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const gapMap: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
  11: "gap-11",
  12: "gap-12",
};

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  cols?: number;
  gap?: number | string;
  children: React.ReactNode;
};

export function Grid({
  cols = 2,
  gap = 6,
  className,
  children,
  style,
  ...props
}: GridProps) {
   const resolvedColsClass = gridColsMap[cols];
  const resolvedGapClass =
    typeof gap === "number" ? gapMap[gap] : undefined;

  const fallbackStyle: React.CSSProperties = {
    ...(resolvedColsClass
      ? {}
      : { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }),
    ...(resolvedGapClass
      ? {}
      : { gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap }),
    ...style,
  };

  return (
    <div
      className={cn(
        "grid",
        resolvedColsClass,
        resolvedGapClass,
        className
      )}
      style={fallbackStyle}
      {...props}
    >
      {children}
    </div>
  );
}