import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[var(--surface-modal-overlay)]"
      onClick={onClose}
    >
      <div
        className="rounded-md p-6 bg-[var(--surface-modal-background)] shadow-[var(--surface-modal-shadow)]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}