// components/ui/input/label.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none text-[rgb(var(--muted-foreground))]",
        className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-[rgb(var(--destructive))]" aria-hidden="true">
            *
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = "Label"