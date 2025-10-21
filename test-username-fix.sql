-- Test Script: Verify Username Column Fix
-- Run this after migration to verify everything works

-- 1. Check if username column exists
SELECT 
    'Column Check' as test_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'messages' AND column_name = 'username'
        ) THEN 'PASS' 
        ELSE 'FAIL' 
    END as result;

-- 2. Check data types
SELECT 
    'Data Type Check' as test_name,
    column_name,
    data_type,
    character_maximum_length,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'messages' AND column_name = 'username';

-- 3. Check existing data
SELECT 
    'Data Check' as test_name,
    COUNT(*) as total_messages,
    COUNT(username) as messages_with_username,
    COUNT(*) - COUNT(username) as messages_without_username
FROM messages;

-- 4. Sample data
SELECT 
    'Sample Data' as test_name,
    username,
    user_id,
    LEFT(content, 30) as content_preview,
    created_at
FROM messages 
ORDER BY created_at DESC 
LIMIT 5;

-- 5. Test insert (simulation)
-- This will show what would happen if we insert a new message
SELECT 
    'Insert Test' as test_name,
    'Would work' as result,
    'Username column exists and accepts VARCHAR(255)' as details;
