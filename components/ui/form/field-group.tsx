// components/ui/form/field-group.tsx

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FieldGroupProps {
  direction?: "row" | "col"
  children: ReactNode
  className?: string
}

export function FieldGroup({
  direction = "col",
  children,
  className,
}: FieldGroupProps) {
  return (
    <div
      className={cn(
        direction === "row"
          ? "flex flex-wrap items-center gap-[var(--form-group-spacing)]"
          : "flex flex-col gap-[var(--form-group-spacing)]",
        className
      )}
    >
      {children}
    </div>
  )
}