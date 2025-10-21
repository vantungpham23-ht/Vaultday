-- Migration: Add username column to messages table
-- Run this SQL in your Neon database console

-- Add username column to messages table
ALTER TABLE messages 
ADD COLUMN IF NOT EXISTS username VARCHAR(255);

-- Update existing messages with placeholder username if user_id exists
UPDATE messages 
SET username = 'User_' || SUBSTRING(user_id, 1, 8)
WHERE username IS NULL AND user_id IS NOT NULL;

-- Set username to 'Anonymous' for messages without user_id
UPDATE messages 
SET username = 'Anonymous'
WHERE username IS NULL;

-- Verify the column was added
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'messages' 
AND column_name = 'username';

-- Show sample data
SELECT 
    id,
    username,
    user_id,
    content,
    created_at
FROM messages 
ORDER BY created_at DESC 
LIMIT 5;
