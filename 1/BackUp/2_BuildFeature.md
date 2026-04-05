RPC → mapper → hook → domain component → ui component

🟢 Step 1 — bắt đầu từ Domain (KHÔNG phải hook)
question-editor.tsx

👉 bạn sẽ cần:

onSubmit(data)
🟡 Step 2 — thiếu hook → tạo hook
useCreateQuestion()
🟡 Step 3 — hook cần gọi RPC
supabase.rpc(...)
🟡 Step 4 — cần payload đúng → dùng mapper
mapFormToPayload()
👉 Pattern thực tế sẽ là:
Domain thiếu gì → kéo xuống Hook → kéo xuống Mapper → kéo xuống RPC
🔁 Quy tắc vàng (cực quan trọng)
❌ Sai:
Viết hook trước
Viết UI trước
Viết mapper “đoán trước”
✅ Đúng:
Bắt đầu từ feature UI (domain)
→ thiếu gì thì tạo
→ kéo dependency xuống dưới

---

📦 Checklist riêng cho HOOK (bạn sẽ cần ngay)

Khi tạo 1 hook, luôn check:

[ ] Hook này phục vụ 1 feature cụ thể?
[ ] Tên hook đúng action? (useCreateQuestion)
[ ] Có return loading state?
[ ] Có handle error?
[ ] Có gọi mapper?
