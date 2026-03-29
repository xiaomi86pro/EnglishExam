"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { QuestionListToolbar } from "@/components/domain/question/question-list-toolbar";
import { QuestionListTable } from "@/components/domain/question/question-list-table";
import { Pagination } from "@/components/ui/navigation/pagination";

const supabase = createClient();

type RpcQuestionRow = {
  question_id: number;
  question_text: string;
  difficulty: number;
  grade_level: number;
  category_id: number;
  passage_id: number | null;
  passage_title: string | null;
  question_type_code: string;
  tag_ids: number[] | null;
  option_count: number;
  answer_count: number;
  is_active: boolean;
  created_at: string;
  total_count: number;
};

export type QuestionListItem = {
  id: number;
  text: string;
  difficulty: number;
  type: string;
  createdAt: string;
  passageTitle?: string | null;
  tagIds: number[];
  optionCount: number;
  answerCount: number;
  isActive: boolean;
};

function mapRow(row: RpcQuestionRow): QuestionListItem {
  return {
    id: row.question_id,
    text: row.question_text,
    difficulty: row.difficulty,
    type: row.question_type_code,
    createdAt: row.created_at,
    passageTitle: row.passage_title,
    tagIds: row.tag_ids ?? [],
    optionCount: row.option_count,
    answerCount: row.answer_count,
    isActive: row.is_active,
  };
}

export function QuestionList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [search, setSearch] = useState("");
  const [data, setData] = useState<QuestionListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const { data, error } = await supabase.rpc("rpc_list_questions_v2", {
        p_limit: limit,
        p_offset: offset,
        p_search: search || null,
        p_is_active: null,
      });

      if (!isMounted) return;

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const rows = (data || []) as RpcQuestionRow[];
      const mapped = rows.map(mapRow);

      setData(mapped);
      setTotal(rows[0]?.total_count || 0);
      setLoading(false);
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, [limit, offset, search]);

  // selection logic
  const isAllSelected =
    data.length > 0 && data.every((q) => selectedIds.has(q.id));

  const toggleSelectAll = (checked: boolean) => {
    const newSet = new Set(selectedIds);
    data.forEach((q) => {
      if (checked) newSet.add(q.id);
      else newSet.delete(q.id);
    });
    setSelectedIds(newSet);
  };

  const toggleSelect = (id: number, checked: boolean) => {
    const newSet = new Set(selectedIds);
    if (checked) newSet.add(id);
    else newSet.delete(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="space-y-4">
      <QuestionListToolbar
        search={search}
        onSearchChange={(v) => {
          setLoading(true);
          setPage(1);
          setSearch(v);
        }}
        selectedCount={selectedIds.size}
        onBulkDelete={() => {
          console.log("delete ids:", Array.from(selectedIds));
        }}
      />

      <QuestionListTable
        data={data}
        loading={loading}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        isAllSelected={isAllSelected}
        onToggleSelectAll={toggleSelectAll}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
