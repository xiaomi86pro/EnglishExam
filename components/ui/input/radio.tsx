// components/ui/input/radio.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement>

export const Radio = React.forwardRef<
  HTMLInputElement,
  RadioProps
>(({ className, ...props }, ref) => {
  return (
    <input
      type="radio"
      ref={ref}
      className={cn("ui-choice-control", className)}
      {...props}
    />
  )
})

Radio.displayName = "Radio"