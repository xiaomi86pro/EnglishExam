import { ReactNode } from "react";
import { Spinner } from "./spinner";
import { EmptyState } from "./table/empty-state";

interface DataStateProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string | null;
  children: ReactNode;
}

export const DataState = ({
  isLoading,
  isEmpty,
  error,
  children,
}: DataStateProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 text-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  if (isEmpty) {
    return <EmptyState/>;
  }

  return <>{children}</>;
};
