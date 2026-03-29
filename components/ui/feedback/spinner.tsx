import { FC } from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: string;
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size, className }) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        "border-[var(--spinner-border)] border-[var(--spinner-color)]",
        "border-t-[var(--spinner-border)] border-t-[var(--spinner-color)]",
        size || "h-[var(--spinner-size)] w-[var(--spinner-size)]",
        className
      )}
    />
  );
};