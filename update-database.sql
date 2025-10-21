-- Update existing database to add is_public column
-- Run this SQL in your Neon database console

-- Add is_public column to existing rooms table
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT TRUE;

-- Update existing rooms to be public by default
UPDATE rooms SET is_public = TRUE WHERE is_public IS NULL;

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'rooms' AND column_name = 'is_public';

-- Show current rooms with is_public status
SELECT id, name, password, is_public, created_at FROM rooms ORDER BY created_at DESC;
