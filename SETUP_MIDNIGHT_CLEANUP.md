# Hướng dẫn Setup Xóa Tất Cả Rooms và Tin Nhắn vào 0h

## Vấn đề hiện tại:
- Rooms và tin nhắn chưa tự động xóa vào 0h
- Database function chỉ xóa cũ hơn 24h (không phải tất cả)
- Thiếu cron job tự động

## Giải pháp:

### 1. **Cập nhật Database Function**

**Chạy SQL sau trong Neon Database Console:**

```sql
-- Xóa function cũ
DROP FUNCTION IF EXISTS daily_cleanup();

-- Tạo function mới xóa TẤT CẢ
CREATE OR REPLACE FUNCTION daily_cleanup() 
RETURNS void AS $$
BEGIN
  DELETE FROM rooms; -- Xóa tất cả rooms (messages sẽ tự động xóa theo CASCADE)
END;
$$ LANGUAGE plpgsql;
```

**Hoặc sử dụng file có sẵn:**
- Copy nội dung từ `update-cleanup-function.sql`
- Paste vào Neon Console → SQL Editor
- Click "Run"

### 2. **GitHub Actions đã được tạo**

File `.github/workflows/daily-cleanup.yml` sẽ:
- **Tự động chạy vào 17h UTC** (0h Việt Nam)
- **Gọi API cleanup** để xóa tất cả
- **Log kết quả** để theo dõi

### 3. **Test Manual Cleanup**

#### Cách 1: Qua curl
```bash
curl -X POST https://vaultday.netlify.app/.netlify/functions/daily-cleanup \
  -H "Content-Type: application/json"
```

#### Cách 2: Qua Browser
- Mở Developer Tools (F12)
- Console → Paste:
```javascript
fetch('/.netlify/functions/daily-cleanup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}).then(r => r.json()).then(console.log);
```

#### Cách 3: Qua Angular App
- Click button "🧹 Cleanup All" trong chat room

### 4. **Kiểm tra Kết quả**

#### Response thành công:
```json
{
  "ok": true,
  "message": "Daily cleanup completed successfully",
  "stats": {
    "rooms_remaining": 0,
    "messages_remaining": 0,
    "cleanup_time": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. **Các bước thực hiện:**

1. **Vào Neon Console** → SQL Editor
2. **Chạy SQL** ở bước 1 (hoặc dùng file `update-cleanup-function.sql`)
3. **Commit và push** code:
   ```bash
   git add .
   git commit -m "Add midnight cleanup for all rooms and messages"
   git push origin main
   ```
4. **Test manual** để đảm bảo hoạt động
5. **Chờ đến 0h** để xem tự động cleanup

### 6. **Monitoring:**

- **GitHub Actions**: Repository → Actions → "Daily Cleanup at Midnight"
- **Netlify Functions**: Dashboard → Functions → daily-cleanup
- **Database**: Neon Console → Logs

### 7. **Troubleshooting:**

#### Nếu GitHub Actions không chạy:
- Kiểm tra repository có được push lên GitHub không
- Kiểm tra GitHub Actions có được enable không
- Kiểm tra schedule: `0 17 * * *` = 17h UTC = 0h VN

#### Nếu API cleanup fail:
- Kiểm tra `NEON_DATABASE_URL` environment variable trong Netlify
- Kiểm tra database function có tồn tại không:
  ```sql
  SELECT routine_name FROM information_schema.routines 
  WHERE routine_name = 'daily_cleanup';
  ```

#### Nếu rooms không bị xóa:
- Kiểm tra foreign key constraint có đúng không
- Kiểm tra CASCADE delete có hoạt động không

### 8. **Lưu ý quan trọng:**

- ⚠️ **Backup**: Cleanup sẽ xóa TẤT CẢ rooms và messages, không thể khôi phục
- 🕛 **Timezone**: `0 17 * * *` = 17h UTC = 0h Việt Nam
- 🧪 **Testing**: Nên test manual trước khi để tự động chạy
- 📊 **Monitoring**: Theo dõi logs để đảm bảo hoạt động đúng

## Kết quả mong đợi:

Sau khi setup xong, vào **0h mỗi ngày**:
- ✅ Tất cả rooms sẽ bị xóa
- ✅ Tất cả messages sẽ bị xóa (do CASCADE)
- ✅ Database sẽ trống hoàn toàn
- ✅ Logs sẽ ghi nhận kết quả cleanup
