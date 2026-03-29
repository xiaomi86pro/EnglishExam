"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  open,
  message,
  onClose,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={cn("fixed bottom-6 right-6 z-50")}>
      <div
        className={cn(
          "rounded-2xl bg-black px-4 py-3 text-sm text-white shadow-lg"
        )}
      >
        {message}
      </div>
    </div>
  );
};