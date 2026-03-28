import * as React from "react"
import { cn } from "@/lib/utils"

export type SelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn("ui-input-control aria-[invalid=true]:border-[rgb(var(--destructive))] aria-[invalid=true]:ring-[rgb(var(--destructive))]", className)}
      {...props}
    />
  )
})

Select.displayName = "Select"