1️⃣ lib/mappers/question/

Mục tiêu: Chỉ transform data, không chứa UI, không gọi RPC.

lib/mappers/question/
 ├─ index.ts                  # export tất cả mapper
 ├─ formToPayload.ts          # map FormValues → RPC payload
 ├─ dbToView.ts               # map DB row → QuestionViewModel
 └─ difficulty.ts             # map difficulty object

Ví dụ nội dung:

// lib/mappers/question/formToPayload.ts
import type { QuestionFormValues } from "@/types/question";

export function mapFormToPayload(values: QuestionFormValues) {
  return {
    question_text: values.question_text,
    explanation: values.explanation ?? null,
    difficulty: values.difficulty.level,
    options: values.options?.map(o => ({
      text: o.text,
      is_correct: o.is_correct,
    })),
  };
}
// lib/mappers/question/dbToView.ts
import type { Database } from "@/lib/types/supabase";
import type { QuestionViewModel } from "@/types/question";

export function mapDBToQuestionView(row: Database["public"]["Tables"]["questions"]["Row"]): QuestionViewModel {
  return {
    id: row.id,
    text: row.question_text,
    explanation: row.explanation,
    difficulty: row.difficulty,
  };
}
2️⃣ hooks/question/

Mục tiêu: fetch / mutate data, gọi RPC, trả về typed data.
Nguyên tắc: Domain component KHÔNG gọi supabase trực tiếp.

hooks/question/
 ├─ useQuestionDetail.ts
 ├─ useQuestionList.ts
 ├─ useCreateQuestion.ts
 └─ useUpdateQuestion.ts

Ví dụ:

// hooks/question/useQuestionDetail.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { mapDBToQuestionView } from "@/lib/mappers/question/dbToView";
import type { QuestionViewModel } from "@/types/question";

export function useQuestionDetail(questionId: number) {
  return useQuery<QuestionViewModel, Error>(["question", questionId], async () => {
    const { data, error } = await supabase.rpc("rpc_get_question_detail", { p_question_id: questionId });
    if (error) throw error;
    return mapDBToQuestionView(data);
  });
}
// hooks/question/useCreateQuestion.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { QuestionFormValues } from "@/types/question";
import { mapFormToPayload } from "@/lib/mappers/question/formToPayload";

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation(
    async (values: QuestionFormValues) => {
      const payload = mapFormToPayload(values);
      const { data, error } = await supabase.rpc("rpc_create_question", payload);
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["questions"]);
      },
    }
  );
}
3️⃣ components/domain/question/

Mục tiêu: Container + View, không gọi RPC trực tiếp, nhận data từ hook và mapper.

components/domain/question/
 ├─ question-list.tsx
 ├─ question-item.tsx
 ├─ question-editor/
 │    ├─ question-editor.tsx        # container
 │    └─ question-editor-view.tsx   # UI render

Ví dụ container:

// components/domain/question/question-editor/question-editor.tsx
import { useQuestionDetail } from "@/hooks/question/useQuestionDetail";
import { QuestionEditorView } from "./question-editor-view";

interface QuestionEditorProps {
  questionId: number;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({ questionId }) => {
  const { data: question, isLoading, error } = useQuestionDetail(questionId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !question) return <div>Error</div>;

  return <QuestionEditorView question={question} />;
};

Ví dụ view:

// components/domain/question/question-editor/question-editor-view.tsx
import { QuestionViewModel } from "@/types/question";
import { cn } from "@/lib/utils";

interface QuestionEditorViewProps {
  question: QuestionViewModel;
}

export const QuestionEditorView: React.FC<QuestionEditorViewProps> = ({ question }) => {
  return (
    <div className={cn("p-4 bg-white rounded")}>
      <h3 className="font-bold">{question.text}</h3>
      {question.explanation && <p className="text-gray-500">{question.explanation}</p>}
    </div>
  );
};
4️⃣ Quy tắc áp dụng cho toàn bộ question domain
UI layer chỉ render, không logic.
Domain container gọi hook + mapper, xử lý loading/error.
Hooks gọi RPC, trả về typed data.
Mappers chuyển đổi data, KHÔNG render UI, KHÔNG gọi RPC.
Props typed, không any.
Question type polymorphism: dùng map component, không if/else.
Form editor: dùng FormField contract.
CSS: domain component KHÔNG override, chỉ pass className cho UI primitives.
RPC: chỉ hook layer gọi, domain container nhận data từ hook.
Folder structure chuẩn như trên để dễ mở rộng MCQ / TEXT / PASSAGE / AUDIO.

┌─────────────────────────────┐
│          mappers/           │
│-----------------------------│
│ formToPayload.ts            │
│ dbToView.ts                 │
│ difficulty.ts               │
│                             │
│ - transform DB <-> UI       │
│ - no UI, no RPC             │
└───────────┬─────────────────┘
            │
            │ mapped data
            ▼
┌─────────────────────────────┐
│           hooks/            │
│-----------------------------│
│ useQuestionDetail.ts        │
│ useQuestionList.ts          │
│ useCreateQuestion.ts        │
│ useUpdateQuestion.ts        │
│                             │
│ - call RPC only             │
│ - return typed data         │
│ - handle errors / loading   │
└───────────┬─────────────────┘
            │ hook data
            ▼
┌─────────────────────────────┐
│  components/domain/question │
│-----------------------------│
│ question-editor/            │
│   question-editor.tsx       │  ← Container
│   question-editor-view.tsx  │  ← UI render
│ question-list.tsx           │
│ question-item.tsx           │
│                             │
│ - call hook to fetch data   │
│ - call mapper if needed     │
│ - handle loading / error    │
│ - pass data to view         │
└───────────┬─────────────────┘
            │ props
            ▼
┌─────────────────────────────┐
│      components/ui/*        │
│-----------------------------│
│ form/                       │
│ input/                      │
│ typography/                 │
│ layout/                     │
│ feedback/                   │
│                             │
│ - render primitives         │
│ - use cn + global.css       │
│ - no business logic         │
└─────────────────────────────┘