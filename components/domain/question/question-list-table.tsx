"use client";

import { Table } from "@/components/ui/table/table";
import { Checkbox } from "@/components/ui/input/checkbox";
import { QuestionListItem } from "./question-list";
import { QuestionListItemRow } from "@/components/domain/question/question-list-item";

type Props = {
  data: QuestionListItem[];
  loading: boolean;

  selectedIds: Set<number>;
  onToggleSelect: (id: number, checked: boolean) => void;

  isAllSelected: boolean;
  onToggleSelectAll: (checked: boolean) => void;
};

export function QuestionListTable({
  data,
  loading,
  selectedIds,
  onToggleSelect,
  isAllSelected,
  onToggleSelectAll,
}: Props) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No questions found</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th className="p-2">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={onToggleSelectAll}
            />
          </th>
          <th className="p-2">ID</th>
          <th className="p-2">Question</th>
          <th className="p-2">Type</th>
          <th className="p-2">Difficulty</th>
          <th className="p-2">Created</th>
          <th className="p-2"></th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <QuestionListItemRow
            key={item.id}
            item={item}
            checked={selectedIds.has(item.id)}
            onCheckedChange={(checked) =>
              onToggleSelect(item.id, checked)
            }
          />
        ))}
      </tbody>
    </Table>
  );
}