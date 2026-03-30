I. TRIẾT LÝ THIẾT KẾ (Design Principles)
1. Single Source of Truth
State của field chỉ đến từ props
error?: string
required?: boolean
disabled?: boolean

❌ Không derive từ children
❌ Không scan tree

2. Unidirectional Data Flow
FormField (state owner)
   ↓
FieldContext
   ↓
FieldLabel / FieldControl / FieldError
3. Dumb UI Components
Component	Có logic?	Vai trò
FormField	✅	State + context
FieldControl	⚠️ minimal	Inject props
FieldLabel	❌	Render
FieldError	❌	Render
FieldHelper	❌	Render
4. Explicit > Implicit

❌ Không:

detect error từ <FieldError>
dùng displayName
magic behavior

✔ Luôn:

<FormField error="Required field">
II. API CONTRACT (BẮT BUỘC)
1. FormField
interface FormFieldProps {
  children: React.ReactNode;
  className?: string;

  // STATE
  error?: string;
  required?: boolean;
  disabled?: boolean;
}
2. FieldControl
type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  disabled?: boolean;
};

type ControlElement = React.ReactElement<ControlProps>;

interface FieldControlProps {
  children: ControlElement; // 🔒 exactly 1 child
}
3. FieldLabel
interface FieldLabelProps {
  children: React.ReactNode;
  className?: string;
}
4. FieldError
interface FieldErrorProps {
  message?: string;
  className?: string;
}
5. FieldHelper
interface FieldHelperProps {
  children?: React.ReactNode;
}
III. CONTEXT CONTRACT
interface FieldContextValue {
  id: string;
  helperId: string;
  errorId: string;

  hasError: boolean;
  error?: string;

  required?: boolean;
  disabled?: boolean;
}
IV. IMPLEMENTATION RULES
🔒 RULE 1 — KHÔNG SCAN CHILDREN

❌ Forbidden:

React.Children.forEach(...)
🔒 RULE 2 — KHÔNG any

❌ Forbidden:

(child: any)
ReactElement<any>
🔒 RULE 3 — SINGLE CHILD CONTROL
const child = React.Children.only(children);
🔒 RULE 4 — ONLY INJECT MINIMAL PROPS
cloneElement(child, {
  id,
  "aria-describedby",
  "aria-invalid",
  disabled,
});

❌ Không inject:

value
onChange
🔒 RULE 5 — ACCESSIBILITY BẮT BUỘC
Thuộc tính	Ý nghĩa
id	link label
aria-describedby	helper/error
aria-invalid	validation
htmlFor	label

VI. ANTI-PATTERNS (CẤM)

❌ displayName detection
❌ children scanning
❌ implicit error detection
❌ union ReactElement types
❌ injecting business logic vào FieldControl
❌ FormField đọc UI structure

VII. MỞ RỘNG (CHO EXAM SYSTEM)
1. Hỗ trợ complex input
<FieldControl>
  <CustomEditor />
</FieldControl>

✔ miễn là nhận:

id
aria-*
disabled
2. Tích hợp validation (sau này)
<FormField error={form.errors.name}>
3. Mapping với question types

Bạn có thể build:

<QuestionEditor>
  <FormField error={...}>
    <FieldControl>
      <Input />
    </FieldControl>
  </FormField>
</QuestionEditor>

→ consistent toàn hệ thống

VIII. CHECKLIST (CHO BẠN + CODEX)

Trước khi merge:

✅ Có dùng any không?

→ nếu có → fix

✅ Có scan children không?

→ nếu có → sai

✅ State có đến từ props không?

→ nếu không → sai

✅ Component có làm quá 1 nhiệm vụ không?

→ nếu có → tách