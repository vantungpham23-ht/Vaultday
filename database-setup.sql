-- Database Schema Setup for VaultDay
-- Run this SQL in your Neon database console

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  password TEXT,
  created_by TEXT,
  is_public BOOLEAN DEFAULT TRUE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  content TEXT NOT NULL,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  user_id TEXT
);

-- Create function to delete old messages
CREATE OR REPLACE FUNCTION delete_old_messages() 
RETURNS void AS $$
BEGIN
  DELETE FROM messages WHERE created_at < (NOW() - INTERVAL '24 hours');
END;
$$ LANGUAGE plpgsql;

-- Create function to delete old rooms (everything older than 24 hours)
CREATE OR REPLACE FUNCTION delete_old_rooms() 
RETURNS void AS $$
BEGIN
  -- Delete rooms and all their messages (CASCADE will handle messages)
  DELETE FROM rooms WHERE created_at < (NOW() - INTERVAL '24 hours');
END;
$$ LANGUAGE plpgsql;

-- Create function to clean everything (rooms + messages)
CREATE OR REPLACE FUNCTION daily_cleanup() 
RETURNS void AS $$
BEGIN
  -- Delete old rooms first (messages will be deleted by CASCADE)
  DELETE FROM rooms WHERE created_at < (NOW() - INTERVAL '24 hours');
  
  -- Also delete any orphaned messages (just in case)
  DELETE FROM messages WHERE created_at < (NOW() - INTERVAL '24 hours');
END;
$$ LANGUAGE plpgsql;

-- Test the functions
SELECT delete_old_messages();
SELECT delete_old_rooms();
SELECT daily_cleanup();

-- Add is_public column to existing rooms table (if it doesn't exist)
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT TRUE;

-- Insert a test room
INSERT INTO rooms (name, password, is_public) VALUES ('Test Room', NULL, TRUE) ON CONFLICT DO NOTHING;

-- Verify tables exist
SELECT 'rooms' as table_name, count(*) as row_count FROM rooms
UNION ALL
SELECT 'messages' as table_name, count(*) as row_count FROM messages;
