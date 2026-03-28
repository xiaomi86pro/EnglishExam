✅ I. GLOBAL RULE (áp dụng toàn bộ UI system)
1. ❌ Không dùng “prop-based API” cho form field

Cấm:

<FormField label="..." error="..." helperText="..." />
<FieldError message="..." />

Chuẩn:

<FormField>
  <FieldLabel />
  <FieldControl>
    <Input />
  </FieldControl>
  <FieldHelper />
  <FieldError />
</FormField>
2. ✅ Tất cả UI primitive dùng children

Checklist:

 Không có message, label, helperText props
 Nội dung luôn qua children
3. ✅ Tách rõ 3 layer
Layer	Rule
Logic	chỉ ở FormField, FieldControl
UI	FieldLabel, FieldError, FieldHelper
Style	cn + design tokens
✅ II. FORM SYSTEM RULE
4. FormField = Provider + Layout ONLY

Checklist:

 Có Context
 Có useField()
 Không import FieldLabel, FieldError, FieldHelper
 Không render label/error/helper
 Không có props: label, error, helperText
5. FieldControl = nơi DUY NHẤT inject props

Checklist:

 Có React.cloneElement
 Inject:
 id
 aria-describedby
 aria-invalid
 Không có UI
6. FieldLabel

Checklist:

 Dùng useField() để lấy id
 Có htmlFor={id}
 Có cn(...)
 Không tự generate id
7. FieldError

Checklist:

 Nhận nội dung qua children
 if (!children) return null
 Có id (từ context nếu dùng B3 full)
 Có role="alert" + aria-live
 Có cn(...)
8. FieldHelper

Checklist:

 Không render nếu có error
 Có id
 Có cn(...)
✅ III. INPUT COMPONENT RULE (CỰC KỲ QUAN TRỌNG)
9. Input phải tương thích FieldControl

Checklist:

 Accept id
 Accept className
 Accept aria-*
 forwardRef đúng

Ví dụ chuẩn:

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input ref={ref} {...props} />;
});
10. ❌ Không xử lý form logic trong Input

Cấm:

 tự set aria-invalid
 tự set id
 tự xử lý error
✅ IV. STYLING RULE
11. Mọi component dùng cn

Checklist:

 Có className prop
 Merge bằng cn(...)
 Không hard override class ngoài
12. Dùng design tokens

Checklist:

 Không hardcode màu (trừ tạm)
 Dùng:
--field-error-color
--field-helper-color
--form-spacing
✅ V. COMPOSITION RULE
13. Luôn theo 1 cấu trúc duy nhất

Checklist:

 <FormField> là root
 <FieldControl> wrap input
 Không bỏ FieldControl
14. ❌ Không mix pattern

Cấm:

<FormField label="...">
  <FieldLabel />
</FormField>
✅ VI. DOMAIN USAGE RULE
15. Domain KHÔNG import logic form

Checklist:

 Domain chỉ dùng:
FormField
FieldLabel
FieldControl
FieldError
 Không gọi useField() trong domain
16. Domain control layout

Checklist:

 Domain quyết định order component
 UI không ép layout
✅ VII. MIGRATION CHECK (rất quan trọng)

Search toàn project:

label=
error=
helperText=
message=

Checklist:

 Replace bằng composition
 Remove props cũ
 Update usage
✅ VIII. SMELL DETECTION (phát hiện code sai nhanh)

Nếu thấy:

🚨 Smell 1
<FieldError message="..." />

→ ❌ sai pattern

🚨 Smell 2
<FormField label="..." />

→ ❌ Pattern B còn sót

🚨 Smell 3
<Input aria-invalid />

→ ❌ sai layer

🚨 Smell 4
FormField import FieldLabel

→ ❌ coupling