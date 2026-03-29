import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
className={cn(
        "rounded-md border p-4",
        "bg-[var(--surface-card-background)]",
        "border-[var(--surface-card-border)]",
        "shadow-[var(--surface-card-shadow)]",
        className
      )}    >
      {children}
    </div>
  );
}