// components/ui/input/select.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
        "flex h-10 w-full rounded-md px-3 py-2 text-sm",
        "bg-[rgb(var(--background))]",
        "border border-[rgb(var(--border))]",
        "text-[rgb(var(--foreground))]",
        "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-[rgb(var(--destructive))] focus:ring-[rgb(var(--destructive))]",
        className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = "Select"