# Tổng quan dự án
Đây là repository frontend cho ứng dụng web có tên “Tủ lạnh nhà bạn hôm nay”.
Ứng dụng được xây dựng bằng Vite, Vue 3 (Composition API) và Tailwind CSS.

Mục tiêu sản phẩm là cho phép người dùng chọn 3–5 nguyên liệu và hệ thống sẽ gợi ý đúng 1 món ăn phù hợp để nấu ngay, nhằm giảm lãng phí thực phẩm.
Copilot phải sinh mã phù hợp với kiến trúc, UX và tiêu chuẩn kỹ thuật của dự án này.

# Kiến trúc & cấu trúc thư mục
- `src/router/index.js` hoặc `src/router/index.ts`: định nghĩa router.
- `src/views/`: các trang chính (Home.vue, Recipe.vue, Community.vue, Impact.vue).
- `src/components/`: các UI component dùng chung, có thể tái sử dụng.
- `src/layouts/`: layout bao cho các trang (nếu có).
- `src/assets/`: hình ảnh, icon tĩnh.
- `src/styles/`: cấu hình Tailwind, CSS variables và hệ thống theme.
- Không hardcode style hoặc màu sắc trực tiếp trong component.

# Hệ thống màu sắc & theme (BẮT BUỘC)
- Luôn sử dụng hệ theme dựa trên CSS variables, được ánh xạ trong Tailwind config:
  - `--color-primary`
  - `--color-secondary`
  - `--color-accent`
  - `--color-bg`
- Tuân thủ nghiêm ngặt quy tắc phân bổ màu:
  - 60%: màu phụ (secondary) – dùng cho background, layout, section lớn.
  - 30%: màu chính (primary) – dùng cho nội dung chính, card, tiêu đề.
  - 10%: màu nhấn (accent) – chỉ dùng cho CTA, button chính, highlight, trạng thái active.
- Màu nền tổng thể (background/body) luôn phải là màu sáng.
- Copilot không được:
  - Hardcode màu bằng hex, rgb, hsl trong component.
  - Phá vỡ tỷ lệ 60–30–10 khi tạo UI mới.

# Quy chuẩn code & best practices
- Tuân thủ ESLint và Prettier.
- Tên file Vue dùng PascalCase.
- Composable phải bắt đầu bằng `use*`.
- Tách biệt rõ logic và UI.
- Component dùng lại phải có props và emits rõ ràng.
- Ưu tiên Tailwind utility classes, hạn chế CSS custom.

# SEO & Accessibility
- Mỗi trang phải có đầy đủ thẻ meta trong `<head>`:
  - title
  - description
  - og:title
  - og:description
- Nội dung hướng tới SEO, dùng tiếng Việt tự nhiên.
- Mọi hình ảnh đều phải có `alt`.
- Sử dụng semantic HTML: `<main>`, `<header>`, `<section>`, `<footer>`.

# UX & hành vi giao diện
- CTA rõ ràng, dễ hiểu, sử dụng màu accent.
- Không hardcode UI phụ thuộc dữ liệu tĩnh.
- Khi gọi API async phải có loading skeleton.
- Các route chính:
  - `/`: chọn nguyên liệu
  - `/recipe/:id`: công thức được gợi ý
  - `/community`: công thức cộng đồng
  - `/impact`: thống kê giảm lãng phí (có thể dùng fake data)

# Tích hợp backend
- Khi viết code liên quan backend, sử dụng API placeholder.
- Ghi chú rõ ràng cần thay thế khi backend thật sẵn sàng.
- Không giả định backend đã tồn tại.

# Tailwind & cấu hình theme
- Tailwind config phải hỗ trợ đổi theme mà không sửa component.
- Mọi màu sắc phải đi qua CSS variables.

# Ngôn ngữ phản hồi
- Tất cả comment code, giải thích, hướng dẫn, nội dung UI phải viết bằng tiếng Việt.

# Kỳ vọng hành vi của Copilot
- Sinh code đầy đủ, không thiếu import, props hoặc logic cần thiết.
- Không sinh code mẫu sơ sài hoặc thiếu ngữ cảnh.
- Luôn tuân thủ kiến trúc, hệ màu và quy ước của repository này.
