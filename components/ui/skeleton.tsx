import { FC } from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={`bg-[var(--skeleton-bg)] rounded-[var(--skeleton-radius)] animate-pulse ${className}`}
    />
  );
};