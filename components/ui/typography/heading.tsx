import React from "react";
import { cn } from "@/lib/utils";

type HeadingSize =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

type HeadingWeight =
  | "regular"
  | "medium"
  | "semibold"
  | "bold";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: HeadingSize;
  weight?: HeadingWeight;
  className?: string;
  children: React.ReactNode;
};

const sizeMap: Record<HeadingSize, string> = {
  display: "text-5xl md:text-6xl leading-tight",
  h1: "text-4xl md:text-5xl leading-tight",
  h2: "text-3xl md:text-4xl leading-snug",
  h3: "text-2xl md:text-3xl leading-snug",
  h4: "text-xl md:text-2xl leading-snug",
};

const weightMap: Record<HeadingWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function Heading({
  as = "h2",
  size = "h2",
  weight = "semibold",
  className,
  children,
}: HeadingProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        sizeMap[size],
        weightMap[weight],
        "tracking-tight text-primary",
        className
      )}
    >
      {children}
    </Component>
  );
}