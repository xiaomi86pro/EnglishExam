"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={cn("relative inline-block")}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 mb-2 -translate-x-1/2",
            "whitespace-nowrap rounded-xl bg-black px-3 py-1 text-xs text-white shadow-md"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};