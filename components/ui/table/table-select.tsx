// components/ui/table/table-select.tsx
"use client";

import { Checkbox } from "@/components/ui/input/checkbox";
import { TableCell } from "./table-cell";
import { TableRow } from "./table-row";

interface SelectHeaderProps {
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: () => void;
}

export function SelectHeader({
  allSelected,
  someSelected,
  onSelectAll,
}: SelectHeaderProps) {
  return (
    <TableCell className="w-12">
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected && !allSelected}
        onCheckedChange={onSelectAll}
      />
    </TableCell>
  );
}

interface SelectRowProps {
  id: string;
  selected: boolean;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}

export function SelectRow({
  id,
  selected,
  onSelect,
  children,
}: SelectRowProps) {
  return (
    <TableRow
      className={selected ? "bg-[var(--table-selected-bg)]" : ""}
    >
      <TableCell className="w-12">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onSelect(id)}
        />
      </TableCell>
      {children}
    </TableRow>
  );
}