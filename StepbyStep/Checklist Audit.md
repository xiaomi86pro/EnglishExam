✅ Checklist cho mỗi input (input.tsx, textarea.tsx, select.tsx, ...)
1. Props contract
 ❌ KHÔNG có error, invalid, helperText
 ✔ extends HTML props chuẩn:
React.InputHTMLAttributes<HTMLInputElement>
2. Accessibility compatibility
 ✔ accept id
 ✔ accept aria-*
 ❌ KHÔNG tự set aria-invalid
3. Ref forwarding (critical)
 ✔ dùng React.forwardRef
 ✔ ref pass xuống DOM thật
4. Prop spreading
 ✔ {...props} ở cuối
 ❌ không override props từ ngoài
5. Styling theo state (QUAN TRỌNG)
 ✔ dùng:
aria-[invalid=true]:
 ❌ không dùng error && ...
6. ClassName
 ✔ có className
 ✔ dùng cn(...)
🟠 PRIORITY 2 — FORM SYSTEM (vừa build xong nhưng cần verify)
1. FormField
 ✔ có Context
 ✔ có useField()
 ✔ generate id duy nhất
 ✔ detect FieldError
 ❌ không import Field components
2. FieldControl
 ✔ chỉ nhận 1 child (ReactElement)
 ✔ dùng cloneElement
 ✔ inject:
 id
 aria-describedby
 aria-invalid
3. FieldLabel
 ✔ dùng useField()
 ✔ có htmlFor
 ✔ có cn
4. FieldError
 ✔ dùng children
 ✔ role="alert"
 ✔ aria-live
 ✔ không render nếu empty
5. FieldHelper
 ✔ không render nếu có error
🟡 PRIORITY 3 — DOMAIN USAGE (rất dễ sai)

Search toàn project:

id=
aria-
error=
helperText=
message=
invalid=
Checklist
 ❌ không truyền id vào input
 ❌ không truyền aria-*
 ❌ không truyền invalid
 ✔ luôn dùng <FieldControl>
🔵 PRIORITY 4 — DESIGN SYSTEM (thường bị bỏ qua)
1. Tokens

Check styles/global.css:

 --field-error-color
 --field-helper-color
 --form-label-spacing
 --input-height
 --input-radius
2. Consistency
 tất cả input cùng padding
 cùng border radius
 cùng font size
🟣 PRIORITY 5 — TYPE SAFETY (advanced nhưng rất đáng)
1. FieldControl strict type
 ❌ không cho truyền string / fragment
 ✔ chỉ accept 1 element hợp lệ
2. Không dùng any trong UI core
⚫ PRIORITY 6 — ANTI-PATTERN DETECTION
🚨 Nếu thấy → sửa ngay
1.
<Input error />
2.
<FieldControl id="..." />
3.
<FormField label="..." />
4.
<input className={error ? ...} />