"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

export const Dropdown = ({ trigger, children }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block")}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>

      {open && (
        <div
          className={cn(
            "absolute right-0 z-40 mt-2 w-48 rounded-2xl border bg-white shadow-lg"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};