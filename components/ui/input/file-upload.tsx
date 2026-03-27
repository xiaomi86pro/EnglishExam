import * as React from "react";
import { cn } from "@/lib/utils";

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onChange?: (files: FileList | null) => void;
}

export const FileUpload = React.forwardRef<
  HTMLInputElement,
  FileUploadProps
>(function FileUpload({ className, onChange, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="file"
      onChange={(e) => {
        onChange?.(e.target.files);
      }}
      className={cn(
        "block h-10 w-full rounded-md border px-3 py-2 text-sm",
        "bg-[rgb(var(--background))]",
        "border-[rgb(var(--border))]",
        "text-[rgb(var(--foreground))]",
        "file:mr-3 file:rounded-md file:border file:border-[rgb(var(--border))]",
        "file:bg-[rgb(var(--surface-muted))] file:px-3 file:py-1 file:text-sm file:text-[rgb(var(--foreground))]",
        "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

FileUpload.displayName = "FileUpload";