# Netlify Environment Variables Setup

## Cần cấu hình các biến môi trường sau trên Netlify:

### 1. Supabase Configuration
- **SUPABASE_URL**: URL của Supabase project (ví dụ: `https://abcdefgh.supabase.co`)
- **SUPABASE_ANON_KEY**: Anon key của Supabase project

### 2. Neon Database Configuration  
- **NEON_DATABASE_URL**: Connection string của Neon database (ví dụ: `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname`)

## Cách cấu hình:

1. Vào Netlify Dashboard
2. Chọn site của bạn
3. Vào **Site Settings** → **Environment Variables**
4. Thêm các biến sau:

```
SUPABASE_URL = https://your-project-id.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEON_DATABASE_URL = postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname
```

5. Sau khi thêm xong, trigger một deploy mới để áp dụng các biến môi trường.

## Lưu ý:
- Không commit các giá trị thực vào code
- Chỉ sử dụng placeholder values trong code
- Environment variables sẽ được inject vào runtime thông qua `window.__env`
