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