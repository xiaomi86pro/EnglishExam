// components/ui/input/textarea.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        "flex w-full rounded-md px-3 py-2 text-sm",
        "min-h-[100px]",
        "bg-[rgb(var(--background))]",
        "border border-[rgb(var(--border))]",
        "text-[rgb(var(--foreground))]",
        "placeholder:text-[rgb(var(--muted-foreground))]",
        "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-[rgb(var(--destructive))] focus:ring-[rgb(var(--destructive))]",
        className
        )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"