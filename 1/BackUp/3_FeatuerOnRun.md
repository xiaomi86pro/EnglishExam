PHASE 0 — Freeze contract trước khi code

Thảo luận 1 chút . Khi ở question list - bấm nút view thì tới trang ViewQuestion ( sử dụng rpc_get_question_detail ( nội dung trong form chỉ đọc ). Bên dưới trang ViewQuestion đó có nút EDIT / DELETE / DUPLICATE . Ấn EDIT thì mở form cho phép chỉnh sửa - ( hiện nút SAVE - Chạy rpc_update_question ). Nut DELETE thì báo hỏi xoá hay ko - OK ) . Nút DUPLICATE thì chạy rpc_duplicate_question rồi load lại trang ViewQuestion (với ID của bản sao question )

Trước khi viết code, cần chốt behavior criteria.

A. Update flow

Từ list → click edit:

Question List
   -> row action Edit
   -> route /teacher/questions/[id]/edit
   -> load existing question
   -> reuse Question Editor
   -> save update
   -> back list + refresh
B. Delete flow

2 mode:

Single delete
row action delete
confirm dialog
delete success
invalidate list query
giữ nguyên pagination/filter hiện tại
Bulk delete
reuse selectedIds từ shared selection hook
toolbar action delete selected
delete xong clear selection
reload current page
PHASE 1 — RPC & Type Contract (bắt buộc làm trước)

Đây là phase quan trọng nhất.

1.1 RPC contracts cần thêm

Theo naming rule của bạn, đề xuất thêm 3 RPC:

rpc_question_get_for_update(p_question_id)
rpc_question_update_mcq_single(...)
rpc_question_delete(p_question_id)
rpc_question_bulk_delete(p_question_ids)
1.2 Type split đúng canonical structure

Theo structure frozen:

types/question/
- question.db.ts
- question.rpc.ts
- question.form.ts
- question.domain.ts
Cần thêm
question.rpc.ts
QuestionUpdateRpcRequest
QuestionUpdateRpcResponse
QuestionDeleteRpcRequest
question.form.ts
QuestionUpdateFormValues
question.domain.ts
QuestionDeleteAction
QuestionEditAction
1.3 Decision criteria cần chốt trước SQL

Đây là điểm rất quan trọng trước khi viết RPC:

Update cho phép sửa gì?

MCQ_SINGLE hiện nên cho phép:

stem
explanation
difficulty
category
tags
answer options
correct option
status
passage relation ❗
Cần rule rõ:

Nếu question đang thuộc passage snapshot hoặc đã xuất hiện trong exam:

cho sửa full?
lock một phần?
versioning?

👉 Khuyến nghị MVP Core:
Cho update full nếu chưa được snapshot vào exam instance.

PHASE 2 — Edit Route + Data Loading

Sau contract xong mới làm UI.

2.1 Route structure

Theo App Router hiện tại:

app/(dashboard)/teacher/questions/[id]/edit/page.tsx

Page chỉ nên thin wrapper như page list.

2.2 Container pattern

Tạo domain container mới:

components/domain/question/question-update-container.tsx

Responsibility:

get id from route
fetch existing data
map DB → form
pass initialValues vào shared editor
submit update mutation
handle redirect back list
2.3 Reuse editor

Không tạo editor mới.

Reuse:

question-editor.tsx

Theo đúng success pattern từ Question List:

container owns data + mutation
presenter/editor stays pure

Đây là điểm giúp phase sau scale tốt.

PHASE 3 — Adapter / Mapper Layer

Vì update luôn có DB shape ≠ form shape, phase này rất quan trọng.

Từ tree snapshot hiện tại bạn đang có:

lib/adapters/question/question-form.adapter.ts

Nên mở rộng adapter này thành:

toCreatePayload()
toUpdatePayload()
toFormInitialValues()
Mapper pipeline chuẩn
RPC row
 -> question mapper
 -> update form values
 -> editor
 -> adapter
 -> update rpc payload

Giữ đúng layering bạn đã standardize.

PHASE 4 — Mutation Hooks

Theo naming convention hooks:

hooks/mutations/

Tạo:

use-update-question.ts
use-delete-question.ts
use-bulk-delete-question.ts
Hook responsibilities
use-update-question
call update rpc
toast success
redirect list
invalidate detail + list
use-delete-question
delete single
invalidate current list query
use-bulk-delete-question
delete many ids
clear selection
invalidate current list query
PHASE 5 — Integrate vào Shared List Architecture

Đây là phần tận dụng thành quả Scope 2.

Bạn đã freeze pattern:

container owns filter/sort/pagination/query/viewMode + row handlers
presenter routes table/card
leaf pure components stay pure

Scope 3 phải reuse đúng pattern này.

5.1 Container owns row handlers

Trong:

question-list-container.tsx

add:

onEdit(item.id)
onDelete(item.id)
onBulkDelete(selectedIds)
5.2 Presenter pass-through

question-list-presenter.tsx

chỉ forward props:

onEdit
onDelete

không business logic.

5.3 Leaf components pure

Table/card chỉ:

onEdit(item.id)
onDelete(item.id)

không gọi mutation trực tiếp.

Đây là điểm cực kỳ quan trọng để không phá kiến trúc list vừa ổn định.

PHASE 6 — Confirm Dialog + UX Safety

Delete là destructive action nên phase riêng.

Single delete dialog

Component:

components/domain/question/question-delete-dialog.tsx

Pure dialog:

title
warning
loading state
confirm callback
Bulk delete toolbar UX

Reuse toolbar hiện có:

question-list-toolbar.tsx

Nếu:

selectedIds.length > 0

show:

Delete Selected
PHASE 7 — Edge Cases & Data Integrity

Phase này rất quan trọng để tránh bug production.

7.1 Pagination repair after delete

Ví dụ:

page 3 chỉ còn 1 item
delete xong page trống

Container cần auto:

if empty page && page > 1 => go previous page

Đây là logic nên đặt tại container, không đặt mutation hook.

7.2 Selection cleanup

Bulk delete xong:

clearSelection()

Single delete:

unselect deleted id if selected
7.3 Optimistic safety

MVP chỉ nên:

disable delete button while pending
no full optimistic removal yet

Đỡ risk hơn.

Recommended Execution Order (thứ tự thực chiến)

Đây là thứ tự mình khuyên làm để ít lỗi nhất:

Step 1

RPC contract + types

Step 2

edit route thin page

Step 3

question-update-container

Step 4

reuse question-editor submit update

Step 5

single delete row action

Step 6

bulk delete toolbar action

Step 7

pagination edge cases + cleanup