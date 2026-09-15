# Ảnh xem trước (preview) cho trang danh mục

Các demo thiệp cưới không còn được host cục bộ/nhúng iframe từ source nữa —
`src/data/demos.js` trỏ thẳng tới bản deploy thật trên Vercel (mỗi demo một
project riêng, xem trường `url` của từng demo).

Thư mục `previews/` chỉ dùng làm nguồn ảnh thumbnail cho các thẻ demo trên
trang chủ (`preview` trong `src/data/demos.js`, ví dụ
`/previews/header-bg.jpg`). Không xoá thư mục này nếu chưa thay toàn bộ ảnh
preview bằng nguồn khác.

Các script cũ (`copy-demos.js`, `patch-*.js`, `restore-shared.js`, …) dùng để
đồng bộ source demo cục bộ đã được gỡ bỏ vì không còn cần thiết.
