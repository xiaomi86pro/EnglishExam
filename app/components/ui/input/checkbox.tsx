// components/ui/input/checkbox.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "h-4 w-4 rounded",
        "border-[rgb(var(--border))]",
        "text-[rgb(var(--foreground))]",
        "focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
        )}
      {...props}
    />
  )
})

Checkbox.displayName = "Checkbox"