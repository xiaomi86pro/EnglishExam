// components/ui/input/radio.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Radio = React.forwardRef<
  HTMLInputElement,
  RadioProps
>(({ className, ...props }, ref) => {
  return (
    <input
      type="radio"
      ref={ref}
      className={cn(
        "h-4 w-4",
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

Radio.displayName = "Radio"