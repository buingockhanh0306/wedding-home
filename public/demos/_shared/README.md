# Ảnh & cấu hình dùng chung

Thư mục này là nguồn duy nhất cho mọi demo (`demo1` … `demo10`).

```
_shared/
├── images/          ← tất cả ảnh (header, gallery, slide, …)
└── js/
    └── replaceText.js   ← cấu hình text/ảnh cho demo3–10
```

## Đường dẫn trong demo

| Demo | Ví dụ |
|------|--------|
| demo1 | `../_shared/images/header-bg.jpg` |
| demo2 | `../../../_shared/images/slider/slide-1.jpg` |
| demo3–10 | `../_shared/images/…` (qua `replaceText.js`) |

URL khi chạy app: `/demos/_shared/images/…`

## Lưu ý

- `npm run copy-demos` **không** ghi đè thư mục này — chỉ refresh `demo1` … `demo10`.
- Chỉnh nội dung thiệp demo3–10: sửa `js/replaceText.js`.
- Thêm/sửa ảnh: đặt file trong `images/`.
