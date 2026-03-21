// components/ui/input/input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm",
          "border-slate-300",
          "placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2",          
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-[rgb(var(--destructive))] focus:ring-[rgb(var(--destructive))]",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"