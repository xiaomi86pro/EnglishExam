import { FC } from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-[var(--badge-font-size)] font-[var(--badge-font-weight)] rounded-[var(--badge-radius)] bg-[var(--badge-bg)] text-[var(--badge-color)] ${className}`}
    >
      {children}
    </span>
  );
};