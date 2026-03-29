import React from "react";
import { cn } from "@/lib/utils";

type StackDirection = "vertical" | "horizontal";
type StackAlign = "start" | "center" | "end" | "between";

type StackProps = {
  direction?: StackDirection;
  gap?: number;
  align?: StackAlign;
  wrap?: boolean;
  className?: string;
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
}: StackProps) {
  return (
    <div
      className={cn(
        directionMap[direction],
        alignMap[align],
        wrap && "flex-wrap",
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
}