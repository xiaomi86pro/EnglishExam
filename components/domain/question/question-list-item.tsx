"use client";

import { Checkbox } from "@/components/ui/input/checkbox";
import type { QuestionListItem } from "@/types/question/question-list.domain";
import { QuestionListRowActions } from "./question-list-row-actions";

type Props = {
  item: QuestionListItem;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
};

export function QuestionListItemRow({
  item,
  checked,
  onCheckedChange,
  onView,
  onEdit,
}: Props) {
  return (
    <tr className="border-t">
      <td className="p-2">
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      </td>

      <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>

      <td className="p-2">{new Date(item.updatedAt).toLocaleDateString()}</td>

      <td className="p-2">{item.difficultyLabel}</td>

      <td className="p-2">{item.usageCount}</td>

      <td className="p-2 max-w-[400px] truncate">{item.questionText}</td>

      <td className="p-2">{item.questionTypeCode ?? "-"}</td>

      <td className="p-2">{item.isActive ? "Active" : "Inactive"}</td>

      <td className="p-2">
        <QuestionListRowActions
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          disableDuplicate={item.passageId != null}
        />
      </td>

      <td className="p-2"></td>
    </tr>
  );
}
