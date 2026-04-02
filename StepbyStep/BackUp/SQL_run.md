Lấy all RPC

SELECT 
    p.proname AS function_name,
    pg_get_functiondef(p.oid) AS function_definition
FROM 
    pg_proc p
JOIN 
    pg_namespace n ON p.pronamespace = n.oid
WHERE 
    n.nspname = 'public'
    AND p.proname ILIKE '%rpc%';

All RPC name only

SELECT proname 
FROM pg_proc 
WHERE proname LIKE 'rpc%' 
AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

Get RPC Definition by Name

SELECT 
    pg_get_functiondef(p.oid) AS function_definition
FROM 
    pg_proc p
JOIN 
    pg_namespace n ON p.pronamespace = n.oid
WHERE 
    p.proname = 'rpc_preview_exam_template' -- Thay bằng tên hàm bạn cần soi code
    AND n.nspname = 'public';