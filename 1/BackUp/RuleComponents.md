1️⃣ Rules cho components/ui/*

Mục tiêu: Đây là layer primitive UI / form / typography / layout / feedback, dùng chung toàn app, không dùng domain logic.

Rule	Chi tiết
Import chung	Bắt buộc: import { cn } from "@/lib/utils";
Style	Chỉ dùng biến từ @/styles/global.css hoặc class Tailwind. Không import CSS riêng trừ khi component cực đặc thù.
Props	Tránh dùng any. Nếu component có children, khai báo rõ React.ReactNode. Các prop phải typed cụ thể.
Composition	Chỉ dùng các UI primitives khác trong ui/. Không gọi domain components, mappers, types, hoặc lib business logic.
No shadcn/radix	Không sử dụng thư viện UI ngoài trừ tailwind/tailwind-merge (cn).
Forwarding ref	Nếu component render element HTML, forward ref chuẩn (React.forwardRef) nếu cần.
No business logic	Không gọi API, RPC, hoặc access DB. Chỉ render, style, layout.
Accessibility	Label, aria, alt text đầy đủ. Tuân thủ Tailwind + HTML5 semantic.
Testing	Component phải có data-testid nếu dùng trong form wrapper hoặc interactive component.

4️⃣ Checklist tổng thể khi tạo component mới
Xác định layer: ui hay domain.
Kiểm tra import: chỉ import những thứ layer cho phép.
Props: typed, no any.
children: nếu có, khai báo React.ReactNode.
Styling: dùng cn + global.css, tránh override trực tiếp.
Business logic: chỉ domain layer, UI layer không logic.
Mapper: domain dùng mapper, UI không.
Forward ref: chỉ UI primitives nếu cần.
Accessibility: label, aria, alt đầy đủ.
Kiểm tra lỗi TS: no any, strict typing.