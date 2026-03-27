interface HelperTextProps {
  children?: React.ReactNode;
  error?: boolean;
}

export function HelperText({ children, error }: HelperTextProps) {
  if (!children) return null;

  return (
    <p
      className={`text-sm mt-1 ${
        error ? "text-red-500" : "text-muted-foreground"
      }`}
    >
      {children}
    </p>
  );
}