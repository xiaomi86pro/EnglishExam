"use client";

import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/input/checkbox";
import type { QuestionListItem } from "@/types/question/question-list.domain";

type Props = {
  item: QuestionListItem;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function QuestionListItemRow({
  item,
  checked,
  onCheckedChange,
}: Props) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(
      `/dashboard/teacher/questions/${item.id}/edit`
    );
  };

  return (
    <tr className="border-t">
      <td className="p-2">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      </td>

      <td className="p-2">{item.id}</td>

      <td className="p-2 max-w-[400px] truncate">
        {item.questionText}
      </td>

      <td className="p-2">{item.questionTypeCode ?? "-"}</td>

      <td className="p-2">{item.difficultyLabel}</td>

      <td className="p-2">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>

      <td className="p-2">
        <button
          onClick={handleEdit}
          className="rounded-md border px-2 py-1 text-sm"
        >
          Edit
        </button>
      </td>
    </tr>
  );
}