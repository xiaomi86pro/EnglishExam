import React from "react";
import clsx from "clsx";

type ContainerProps = {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  children: React.ReactNode;
};

const sizeMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  size = "xl",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "w-full mx-auto px-4 md:px-6",
        sizeMap[size],
        className
      )}
    >
      {children}
    </div>
  );
}