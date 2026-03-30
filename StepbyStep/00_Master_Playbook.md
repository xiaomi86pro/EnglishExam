# STEPBYSTEP MASTER PLAYBOOK (Chuẩn hoá cho ChatGPT/Codex)

> Mục tiêu: gom toàn bộ rule + workflow trong thư mục `StepbyStep/` thành 1 chuẩn duy nhất, bỏ trùng lặp, giữ trình tự thao tác rõ ràng.

## 1) Cách dùng tài liệu này

1. Bắt đầu từ **Phần A: Kiến trúc & ranh giới layer**.
2. Sau đó đọc **Phần B: Rule UI/Form/Input** trước khi làm UI.
3. Khi làm feature, đi theo **Phần C: Quy trình triển khai 1 feature E2E**.
4. Nếu dính data/RPC, đối chiếu **Phần D: Mapper-Hook-RPC contract**.
5. Trước khi kết thúc task, chạy **Phần E: Checklist audit**.
6. Roadmap dài hạn xem riêng file `01_Roadmap_Implementation.md`.
7. Gợi ý bổ sung xem riêng file `99_GoiYBoSung.md`.

---

## A. Kiến trúc tổng thể (không được phá)

## A1. Layering chuẩn

```text
lib (pure logic, mapper)
↓
components/ui (dumb, reusable primitives)
↓
components/domain (business composition)
↓
app (route/pages)
```

### Rule cứng
- `components/ui/*`:
  - Không business logic.
  - Không gọi RPC/API/DB.
  - Không import `components/domain/*`.
- `components/domain/*`:
  - Compose từ `ui` + `types` + `mappers` + hooks.
  - Không xử lý low-level accessibility của field (`id`, `aria-*`) nếu đã có Form System.
  - Không gọi `supabase.rpc(...)` trực tiếp trong component render.
- `hooks/*`:
  - Là nơi duy nhất fetch/mutate data + gọi RPC.
- `lib/mappers/*`:
  - Là nơi duy nhất transform dữ liệu (Form→Payload, DB→ViewModel).

## A2. Nguyên tắc kiến trúc backend/frontend đã chốt
- Auth + session theo Supabase SSR.
- Role nằm trong DB (`profiles` + RPC assert role), không dựa JWT metadata.
- Middleware ưu tiên check authentication; phân quyền chi tiết xử lý ở server/RPC.

---

## B. Rule chuẩn cho UI System (dedupe)

## B1. Triết lý API
- Chọn **một pattern duy nhất** cho form: **Composition Pattern**.
- Cấm quay lại prop-based form API kiểu:
  - `label`, `error`, `helperText` truyền trực tiếp vào input/form wrapper.

### Mẫu bắt buộc
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

## B2. Form System contract

### `FormField` (state owner + context provider)
- Nhận state qua props explicit: `error`, `required`, `disabled`.
- Không scan children.
- Không tự import/render cứng `FieldLabel/FieldError/FieldHelper`.

### `FieldControl` (injector duy nhất)
- Chỉ nhận **1 child element hợp lệ**.
- Chỉ inject tối thiểu:
  - `id`
  - `aria-describedby`
  - `aria-invalid`
  - `disabled`
- Không inject value/onChange.

### `FieldLabel`
- Lấy `id` từ context.
- Render `htmlFor={id}`.

### `FieldHelper`
- Render children.
- Có thể không render nếu đang có error.

### `FieldError`
- Render children.
- Không render khi rỗng.
- Có `role="alert"` + `aria-live`.

## B3. Rule cho input primitives (`components/ui/input/*`)
- Bắt buộc `forwardRef` nếu render HTML input element.
- Bắt buộc pass-through `...props` để nhận `id`, `aria-*`, `disabled`, `className`.
- Không tự xử lý logic `error/invalid/id generation`.

## B4. Styling & accessibility
- Luôn dùng `cn(...)` + `className?: string`.
- Ưu tiên design tokens trong `styles/globals.css`.
- Tránh hardcode style nếu đã có token tương ứng.

---

## C. Quy trình chuẩn triển khai 1 feature (E2E)

## C0. Chốt scope nhỏ
- Mỗi task chỉ 1 feature nhỏ (VD: `Question Editor - MCQ_SINGLE`).
- Không trộn Passage/Template/Runtime trong cùng task nếu không bắt buộc.

## C1. Chốt domain contract trước UI
- Chốt type chính (`Question`, `QuestionFormValues`, ...).
- Chốt input/output contract của RPC/hook.

## C2. Chuẩn bị mapper
- Tạo/điều chỉnh mapper ở `lib/mappers/*`:
  - `mapFormToPayload(...)`
  - `mapDbToViewModel(...)`
- Cấm mapping inline trong component.

## C3. Chuẩn bị hook data layer
- Tạo hook ở `hooks/<domain>/*` cho query/mutation.
- Hook gọi RPC + trả về typed data.

## C4. Dựng domain component theo pattern Container/View
- `*Editor.tsx` (container): dùng hooks + state + handlers.
- `*EditorView.tsx` (presentational): render UI thuần.

## C5. Dùng UI primitives đúng chuẩn
- Input nào cũng đi qua `<FieldControl>`.
- Không set tay `id/aria-*` ở domain khi đã có Form System.

## C6. Test nhanh trước merge
- Render đúng.
- Không lỗi TS.
- Không vỡ accessibility contract.

---

## D. Mapper – Hook – RPC contract (đã chuẩn hoá)

## D1. Mapper
- Chỉ transform dữ liệu.
- Không chứa UI.
- Không gọi RPC.

## D2. Hook
- Chỉ fetch/mutate, gọi RPC.
- Không chứa logic UI rendering.

## D3. Domain component
- Gọi hook + mapper output để render.
- Không gọi trực tiếp `supabase.rpc` trong UI component.

## D4. RPC naming & phân lớp
- RPC chia nhóm theo use-case:
  - Student runtime
  - Question management
  - Template management
  - Analytics/admin
- Tất cả RPC mới phải có input/output rõ ràng, typed contract, và đường đi mapper phù hợp.

---

## E. Checklist audit trước khi chốt task

## E1. Type safety
- Không dùng `any` ở UI core/domain.
- Props typed rõ ràng.
- `children` khai báo đúng (`React.ReactNode` hoặc element type cụ thể).

## E2. Form system
- Không scan children.
- Không implicit behavior (displayName detection, auto magic).
- `FieldControl` chỉ inject minimal props.

## E3. Input compatibility
- `forwardRef` đúng.
- nhận `id`, `aria-*`, `className`, `...props`.

## E4. Layer boundary
- UI không import domain.
- Domain không gọi RPC trực tiếp trong render.
- Mapper không nằm trong component.

## E5. Styling consistency
- Dùng `cn(...)`.
- Dùng token trước hardcode.

---

## F. Danh mục anti-pattern (cấm)
- `<Input error />` hoặc tự xử lý error state trong primitive input.
- `<FieldControl id="..." />` (id phải do context/control flow chuẩn).
- `<FormField label="..." helperText="..." />` theo prop-based API cũ.
- Mapping payload/data inline ngay trong component UI.
- UI component gọi API/RPC/DB trực tiếp.
- Trộn 2 pattern form API trong cùng codebase.

---

## G. Thứ tự làm việc khuyến nghị khi cộng tác với ChatGPT/Codex
1. Gửi phạm vi task thật nhỏ + mục tiêu đầu ra.
2. Yêu cầu bot nhắc lại layer-boundary trước khi code.
3. Bắt bot tạo type + mapper + hook trước, UI sau.
4. Code domain container/view.
5. Chạy checklist E trước khi duyệt.
6. Nếu task lớn, chia thành nhiều chat theo feature (không chia theo layer rời rạc).
