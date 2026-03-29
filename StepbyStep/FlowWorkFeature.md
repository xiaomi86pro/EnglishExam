🟢 A. CORE FEATURES (PHẢI LÀM TRƯỚC)
A1. Question Core
[ ] Question Editor (MCQ_SINGLE)  ← START HERE
[ ] Question Editor (TEXT_INPUT)
[ ] Question Editor (TRUE_FALSE)
A2. Question Advanced Types
[ ] Question Editor (REORDER - basic)
[ ] Question Editor (REORDER - advanced)
A3. Passage System
[ ] Passage Editor (reading)
[ ] Passage Editor (audio)
[ ] Passage + Question binding (1 passage → many questions)
A4. Question Management
[ ] Question List (table)
[ ] Question Filter (type, difficulty, tags)
[ ] Question Detail View
[ ] Question Update
[ ] Question Delete
🔵 B. TEMPLATE (EXAM DESIGN)
B1. Template Core
[ ] Create Exam Template
[ ] Template Sections (Part 1, Part 2…)
[ ] Add Question Rules (type + quantity)
B2. Template Builder UI
[ ] Drag / reorder sections
[ ] Configure question distribution
[ ] Attach passage rules
B3. Template Preview
[ ] Preview generated exam
[ ] Validate template logic
🟣 C. EXAM RUNTIME (STUDENT)
C1. Exam Instance (Model A)
[ ] Generate exam from template
[ ] Snapshot questions + options
C2. Exam Taking UI
[ ] Render MCQ question
[ ] Render TEXT_INPUT
[ ] Render PASSAGE (reading)
[ ] Render AUDIO player
[ ] Navigation (next/back)
C3. Answer System
[ ] Save answer (auto-save)
[ ] Update answer
[ ] Track progress
C4. Submit & Result
[ ] Submit exam
[ ] Auto grading (MCQ, TF, etc.)
[ ] Manual grading (essay)
[ ] Result view
🔴 D. USER & ROLE
[ ] Auth (login/register)  ← bạn đã có
[ ] Role-based UI (admin/teacher/student)
[ ] Profile management
⚫ E. ANALYTICS & SYSTEM
E1. Analytics
[ ] Score distribution
[ ] Question difficulty stats
[ ] User performance
E2. Audit & Logging
[ ] Question audit history
[ ] Exam attempt logs
⚫ F. POLISH / ADVANCED
[ ] Tag system (question_tags)
[ ] Search (full-text)
[ ] Bulk import/export
[ ] UI optimization

************************************************************************************************

🎯 THỨ TỰ LÀM CHUẨN (QUAN TRỌNG)
🚀 Giai đoạn 1 (MVP Core)
1. Question Editor (MCQ_SINGLE)
2. Question List
3. Question Update/Delete
🚀 Giai đoạn 2 (Content System)
4. TEXT_INPUT
5. TRUE_FALSE
6. Passage Editor
🚀 Giai đoạn 3 (Template)
7. Template Create
8. Template Builder
🚀 Giai đoạn 4 (Runtime)
9. Generate Exam
10. Exam UI
11. Submit + Result
🚀 Giai đoạn 5 (Advanced)
12. Analytics
13. Audit
🧩 CÁCH BẠN CHIA CHAT (RẤT QUAN TRỌNG)

Mỗi chat chỉ làm 1 feature:

Ví dụ:
Chat 1:
Question Editor (MCQ) — Domain + Types
Chat 2:
Question Editor (MCQ) — UI v1
Chat 3:
Fix Form System (sau khi build MCQ)
Chat 4:
Question List
🚨 NGUYÊN TẮC ÁP DỤNG
✔ Làm theo feature, không theo layer
✔ Mỗi feature phải chạy end-to-end
✔ Không build trước những gì chưa cần
✔ Luôn test được (UI → RPC → DB)

**********************************************************************************************

🟢 0. Chọn feature (scope cực nhỏ)
[ ] Xác định 1 feature duy nhất
[ ] Không mix nhiều loại (VD: chỉ MCQ_SINGLE, không kèm passage)

👉 Ví dụ:

✔ Question Editor (MCQ_SINGLE)
❌ Question Editor + Passage + Audio
🟡 1. Domain Contract (KHÔNG UI)
[ ] Define type chính (Question)
[ ] Define input type (CreateQuestionInput)
[ ] Define enum/type mapper (QuestionType, Difficulty)
[ ] Map DB → UI (mapper)
[ ] Map UI → RPC input

📁 Output:

types/question.ts
lib/mappers/question.ts
🟠 2. RPC Layer (có thể fake)
[ ] Xác định RPC cần dùng (create_question)
[ ] Define payload shape
[ ] Mock hoặc call thật (tùy)

👉 Mục tiêu:

✔ Có thể submit data
✔ Không cần perfect
🔵 3. Build UI (DIRTY FIRST)
[ ] Tạo question-editor.tsx
[ ] Dùng trực tiếp Input / Select / FormField
[ ] Hardcode options nếu cần
[ ] Không abstraction
[ ] Không tối ưu

📁 Output:

components/domain/question/question-editor.tsx
🔵 4. Connect Runtime
[ ] Hook submit → RPC
[ ] Handle loading
[ ] Handle basic error
🔵 5. Read / Display
[ ] Tạo QuestionCard đơn giản
[ ] Render data vừa tạo

📁 Output:

components/domain/question/question-card.tsx
🟣 6. Validate END-TO-END
[ ] Có thể tạo question
[ ] Có thể thấy lại question
[ ] Không crash

👉 ❗ Nếu chưa pass bước này → KHÔNG refactor

🔴 7. Detect Pain Points (QUAN TRỌNG NHẤT)
[ ] FormField có khó dùng không?
[ ] Select API có bị vướng không?
[ ] Input thiếu variant không?
[ ] Option list có logic lặp không?

👉 Ghi ra:

Pain Points List
🔴 8. Extract Component (CHỈ khi cần)
[ ] Tách QuestionOptionList nếu có logic add/remove
[ ] Tách QuestionForm nếu form quá dài
[ ] Không tách nếu chưa cần reuse

📁 Ví dụ:

question-option-list.tsx
question-form.tsx
🔴 9. Fix UI System (B2 → B3 đúng nghĩa)
[ ] Fix FieldControl typing
[ ] Fix FormField context
[ ] Improve Select API
[ ] Add missing input (textarea, checkbox...)

👉 ❗ Đây là lúc mới đụng lại components/ui

🟤 10. Normalize Domain UI
[ ] Tách logic khỏi UI
[ ] Tách state management
[ ] Chuẩn hóa props
⚫ 11. Reuse Check
[ ] Component này có reuse cho TEXT_INPUT không?
[ ] Có reuse cho PASSAGE không?
⚫ 12. Done Definition (rất rõ ràng)
✔ Feature chạy end-to-end
✔ Không hack logic nguy hiểm
✔ UI usable (không cần đẹp)
✔ Code không bị duplicated nghiêm trọng
🔁 Cách bạn sẽ dùng checklist này
Mỗi feature:

Bạn chỉ cần copy:

Feature: ____________

[ ] Step 0
[ ] Step 1
...
[ ] Step 12
📦 ÁP DỤNG NGAY CHO BẠN
Feature đầu tiên nên làm:
Feature: Question Editor (MCQ_SINGLE)
Bạn sẽ đi:
✔ 1. types/question.ts
✔ 2. mapper
✔ 3. question-editor.tsx (dirty)
✔ 4. connect RPC
✔ 5. question-card.tsx
✔ 6. test end-to-end

👉 STOP → rồi mới refactor