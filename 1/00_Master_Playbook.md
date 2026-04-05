# STEPBYSTEP MASTER PLAYBOOK (Unified v3)

> Mục tiêu: đây là **single source of truth** để làm việc với ChatGPT/Codex trong repo này. Nội dung đã merge từ `00_Master_Playbook.md` và `Master_Playbook2.md`, loại bỏ trùng lặp và chuẩn hoá workflow.

---

## 0) Cách dùng tài liệu này (quick start)

1. Đọc **Phần 1: Governance** để nắm quy tắc vận hành.
2. Đọc **Phần 2: Kiến trúc & Layer Boundary** trước khi code.
3. Làm UI/Form theo **Phần 3**.
4. Làm data theo **Phần 4–5 (Mapper/Hook/RPC)**.
5. Áp naming theo **Phần 6**.
6. Với Next.js, áp **Phần 7** (Server vs Client).
7. Trước khi chốt task, check **Phần 10 + 11 + 12**.

---

## 1) Governance Rules

### 1.1 Single Source of Truth
- Rule làm việc với AI chỉ được duy trì trong file này.
- Không tạo thêm rule file mới trừ khi thật sự bắt buộc.

### 1.2 Change Management
- Mỗi thay đổi rule phải:
  - cập nhật file này,
  - thêm changelog (ngày + lý do).

### 1.3 AI Prompt Discipline (bắt buộc)
Mỗi request gửi ChatGPT/Codex phải có đủ:
1. Scope (chỉ 1 feature nhỏ),
2. File được phép sửa,
3. Rule bắt buộc áp dụng từ playbook này,
4. Expected output,
5. Verification command/checklist.

---

## 2) Kiến trúc tổng thể & Layer Boundary (STRICT)

### 2.1 Data Flow chuẩn (không được phá)

```text
DB (raw)
↓
RPC / Query
↓
Mapper (transform → domain model)
↓
Hook (state + orchestration)
↓
Domain Component
↓
UI primitives
```

### 2.2 Layering theo cấu trúc repo

```text
lib (pure logic, mapper)
↓
components/ui (dumb, reusable primitives)
↓
components/domain (business composition)
↓
app (route/pages)
```

### 2.3 Rule cứng theo layer
- `components/ui/*`:
  - Không business logic.
  - Không gọi RPC/API/DB.
  - Không import `components/domain/*`.
- `components/domain/*`:
  - Compose từ `ui` + `types` + `mappers` + hooks.
  - Không xử lý low-level accessibility (`id`, `aria-*`) nếu Form System đã lo.
  - Không gọi `supabase.rpc(...)` trực tiếp trong component render.
- `hooks/*`:
  - Nơi duy nhất fetch/mutate data + gọi RPC ở client side.
  - Không render UI, không thao tác DOM trực tiếp.
- `lib/mappers/*`:
  - Nơi duy nhất transform dữ liệu (Form→Payload, DB→ViewModel).
  - Không gọi RPC, không chứa UI.

### 2.4 Nguyên tắc backend/frontend đã chốt
- Auth + session theo Supabase SSR.
- Role nằm trong DB (`profiles` + RPC assert role), không dựa JWT metadata.
- Middleware ưu tiên check authentication; phân quyền chi tiết xử lý ở server/RPC.

---

## 3) UI System Rules (dedupe + chuẩn hoá)

### 3.1 Triết lý API
- Chỉ dùng **Composition Pattern** cho form.
- Cấm prop-based form API kiểu: `label`, `error`, `helperText` truyền trực tiếp vào input/wrapper.

Mẫu bắt buộc:
```tsx
<FormField error={errorText} required={required} disabled={disabled}>
  <FieldLabel>Question text</FieldLabel>
  <FieldControl>
    <TextInput />
  </FieldControl>
  <FieldHelper>Optional helper</FieldHelper>
  <FieldError>{errorText}</FieldError>
</FormField>
```
### 3.2 Form System contract
- `FormField` (state owner + context provider):
  - Nhận state explicit qua props: `error`, `required`, `disabled`.
  - Không scan children.
  - Không hard-wire import/render `FieldLabel/FieldError/FieldHelper`.
- `FieldControl` (injector duy nhất):
  - Chỉ nhận 1 child element hợp lệ.
  - Chỉ inject tối thiểu: `id`, `aria-describedby`, `aria-invalid`, `disabled`.
  - Không inject `value/onChange`.
- `FieldLabel`: lấy `id` từ context, render `htmlFor={id}`.
- `FieldHelper`: render children; có thể ẩn khi có error.
- `FieldError`: render khi có nội dung; có `role="alert"` + `aria-live`.

### 3.3 Rule cho input primitives (`components/ui/input/*`)
- Bắt buộc `forwardRef` nếu render HTML input element.
- Bắt buộc pass-through `...props` để nhận `id`, `aria-*`, `disabled`, `className`.
- Không tự xử lý logic `error/invalid/id generation` trong primitive.

### 3.4 Styling & Accessibility
- Luôn hỗ trợ `className?: string` và dùng `cn(...)`.
- Ưu tiên design tokens trong `styles/globals.css`.
- Tránh hardcode style nếu đã có token tương ứng.

---

## 4) Quy trình chuẩn triển khai 1 feature (E2E)

### 4.0 Chốt scope nhỏ
- Mỗi task chỉ 1 feature nhỏ (VD: `Question Editor - MCQ_SINGLE`).
- Không trộn Passage/Template/Runtime cùng task nếu không bắt buộc.

### 4.1 Chốt domain contract trước UI
- Chốt type chính (`Question`, `QuestionFormValues`, ...).
- Chốt input/output contract của RPC/hook.

### 4.2 Chuẩn bị mapper
- Tạo/chỉnh mapper ở `lib/mappers/*`:
  - `map<Entity>FromDB`
  - `map<Entity>ToPayload`
- Cấm mapping inline trong component.

### 4.3 Chuẩn bị hook data layer
- Tạo hook ở `hooks/<domain>/*` cho query/mutation.
- Hook gọi RPC + trả typed data.

### 4.4 Dựng domain component theo Container/View
- `*Editor.tsx` (container): hooks + state + handlers.
- `*EditorView.tsx` (presentational): UI thuần.

### 4.5 Dùng UI primitives đúng chuẩn
- Input nào cũng đi qua `<FieldControl>`.
- Không set tay `id/aria-*` ở domain khi đã có Form System.

### 4.6 Test nhanh trước merge
- Render đúng.
- Không lỗi TypeScript.
- Không vỡ accessibility contract.

---

## 5) Mapper – Hook – RPC Contract

### 5.1 Mapper
- Chỉ transform dữ liệu.
- Normalize null/optional fields.
- Không throw lỗi; trả safe fallback defaults.

### 5.2 Hook
- Chỉ fetch/mutate, gọi RPC/data layer.
- Dùng mapper để chuẩn hoá dữ liệu vào/ra.
- Chuẩn hoá error shape tối thiểu: `message`, `code`.

### 5.3 Domain component
- Nhận processed data (từ hook/props), render UI.
- Không gọi trực tiếp `supabase.rpc` trong render path.
- Không consume raw RPC error trực tiếp.

### 5.4 RPC naming & phân lớp use-case
- Chia nhóm rõ: Student runtime, Question management, Template management, Analytics/Admin.
- RPC mới phải có input/output contract rõ ràng + đường đi mapper tương ứng.

---

## 6) Naming Convention (MANDATORY)

### 6.1 Hooks
- Pattern: `use<Entity><Action>`
- Ví dụ: `useQuestionList`, `useQuestionDetail`, `useCreateQuestion`.

### 6.2 Mapper
- Pattern: `map<Entity>FromDB`, `map<Entity>ToPayload`.

### 6.3 Types
- Domain: `Entity`
- DB DTO: `EntityDTO`
- Form model: `EntityFormValues`

---

## 7) Server vs Client (Next.js)

### 7.1 Rules
- Ưu tiên Server Components cho data fetching khi phù hợp.
- Truyền data qua props xuống Client Components.
- Hooks dùng cho:
  - interactive state,
  - client-side updates.

### 7.2 Restrictions
- Tránh duplicate fetching.
- Tránh gọi RPC trực tiếp ở client nếu không cần thiết.

---

## 8) Performance Rules

### 8.1 Data fetching
- List phải có pagination (hoặc cơ chế giới hạn tương đương).
- Không fetch full dataset khi không cần.

### 8.2 Database
- Ensure index cho các query filter/sort quan trọng.

---

## 9) Danh mục Anti-pattern (cấm)
- `<Input error />` hoặc primitive input tự xử lý error state.
- `<FieldControl id="..." />` (id do context/control flow quản lý).
- `<FormField label="..." helperText="..." />` theo API cũ.
- Mapping payload/data inline trong component UI.
- UI component gọi API/RPC/DB trực tiếp.
- Trộn 2 pattern form API trong cùng codebase.
- Skip mapper và đẩy raw DB data lên UI.

---

## 10) Definition of Done (DoD)
Một feature chỉ được xem là DONE khi:
- Type contract complete,
- Mapper implemented,
- Hook implemented,
- UI theo composition pattern,
- Không `any` ở UI core/domain,
- Pass accessibility basics,
- Đúng layer boundaries,
- Có basic test/check phù hợp môi trường.

---

## 11) Lint / Enforcement (khuyến nghị mạnh)
Nên có rule chặn:
- `supabase.rpc` bên trong `components/domain/*`,
- `any` trong UI/domain,
- legacy form API usage.

---

## 12) Checklist audit trước khi chốt task

### 12.1 Type safety
- Không dùng `any` ở UI core/domain.
- Props typed rõ ràng.
- `children` khai báo đúng (`React.ReactNode` hoặc element type cụ thể).

### 12.2 Form system
- Không scan children.
- Không implicit behavior (displayName detection, auto magic).
- `FieldControl` chỉ inject minimal props.

### 12.3 Input compatibility
- `forwardRef` đúng.
- nhận `id`, `aria-*`, `className`, `...props`.
- Nhận `id`, `aria-*`, `className`, `...props`.

### 12.4 Layer boundary
- UI không import domain.
- Domain không gọi RPC trực tiếp trong render.
- Mapper không nằm trong component.

### 12.5 Styling consistency
- Dùng `cn(...)`.
- Dùng token trước hardcode.

---

## 13) Thứ tự làm việc khuyến nghị khi cộng tác với ChatGPT/Codex
1. Gửi phạm vi task thật nhỏ + mục tiêu đầu ra.
2. Yêu cầu bot nhắc lại layer-boundary trước khi code.
3. Bắt bot tạo type + mapper + hook trước, UI sau.
4. Code domain container/view.
5. Chạy checklist mục 12 trước khi duyệt.
6. Task lớn thì chia theo feature (không chia rời rạc theo layer).

---

## 14) Changelog

### 2026-03-30
- Merge hai playbook (`00_Master_Playbook.md` + `Master_Playbook2.md`) thành một bản unified.
- Chuẩn hoá lại cấu trúc: Governance → Architecture → UI → Data → Naming → Next.js → Performance → DoD.
- Bổ sung đầy đủ rule về prompt discipline, naming convention, server/client, error handling, performance, và enforcement.