import * as React from "react";
import { cn } from "@/lib/utils"; // utils cn() đã dùng cho className merge

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const buttonVariants = {
  default: "bg-slate-900 text-white hover:bg-slate-800",
  destructive: "bg-red-600 text-white hover:bg-red-500",
  outline: "border border-slate-200 hover:bg-slate-100",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
};

export const sizeVariants = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          "bg-[var(--btn-bg-default)] hover:bg-[var(--btn-bg-hover)]",
          "focus:ring-[var(--btn-focus-ring)] disabled:bg-[var(--btn-bg-disabled)]",
          sizeVariants[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";