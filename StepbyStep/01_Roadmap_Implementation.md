# ROADMAP IMPLEMENTATION (đã gom & sắp xếp logic)

## 1) Giai đoạn triển khai ưu tiên

## Phase 1 — MVP Question Core
1. Question Editor (MCQ_SINGLE)
2. Question List
3. Question Update/Delete

## Phase 2 — Content Expansion
4. Question Editor (TEXT_INPUT)
5. Question Editor (TRUE_FALSE)
6. Passage Editor + binding passage-question

## Phase 3 — Template System
7. Create Exam Template
8. Template Builder (sections/items/distribution)
9. Template Preview + validate logic

## Phase 4 — Exam Runtime
10. Generate exam instance từ template
11. Exam Taking UI (render theo question type + navigation)
12. Save/Resume/Submit + Result

## Phase 5 — Advanced
13. Analytics
14. Audit/Logging
15. Search + Bulk import/export + optimization

---

## 2) Chuẩn triển khai RPC theo phase

## P0. Environment & auth foundation
- Verify `.env.local`, Supabase client/server, middleware session flow.
- Login flow chạy ổn.

## P1. Dashboard role routing
- Có RPC lấy profile/role hiện tại.
- Redirect dashboard theo role.

## P2. RPC integration layer
- Có wrapper gọi RPC thống nhất (error handling + typing).
- Tách module theo nhóm role/use-case: student, teacher, admin.

## P3. Domain RPC coverage

### MUST HAVE (ưu tiên cao)
- `rpc_create_passage_with_questions`
- `rpc_get_exam_template_detail`

### SHOULD HAVE
- `rpc_restore_deleted_question`
- `rpc_soft_delete_passage`
- `rpc_restore_deleted_passage`
- `rpc_list_exams_admin`

### NICE TO HAVE
- `rpc_bulk_delete_questions`
- `rpc_abandon_exam`
- `rpc_get_user_profile`

### Cần rà soát/refactor thêm
- `rpc_save_answer`
- `rpc_resume_exam`
- `rpc_get_exam_structure`
- `rpc_submit_exam`
- `rpc_ensure_exam_active(p_exam_id)`

---

## 3) Cách chia chat/task để làm nhanh và sạch

- Mỗi chat chỉ làm 1 feature end-to-end.
- Ví dụ tốt:
  - Chat 1: Question Editor (MCQ) — types + mapper + hook
  - Chat 2: Question Editor (MCQ) — UI container/view
  - Chat 3: Audit form compliance cho feature đó
- Tránh gom nhiều feature khác miền trong một task.
