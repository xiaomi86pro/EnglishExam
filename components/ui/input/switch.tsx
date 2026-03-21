import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch = React.forwardRef<
  HTMLInputElement,
  SwitchProps
>(({ className, ...props }, ref) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        ref={ref}
        type="checkbox"
        className="peer sr-only"
        {...props}
      />
      <div
        className={cn(
        "h-6 w-11 rounded-full transition-colors",
        "bg-[rgb(var(--muted))]",
        "peer-checked:bg-[rgb(var(--primary))]",
        "peer-focus:ring-2 peer-focus:ring-offset-2",
        "peer-focus:ring-[rgb(var(--ring))]"
        )}
      />
      <div
        className={cn(
          "absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform",
          "peer-checked:translate-x-5"
        )}
      />
    </label>
  );
});

Switch.displayName = "Switch";