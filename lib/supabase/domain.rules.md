# Domain Rules – Exam System

## 1. General Rules

- Exam system uses **Model A generation**:  
  - Each student gets a **unique exam instance** from `exam_templates`.
  - Questions and options are **snapshotted** into `exam_questions` and `exam_question_options`.
  - Passages are **snapshotted** with all associated questions into exam instance.

- User roles are stored in `profiles` table.  
  - Roles: `admin`, `teacher`, `student`.
  - Authorization is **DB-driven**; middleware only checks authentication.
  - RPCs enforce role checks using `rpc_assert_min_role`.

- Timestamps:
  - All `created_at`, `updated_at`, `answered_at`, `submitted_at` fields are `timestamp with time zone`.
  - `default now()` for auto timestamps.

---

## 2. Passage Rules

- Passages have no type column; type is derived from `audio_url`:
  - `audio_url IS NOT NULL` → listening
  - `audio_url IS NULL` → reading

- Each passage has exactly **one question type**.
  - All questions under a passage share the same type.
  - Supported question types per passage:
    - `MCQ_SINGLE`
    - `TEXT_INPUT`
    - `PASSAGE_MCQ`
    - `PASSAGE_TEXT`
    - `REORDER`
    - `TRUE_FALSE`
    - `AUDIO_MCQ`
    - `AUDIO_TEXT`
    - `ESSAY`

---

## 3. Question Rules

- `difficulty` column in DB is integer **1–5**.  
  - Map to domain type:
    - 1–2 → `easy`
    - 3 → `medium`
    - 4–5 → `hard`

- Question options are **snapshotted per exam instance** in `exam_question_options`.
- Text answers stored in `question_text_answers`.
- Multiple choice:
  - Only one correct option for `MCQ_SINGLE`.
  - `selected_option_label` stores label (`A`, `B`, …).

---

## 4. Exam Rules

- Exam instance is derived from `exam_templates`:
  - `exam_questions` linked via `exam_id`.
  - `exam_question_options` linked via `exam_question_id`.
- Exam state (`ExamState`) is derived from:
  - `hasInstance`: student has an exam instance
  - `submittedAt`: if null → in progress
  - `gradedAt`: if null → submitted but not graded
  - Business states:
    - `not_started`
    - `in_progress`
    - `submitted`
    - `graded`

- Exam status mapping:
  - `exams.is_active = true` → `active`
  - `exams.is_active = false` → `inactive`

---

## 5. User Answer Rules

- Table: `user_answers`
  - `selected_option_label` → only for MCQ
  - `answer_text` → only for text input or essay
  - `is_correct` → null initially; updated after grading
  - `answered_at` → auto timestamp

- Rules:
  - Only one answer per `exam_question_id` per user
  - Cannot update answer after exam submission unless allowed by exam config
  - For auto-graded questions, `is_correct` is set immediately
  - For manual-graded questions, `is_correct` is set after teacher grading

---

## 6. RPC Conventions

- RPCs follow fixed naming convention (23 functions)
- Examples:
  - `rpc_save_answer`: store/update user answer
  - `rpc_generate_exam`: generate student exam instance
  - `rpc_assert_min_role`: enforce role
- RPCs enforce snapshot integrity:
  - Cannot modify original template
  - Must link all foreign keys correctly
  - Must preserve question ordering (for REORDER type)

---

## 7. Optional / UI Mapping Helpers

- Difficulty, passage type, exam state, and question type mappings exist in `lib/mappers/`:
  - `difficulty.ts`
  - `question-type.ts`
  - `exam.ts`
- Map DB values to domain-friendly labels:
  - `1–5` → easy/medium/hard
  - `audio_url ? "listening" : "reading"`
  - Boolean `is_active` → `active` / `inactive`
- Use consistently in domain-aware components.

---

## 8. Notes / Best Practices

- Never hardcode DB IDs or option labels in business logic.
- Always snapshot data per exam instance to prevent concurrency issues.
- Use mappers for all DB → domain conversions.
- All timestamps use UTC (`timestamp with time zone`).
- Follow folder structure:
  - `app/(auth)/`
  - `app/(dashboard)/admin, teacher, student`
  - `components/domain/`
  - `lib/mappers/`
  - `lib/supabase/`
- Keep `domain.rules.md` updated as new rules or question types are added.