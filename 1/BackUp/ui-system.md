✅ I. KIẾN TRÚC TỔNG THỂ
1. Layering (bắt buộc)
lib (pure logic, mapper)
↓
components/ui (dumb, reusable)
↓
components/domain (business + composition)
↓
app (pages)
✔ Rule
domain chỉ dùng ui
ui KHÔNG import domain
lib KHÔNG phụ thuộc React
✅ II. UI SYSTEM (components/ui)
2. UI = Headless + Dumb
✔ Rule
Không business logic
Không biết question, exam, v.v.
Không fetch data
Không validate domain
3. Composition Pattern (Pattern A)
✔ Rule
Không prop kiểu:
label
error
helperText
Luôn dùng composition:
<FormField>
  <FieldLabel />
  <FieldControl>
    <Input />
  </FieldControl>
  <FieldError />
</FormField>
4. UI primitives phải tách rời

✔ Đúng:
form-field.tsx
field-label.tsx
field-error.tsx

👉 Thực tế:

được group theo domain UI (form/, input/, feedback/...)
nhưng file phải atomic
5. Styling chuẩn
✔ Rule
Luôn dùng:
import { cn } from "@/lib/utils";
Luôn có:
className?: string
Không hardcode style khi đã có token
6. Design Tokens (rất quan trọng)

styles/global.css
✔ Rule
spacing → token
color → token
typography → token
❌ Không:
"text-red-500"

(trừ khi tạm thời)

7. Accessibility centralized
✔ Rule
Chỉ xử lý tại:
FormField
FieldControl
❌ Domain không được:
set id
set aria-*
✅ III. DOMAIN LAYER
8. Domain = nơi “compose”
✔ Rule
Quyết định layout
Gọi mapper
Bind data
9. Domain KHÔNG làm UI logic
❌ Không:
xử lý aria
xử lý spacing
xử lý className phức tạp
10. Domain dùng mapper :
lib/mappers/*.ts
✔ Rule
convert DB → UI
map enum → label
derive state
✅ IV. INPUT SYSTEM 
11. Input phải compatible với FieldControl
✔ Bắt buộc:
forwardRef
...props
id
aria-*
❌ Không:
tự xử lý error
tự generate id
✅ V. CONSISTENCY RULE (cái bạn còn thiếu)
12. Single API pattern toàn system

👉 Một khi đã chọn:

composition (Pattern A)

→ thì:

❌ Cấm tuyệt đối:
quay lại prop-based API
mix 2 pattern
13. Naming consistency
✔ Rule
FieldLabel
FieldError
FieldHelper

👉 Không:

ErrorText
FormLabel
lẫn lộn naming

✅ VI. ANTI-PATTERN (rất quan trọng)
🚨 1. UI import UI khác để render
FormField import FieldError ❌
🚨 2. Domain truyền aria
<FieldControl aria-invalid />
🚨 3. UI chứa business logic
if (questionType === ...)
🚨 4. Input tự xử lý error
<input className={error ? ...} />

✅ VII. BỔ SUNG 
14. Context-based logic (B3)
useField()
centralize id + aria
✅ Rule 1

❌ Không truyền id, aria-* từ domain

✅ Rule 2

✔ FieldControl là nơi DUY NHẤT inject props vào input

✅ Rule 3

✔ useField() chỉ dùng trong components/ui/form/*

15. Type safety
không dùng any trong UI core
đặc biệt FieldControl


✅ CORE PRINCIPLES
1 Layering rõ ràng
    lib → ui → domain → app
2 UI = headless + dumb
    không business logic
3 Composition Pattern (Pattern A)
    không dùng prop-based API cho form
4 UI primitives phải atomic
    tách file, không gộp logic
5 Styling chuẩn hoá
    dùng cn
    dùng design tokens
6 Accessibility centralized
    chỉ xử lý tại UI form system
7 Domain = composition + data binding
    không xử lý UI logic
8 Mapper = single source of truth cho data transform
9 Input components phải tương thích FieldControl
10 Consistency tuyệt đối
    không mix pattern
    không phá contract