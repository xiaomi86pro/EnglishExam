"use client";

import type { QuestionListItem } from "@/types/question/question-list.domain";
import { QuestionCard } from "./question-card";
import { QuestionListRowActions } from "./question-list-row-actions";

type Props = {
  items: QuestionListItem[];
  selection: {
    isSelected: (id: number) => boolean;
    toggle: (id: number, checked: boolean) => void;
  };
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
};

const DIFFICULTY_MAP: Record<number, "easy" | "medium" | "hard"> = {
  1: "easy",
  2: "easy",
  3: "medium",
  4: "hard",
  5: "hard",
};

export function QuestionCardGrid({
  items,
  selection,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const selected = selection.isSelected(item.id);

        return (
          <div key={item.id} className="space-y-3">
            <QuestionCard
              id={String(item.id)}
              content={<p className="line-clamp-4">{item.questionText}</p>}
              difficulty={DIFFICULTY_MAP[item.difficulty]}
              type={item.questionTypeCode ?? undefined}
              isSelected={selected}
              onClick={() => selection.toggle(item.id, !selected)}
            />

            <div onClick={(event) => event.stopPropagation()}>
              <QuestionListRowActions
                onView={() => onView(item.id)}
                onEdit={() => onEdit(item.id)}
                onDelete={() => onDelete(item.id)}
                onDuplicate={() => onDuplicate(item.id)}
                disableDuplicate={item.passageId != null}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
