import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-[var(--surface-modal-overlay)]"
      )} onClick={onClose}
    >
      <div
        className={cn(
          "rounded-md bg-[var(--surface-modal-background)] p-6 shadow-[var(--surface-modal-shadow)]"
        )} onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}