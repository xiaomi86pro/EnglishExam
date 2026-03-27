"use client";

import { useEffect } from "react";

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
    <div className="fixed bottom-6 right-6 z-50">
      <div className="rounded-2xl bg-black text-white px-4 py-3 shadow-lg text-sm">
        {message}
      </div>
    </div>
  );
};