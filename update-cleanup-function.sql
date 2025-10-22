-- Update daily_cleanup function to delete ALL rooms and messages at midnight
-- Run this SQL in your Neon database console

-- Drop existing function
DROP FUNCTION IF EXISTS daily_cleanup();

-- Create new function that deletes EVERYTHING at midnight
CREATE OR REPLACE FUNCTION daily_cleanup() 
RETURNS void AS $$
BEGIN
  -- Delete ALL rooms and messages at midnight (not just old ones)
  DELETE FROM rooms; -- This will cascade delete all messages due to foreign key constraint
END;
$$ LANGUAGE plpgsql;

-- Test the function
SELECT daily_cleanup();

-- Verify cleanup worked
SELECT 'rooms' as table_name, count(*) as remaining_count FROM rooms
UNION ALL
SELECT 'messages' as table_name, count(*) as remaining_count FROM messages;
