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
2️⃣ Rules cho components/domain/*

Mục tiêu: Layer này compose UI layer + types + mappers + lib để tạo các domain components, thường gắn với exam, question, template, passage, etc.

Rule	Chi tiết
Composition	Chỉ import từ:
- components/ui/*
- @/lib/mappers/*
- @/types/*
- @/lib/* (utility functions, helpers, supabase client, etc)
Props typing	Không dùng any. Luôn khai báo interface/ type cho props, tận dụng types/question.ts, types/exam.ts,…
Children	Chỉ dùng khi component cần render slot; khai báo React.ReactNode rõ ràng.
Styling	Dùng UI primitives; domain component không override global CSS trực tiếp. Có thể truyền className qua UI wrapper + cn.
Logic	Có thể implement business logic (mapping, computation, state), nhưng không trực tiếp gọi API/RPC trong render. RPC gọi trong hook/handler function riêng.
State management	Chỉ internal state hoặc từ props. Nếu dùng store/global state, import từ lib hoặc context đã chuẩn hóa.
No external UI library	Không sử dụng shadcn/radix. Tất cả UI dựa trên primitives của ui/.
Error handling	Nếu dùng form fields hoặc fetch data, error phải được typed và propagate lên parent.
Mapper usage	Nếu cần transform data cho render, luôn dùng mapper function từ lib/mappers/*. Không copy logic mapping trực tiếp.
3️⃣ Các lỗi phổ biến cần tránh
Lỗi	Giải pháp
any	Luôn khai báo interface/type. Nếu type dynamic, dùng unknown trước khi cast.
children type	Chưa khai báo React.ReactNode → lỗi TS. Luôn explicit.
CSS conflict	Không override global.css. Dùng className + cn.
Logic layer nhầm chỗ	Domain component mới logic; UI component không logic.
Import sai layer	UI không import domain/mappers/types. Domain không import UI ngoại trừ primitives.
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