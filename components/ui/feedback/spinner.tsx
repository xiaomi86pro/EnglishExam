import { FC } from "react";

interface SpinnerProps {
  size?: string;
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size, className }) => {
  return (
    <div
      className={`animate-spin rounded-full border-[var(--spinner-border)] border-t-[var(--spinner-border)] border-t-[var(--spinner-color)] border-[var(--spinner-color)] ${
        size || "w-[var(--spinner-size)] h-[var(--spinner-size)]"
      } ${className}`}
    />
  );
};