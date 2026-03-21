// components/ui/form/field-error.tsx

import { cn } from "@/lib/utils"

interface FieldErrorProps {
  message?: string
  className?: string
}

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null

  return (
    <p
      role="alert"
      className={cn(
        "mt-1",
        "text-[var(--field-error-text-size)]",
        "font-[var(--field-error-weight)]",
        "text-[var(--field-error-color)]",
        className
      )}
    >
      {message}
    </p>
  )
}