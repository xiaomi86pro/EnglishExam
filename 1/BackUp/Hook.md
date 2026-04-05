🟢 Phase 1 — Read trước (quan trọng nhất)
rpc_get_questions → list
rpc_get_question_detail → detail

👉 Vì:

UI list cần trước
Editor cần detail
🟡 Phase 2 — Write sau
rpc_create_question
rpc_update_question
rpc_delete_question

Step 1 — Làm cái này trước

👉 use-question-list.ts

Vì:

đơn giản nhất
validate được toàn bộ flow:
RPC → adapter → UI
Step 2 — Sau đó

👉 use-question-detail.ts

Step 3 — Sau nữa

👉 create/update/delete
