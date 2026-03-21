import * as React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants, sizeVariants } from "./button";

interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode;
  label?: string; // optional label for accessibility
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
            "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
            "bg-[var(--icon-btn-bg-default)] hover:bg-[var(--icon-btn-hover)]",
            "focus:ring-[var(--icon-btn-focus-ring)]",
            sizeVariants[size],
            className
        )}
        >
        {icon}
        </button>
    );
  }
);
IconButton.displayName = "IconButton";