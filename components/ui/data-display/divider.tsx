import { cn } from "@/lib/utils";

export function Divider() {
   return <hr className={cn("my-2 border-t-[var(--surface-divider-color)]")} />;
}