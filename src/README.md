# SEO Files

Thư mục này chứa các file SEO quan trọng đã được di chuyển ra khỏi thư mục `public` để bảo mật.

## Files trong thư mục:

- `robots.txt` - Hướng dẫn cho search engine crawlers
- `sitemap.xml` - Sơ đồ trang web cho SEO
- `manifest.json` - PWA manifest file
- `browserconfig.xml` - Cấu hình cho Microsoft browsers
- `CNAME` - Custom domain cho GitHub Pages

## Lý do di chuyển:

1. **Bảo mật**: Không expose thông tin SEO trong build public
2. **Kiểm soát**: Chỉ deploy khi cần thiết
3. **Tách biệt**: Tách riêng SEO files khỏi app assets

## Cách sử dụng:

Khi deploy production, copy các file này vào root của website:
- `robots.txt` → `/robots.txt`
- `sitemap.xml` → `/sitemap.xml`
- `manifest.json` → `/manifest.json`
- `browserconfig.xml` → `/browserconfig.xml`
- `CNAME` → `/CNAME` (chỉ cho GitHub Pages)

## Lưu ý:

- Cập nhật URLs trong các file này khi thay đổi domain
- Kiểm tra lại sitemap.xml khi có thay đổi routes
- Robots.txt có thể cần điều chỉnh theo yêu cầu SEO
