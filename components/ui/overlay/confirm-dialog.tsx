"use client";

import { Modal } from "./modal";
import { Button } from "./button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Modal isOpen={open} onClose={onCancel}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};