"use client";

import { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-black text-white text-xs px-3 py-1 shadow-md">
          {content}
        </div>
      )}
    </div>
  );
};