Authentication
Supabase Auth session
Authorization
profiles.role + RPC assert
Middleware
session only
UI
login form disposable


Mình khuyên tạo luôn file util nhỏ:

lib/auth/redirect-by-role.ts

để sau này:

login
home
invite flow
password reset
magic link

dùng chung redirect logic.


***********************************************************
Với các RPC dashboard kiểu:

question list
exam list
template list
analytics
student submissions

mình khuyên chuẩn hóa rule:

List/read RPC = SECURITY DEFINER
table RLS = chỉ bảo vệ direct table access

Tức là:

UI luôn đi qua RPC
permission logic nằm trong RPC + rpc_assert_min_role
RLS chỉ là safety net

Cách này rất hợp với architecture bạn đã chọn:

DB schema → RPC contract → types → mapper → hook → UI
************************************************************