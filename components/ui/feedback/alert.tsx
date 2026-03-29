import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AlertProps {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "error";
}

const variantColors = {
  info: { bg: "bg-blue-50", text: "text-blue-900" },
  success: { bg: "bg-green-50", text: "text-green-900" },
  warning: { bg: "bg-yellow-50", text: "text-yellow-900" },
  error: { bg: "bg-red-50", text: "text-red-900" },
};

export const Alert: FC<AlertProps> = ({ children, variant = "info" }) => {
  const colors = variantColors[variant];
  return (
    <div
className={cn(
        "flex items-center gap-2",
        "rounded-[var(--alert-radius)]",
        "px-[var(--alert-padding)] py-[var(--alert-padding)]",
        colors.bg,
        colors.text
      )}    >
      <span className="text-[var(--alert-icon-size)]">⚠️</span>
      <div>{children}</div>
    </div>
  );
};