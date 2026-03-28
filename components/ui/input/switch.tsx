import * as React from "react";
import { cn } from "@/lib/utils";

export type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>

export const Switch = React.forwardRef<
  HTMLInputElement,
  SwitchProps
>(({ className, ...props }, ref) => {
  return (
<label className={cn("ui-switch", className)}>      <input
        ref={ref}
        type="checkbox"
        className="peer sr-only"
        {...props}
      />
      <div className="ui-switch-track" />
      <div className="ui-switch-thumb" />
    </label>
  );
});

Switch.displayName = "Switch";