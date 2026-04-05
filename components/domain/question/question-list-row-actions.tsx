"use client";

type Props = {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  disableDuplicate?: boolean;
};

export function QuestionListRowActions({
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  disableDuplicate = false,
}: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onView}
        className="rounded-md border px-2 py-1 text-sm"
      >
        View
      </button>

      <button
        onClick={onEdit}
        className="rounded-md border px-2 py-1 text-sm"
      >
        Edit
      </button>

      <button
        onClick={onDelete}
        className="rounded-md border px-2 py-1 text-sm"
      >
        Delete
      </button>

      <button
        onClick={onDuplicate}
        disabled={disableDuplicate}
        className="rounded-md border px-2 py-1 text-sm disabled:opacity-50"
      >
        Duplicate
      </button>
    </div>
  );
}