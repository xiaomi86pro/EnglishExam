"use client";

import * as React from "react";

import { FormField } from "@/components/ui/form/form-field";
import { FieldControl } from "@/components/ui/form/field-control";
import { Input } from "@/components/ui/input/text-input";
import { Textarea } from "@/components/ui/input/textarea";
import { Radio } from "@/components/ui/input/radio";

import {
  createDefaultMCQForm,
  mapFormToPayload,
} from "@/lib/mappers/question";

import type { QuestionFormValues } from "@/types/question";
import { createClient } from "@/lib/supabase/client";

export function QuestionEditor() {
  const supabase = createClient();

  const [form, setForm] = React.useState<QuestionFormValues>(
    createDefaultMCQForm()
  );

  const [loading, setLoading] = React.useState(false);

  /* =========================
     HANDLERS
  ========================= */

  function updateOptionText(index: number, value: string) {
    setForm((prev) => {
      const options = [...prev.options];
      options[index].text = value;
      return { ...prev, options };
    });
  }

  function selectCorrect(index: number) {
    setForm((prev) => {
      const options = prev.options.map((opt, i) => ({
        ...opt,
        is_correct: i === index,
      }));
      return { ...prev, options };
    });
  }

  async function handleSubmit() {
    setLoading(true);

    const payload = mapFormToPayload(form);

    const { data, error } = await supabase.rpc(
      "rpc_create_question",
      {
        p_question_type_code: "A1", // MCQ_SINGLE mapping của bạn
        p_passage_id: null,
        p_payload: payload,
        p_tag_ids: [],
      }
    );

    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Created question id: " + data);
  }

  /* =========================
     UI
  ========================= */

  return (
    <div className="flex flex-col gap-6">

      {/* QUESTION TEXT */}
      <FormField>
        <FieldControl>
          <Textarea
            placeholder="Question text"
            value={form.question_text}
            onChange={(e) =>
              setForm({ ...form, question_text: e.target.value })
            }
          />
        </FieldControl>
      </FormField>

      {/* OPTIONS */}
      <div className="flex flex-col gap-3">
        {form.options.map((opt, index) => (
          <div key={opt.label} className="flex gap-2 items-center">

            <Radio
              checked={opt.is_correct}
              onChange={() => selectCorrect(index)}
            />

            <Input
              placeholder={`Option ${opt.label}`}
              value={opt.text}
              onChange={(e) =>
                updateOptionText(index, e.target.value)
              }
            />

          </div>
        ))}
      </div>

      {/* EXPLANATION */}
      <FormField>
        <FieldControl>
          <Textarea
            placeholder="Explanation"
            value={form.explanation}
            onChange={(e) =>
              setForm({ ...form, explanation: e.target.value })
            }
          />
        </FieldControl>
      </FormField>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="border p-2"
      >
        {loading ? "Creating..." : "Create Question"}
      </button>
    </div>
  );
}