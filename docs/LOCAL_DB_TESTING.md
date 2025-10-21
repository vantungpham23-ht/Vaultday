# Local Database Testing Guide

## 🚨 Problem
Error: `column "username" of relation "messages" does not exist`

This happens because we added `username` field to the code but the database table doesn't have this column yet.

## 🛠️ Solution

### Step 1: Run Database Migration
1. **Connect to your Neon database console**
2. **Run the migration script:**
   ```sql
   -- Copy and paste the content from migration-add-username.sql
   ALTER TABLE messages 
   ADD COLUMN IF NOT EXISTS username VARCHAR(255);
   
   UPDATE messages 
   SET username = 'User_' || SUBSTRING(user_id, 1, 8)
   WHERE username IS NULL AND user_id IS NOT NULL;
   
   UPDATE messages 
   SET username = 'Anonymous'
   WHERE username IS NULL;
   ```

### Step 2: Test Locally
1. **Start local development server:**
   ```bash
   npm start
   ```

2. **Test in browser:**
   - Open: http://localhost:4200
   - Create a room or join existing room
   - Send messages
   - Verify usernames display correctly

### Step 3: Verify Database Changes
1. **Check if column exists:**
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'messages' 
   AND column_name = 'username';
   ```

2. **Check sample data:**
   ```sql
   SELECT username, user_id, content, created_at
   FROM messages 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

## 🧪 Testing Checklist

### Before Migration:
- [ ] Database has messages table
- [ ] Messages table has: id, created_at, content, room_id, user_id
- [ ] Messages table does NOT have: username

### After Migration:
- [ ] Messages table has username column
- [ ] Existing messages have username values
- [ ] New messages can be created with username
- [ ] No database errors in console

### Local Testing:
- [ ] App starts without errors
- [ ] Can create/join rooms
- [ ] Can send messages
- [ ] Usernames display correctly
- [ ] Different users have different colors
- [ ] No console errors

## 🚀 Production Deployment

### Only after local testing is successful:

1. **Commit changes:**
   ```bash
   git add migration-add-username.sql
   git add database-setup.sql
   git commit -m "Add username column to messages table"
   ```

2. **Push to production:**
   ```bash
   git push origin main
   ```

3. **Run migration in production database:**
   - Connect to production Neon database
   - Run the same migration script

## 🔍 Troubleshooting

### Common Issues:

1. **"Column already exists"**
   - This is OK, the `IF NOT EXISTS` clause handles this

2. **"Permission denied"**
   - Make sure you have ALTER TABLE permissions

3. **"Table doesn't exist"**
   - Run the full database-setup.sql first

4. **"Connection error"**
   - Check your database connection string
   - Verify database is accessible

### Verification Commands:

```sql
-- Check table structure
\d messages

-- Check if username column exists
SELECT * FROM information_schema.columns 
WHERE table_name = 'messages' AND column_name = 'username';

-- Check sample data
SELECT username, user_id, LEFT(content, 50) as content_preview
FROM messages 
ORDER BY created_at DESC 
LIMIT 10;
```

## 📊 Expected Results

### Database Schema:
```sql
messages table:
- id (UUID, PRIMARY KEY)
- created_at (TIMESTAMP)
- content (TEXT)
- room_id (UUID, FOREIGN KEY)
- user_id (TEXT)
- username (VARCHAR(255))  -- NEW COLUMN
```

### Sample Data:
```
username          | user_id    | content
------------------|------------|------------------
User_abc12345     | abc12345   | Hello everyone!
Anonymous         | NULL       | Test message
User_def67890     | def67890   | How are you?
```

## ✅ Success Criteria

- [ ] Migration script runs without errors
- [ ] Username column exists in messages table
- [ ] Local app works without database errors
- [ ] Messages display with usernames
- [ ] User colors work correctly
- [ ] No console errors

Only proceed to production deployment after all local tests pass! 🎯
