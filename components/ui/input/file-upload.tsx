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
       className={cn("ui-input-control ui-file-upload aria-[invalid=true]:border-[rgb(var(--destructive))] aria-[invalid=true]:ring-[rgb(var(--destructive))]", className)}
      {...props}
    />
  );
});

FileUpload.displayName = "FileUpload";