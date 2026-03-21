import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-md border p-4 bg-[var(--surface-card-background)] border-[var(--surface-card-border)] shadow-[var(--surface-card-shadow)] ${className}`}
    >
      {children}
    </div>
  );
}