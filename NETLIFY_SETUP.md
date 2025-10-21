# Netlify Environment Variables Setup

## Cần cấu hình biến môi trường sau trên Netlify:

### Neon Database Configuration  
- **NEON_DATABASE_URL**: Connection string của Neon database (ví dụ: `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname`)

## Cách cấu hình:

1. Vào Netlify Dashboard
2. Chọn site của bạn
3. Vào **Site Settings** → **Environment Variables**
4. Thêm biến sau:

```
NEON_DATABASE_URL = postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname
```

5. Sau khi thêm xong, trigger một deploy mới để áp dụng biến môi trường.

## Lưu ý:
- Không commit các giá trị thực vào code
- Environment variable sẽ được inject vào runtime thông qua `process.env.NEON_DATABASE_URL`
- Ứng dụng sử dụng Neon Database trực tiếp thông qua Netlify Functions, không sử dụng Supabase

## Database Schema cần thiết:

```sql
-- Tạo bảng rooms
CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  password TEXT,
  created_by TEXT
);

-- Tạo bảng messages  
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  content TEXT NOT NULL,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  user_id TEXT
);

-- Tạo function để xóa tin nhắn cũ
CREATE OR REPLACE FUNCTION delete_old_messages() 
RETURNS void AS $$
BEGIN
  DELETE FROM messages WHERE created_at < (NOW() - INTERVAL '24 hours');
END;
$$ LANGUAGE plpgsql;

-- Tạo cron job để chạy function hàng ngày (nếu có pg_cron extension)
SELECT cron.schedule('daily-message-cleanup', '0 0 * * *', 'SELECT delete_old_messages()');
```
