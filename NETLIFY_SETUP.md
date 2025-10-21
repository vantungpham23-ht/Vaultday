# Netlify Environment Variables Setup

## Cần cấu hình biến môi trường sau trên Netlify:

### Neon Database Configuration  
- **NEON_DATABASE_URL**: Connection string của Neon database

## Cách cấu hình:

1. **Vào Netlify Dashboard**
   - Đăng nhập vào [netlify.com](https://netlify.com)
   - Chọn site của bạn

2. **Thêm Environment Variable**
   - Vào **Site Settings** → **Environment Variables**
   - Click **Add variable**
   - Name: `NEON_DATABASE_URL`
   - Value: `postgresql://neondb_owner:npg_7DBHmeu8yKVS@ep-twilight-leaf-aejcvzh9-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

3. **Deploy lại**
   - Trigger một deploy mới để áp dụng biến môi trường
   - Hoặc click **Trigger deploy** → **Deploy site**

## Database Schema Setup:

1. **Vào Neon Console**
   - Đăng nhập vào [console.neon.tech](https://console.neon.tech)
   - Chọn project của bạn

2. **Chạy SQL Schema**
   - Vào **SQL Editor**
   - Copy và paste nội dung từ file `database-setup.sql`
   - Click **Run** để tạo tables và functions

3. **Verify Setup**
   - Chạy query: `SELECT * FROM rooms;`
   - Chạy query: `SELECT * FROM messages;`
   - Chạy query: `SELECT daily_cleanup();` (test cleanup function)

## Daily Cleanup System:

**Tự động xóa tất cả phòng chat và tin nhắn khi đồng hồ điểm 0h:**

1. **Database Functions:**
   - `daily_cleanup()`: Xóa tất cả rooms và messages cũ hơn 24h
   - `delete_old_rooms()`: Chỉ xóa rooms cũ
   - `delete_old_messages()`: Chỉ xóa messages cũ

2. **Netlify Function:**
   - `/.netlify/functions/daily-cleanup`: API endpoint để chạy cleanup
   - Có thể được gọi tự động hoặc manual

3. **Manual Cleanup:**
   - Truy cập: `https://your-site.netlify.app/.netlify/functions/daily-cleanup`
   - Method: POST
   - Sẽ trả về stats sau khi cleanup

## Testing Connection:

1. **Test Function**
   - Sau khi deploy, truy cập: `https://your-site.netlify.app/.netlify/functions/test-neon`
   - Nếu thành công sẽ thấy: `{"ok": true, "message": "Neon database connection successful!"}`

2. **Check Console**
   - Mở Developer Tools (F12)
   - Vào tab Console
   - Refresh trang web
   - Xem log: `✅ Database connection successful!`

## Troubleshooting:

### Lỗi "NEON_DATABASE_URL environment variable is not set"
- Kiểm tra Environment Variable đã được thêm chưa
- Đảm bảo không có khoảng trắng thừa
- Deploy lại sau khi thêm

### Lỗi "WebSocket connection failed"
- Kiểm tra connection string có đúng format không
- Đảm bảo database đang hoạt động
- Kiểm tra firewall settings

### Lỗi "relation does not exist"
- Chạy lại database-setup.sql
- Kiểm tra schema đã được tạo đúng chưa

## Lưu ý:
- Không commit connection string vào code
- Environment variable chỉ có hiệu lực sau khi deploy
- Sử dụng Neon Database trực tiếp qua Netlify Functions
- WebSocket được cấu hình tự động cho Neon
