import React from "react";
import clsx from "clsx";

type TextSize =
  | "body-lg"
  | "body"
  | "body-sm"
  | "caption";

type TextTone =
  | "primary"
  | "secondary"
  | "muted"
  | "danger"
  | "success";

type TextWeight =
  | "regular"
  | "medium"
  | "semibold";

type TextProps = {
  as?: "p" | "span" | "div";
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
};

const sizeMap: Record<TextSize, string> = {
  "body-lg": "text-lg leading-relaxed",
  body: "text-base leading-relaxed",
  "body-sm": "text-sm leading-normal",
  caption: "text-xs leading-snug",
};

const toneMap: Record<TextTone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  muted: "text-muted",
  danger: "text-danger",
  success: "text-success",
};

const weightMap: Record<TextWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

export function Text({
  as = "p",
  size = "body",
  tone = "primary",
  weight = "regular",
  truncate = false,
  className,
  children,
}: TextProps) {
  const Component = as;

  return (
    <Component
      className={clsx(
        sizeMap[size],
        toneMap[tone],
        weightMap[weight],
        truncate && "truncate",
        className
      )}
    >
      {children}
    </Component>
  );
}