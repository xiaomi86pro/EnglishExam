import React from "react";
import { cn } from "@/lib/utils";

type StackDirection = "vertical" | "horizontal";
type StackAlign = "start" | "center" | "end" | "between";

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

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: StackDirection;
  gap?: number | string;
  align?: StackAlign;
  wrap?: boolean;
  children: React.ReactNode;
};

const directionMap = {
  vertical: "flex flex-col",
  horizontal: "flex flex-row",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  between: "justify-between",
};

export function Stack({
  direction = "vertical",
  gap = 4,
  align = "start",
  wrap = false,
  className,
  children,
  style,
  ...props
}: StackProps) {
  const resolvedGapClass =
    typeof gap === "number" ? gapMap[gap] : undefined;

  const fallbackStyle: React.CSSProperties = {
    ...(resolvedGapClass
      ? {}
      : { gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap }),
    ...style,
  };
  return (
    <div
      className={cn(
        directionMap[direction],
        alignMap[align],
        wrap && "flex-wrap",
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