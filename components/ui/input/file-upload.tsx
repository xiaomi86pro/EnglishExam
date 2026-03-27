import * as React from "react";

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onChange?: (files: FileList | null) => void;
}

export const FileUpload = React.forwardRef<
  HTMLInputElement,
  FileUploadProps
>(function FileUpload({ onChange, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="file"
      onChange={(e) => {
        onChange?.(e.target.files);
      }}
      className="block w-full text-sm file:mr-3 file:px-3 file:py-2 file:border file:rounded file:bg-muted file:text-foreground"
      {...props}
    />
  );
});