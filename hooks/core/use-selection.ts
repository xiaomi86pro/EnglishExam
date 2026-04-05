"use client";

import { useState } from "react";

export function useSelection<T extends string | number>() {
  const [selectedIds, setSelectedIds] = useState<Set<T>>(new Set());

  const toggle = (id: T, checked?: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const shouldSelect = checked ?? !next.has(id);

      if (shouldSelect) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  };

  const selectMany = (ids: T[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      ids.forEach((id) => next.add(id));

      return next;
    });
  };

  const removeMany = (ids: T[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      ids.forEach((id) => next.delete(id));

      return next;
    });
  };

  const clear = () => {
    setSelectedIds(new Set());
  };

  return {
    selectedIds,
    selectedCount: selectedIds.size,
    isSelected: (id: T) => selectedIds.has(id),
    toggle,
    selectMany,
    removeMany,
    clear,
  };
}
