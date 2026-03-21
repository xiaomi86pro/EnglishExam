import React from "react";

type SpacerProps = {
  size?: number;
};

export function Spacer({ size = 6 }: SpacerProps) {
  return <div style={{ height: `${size * 4}px` }} />;
}