
import { cn } from "@/lib/utils";

type SpacerProps = {
  size?: number;
};

export function Spacer({ size = 6 }: SpacerProps) {
  return <div className={cn("w-full")} style={{ height: `${size * 4}px` }} />;
}