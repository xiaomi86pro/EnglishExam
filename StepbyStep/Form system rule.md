🔒 FORM SYSTEM RULES
1. State flow
FormField nhận:
- error
- required
- disabled

❌ Không derive từ children

2. FieldControl
chỉ inject props
không logic
3. FieldError
chỉ render
không ảnh hưởng state
4. KHÔNG dùng:
displayName
scan children
implicit behavior
5. Type rule
ReactElement<MinimalProps>

❌ không union element
❌ không any

✅ 1. State nằm ở đâu?
props hay children?

👉 nếu children → STOP

✅ 2. Component này có “đọc structure” không?

👉 nếu có → sai hướng

✅ 3. Có dùng any không?

👉 nếu có → phải refactor

✅ 4. Có implicit behavior không?

👉 nếu có → convert sang explicit prop