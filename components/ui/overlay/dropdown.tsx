"use client";

import { ReactNode, useState } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

export const Dropdown = ({ trigger, children }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border bg-white shadow-lg z-40">
          {children}
        </div>
      )}
    </div>
  );
};