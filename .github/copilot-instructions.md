# Hướng dẫn Copilot cho dự án web "Tủ lạnh nhà bạn hôm nay"

## 1. Ngữ cảnh chung
- Đây là một ứng dụng web frontend sử dụng **Vite**, **Vue 3 (Composition API)** và **Tailwind CSS**.
- Mục tiêu sản phẩm: giúp người dùng chọn 3–5 nguyên liệu và gợi ý **1 món duy nhất phù hợp** để nấu ngay, giảm lãng phí thực phẩm.
- Ứng dụng sẽ mở rộng để kết nối với **backend thật** (API) để lấy data, lưu công thức và người dùng.
- Đảm bảo: **theme/color system** có thể đổi được mà không sửa logic, không thủ công chỉnh màu (không hardcode style).
- Giao diện phải đồng nhất, trực quan và **hiện đại**, khác với web công thức nấu ăn thông thường.

## 2. Kiến trúc & best practices
- Tách biệt rõ ràng:
  - `src/router/index.js` hoặc `src/router/index.ts` cho định nghĩa router.
  - `src/views/` chứa các trang chính (`Home.vue`, `Recipe.vue`, `Community.vue`, `Impact.vue`).
  - `src/components/` chứa các UI component dùng chung.
  - `src/layouts/` nếu có layout wrap các trang.
  - `src/assets/` chứa image hoặc icon.
  - `src/styles/` chứa Tailwind `theme` config (không hardcode style trong component).
- Tailwind config nên được tổ chức để ưu tiên đổi theme:
  - Sử dụng Tailwind **CSS variables** cho màu sắc chính.
  - Định nghĩa kiểu theme trong `tailwind.config.js` để dễ chuyển màu.
- Khi cần UI component:
  - Viết component reusable + props rõ ràng.
  - Dùng Tailwind utility classes, hạn chế CSS inline.

## 3. Tối ưu SEO & accessibility
- Tất cả page phải có `<meta>` rõ ràng:
  - `title`, `description`, `og:` tags
  - Chú trọng nội dung cho **SEO**
- Đảm bảo mọi ảnh đều có `alt` text.
- Dùng semantic HTML (`<main>`, `<header>`, `<section>`).

## 4. UX & nội dung
- CTA nổi bật, văn bản rõ ràng bằng tiếng Việt.
- Tránh hardcode giao diện phụ thuộc vào dữ liệu tĩnh.
- Tích hợp loading skeleton component khi async call API.
- Các trang chính:
  - `/`: Form chọn nguyên liệu.
  - `/recipe/:id`: Công thức món gợi ý.
  - `/community`: Danh sách / chia sẻ công thức cộng đồng.
  - `/impact`: Số liệu thống kê giảm lãng phí (fake stats nếu chưa backend).

## 5. Linter, format & conventions
- Tuân theo ESLint + Prettier.
- Tên file Vue PascalCase; các composable dùng `use*`.
- Tên class utility Tailwind rõ ràng, dùng helpers nếu cần.

## 6. Cách Copilot nên phản hồi
- Viết code đầy đủ (không thiếu import/props).
- Mã front-end phải **tách biệt logic & UI**.
- Với UI output, Copilot sinh ra với Tailwind classes chuẩn.
- Khi hỗ trợ SEO, Copilot cung cấp cấu trúc `<head>` phù hợp.
- Khi đề cập backend API, Copilot phải dùng placeholder và chú thích rõ cần đổi khi backend thật sẵn sàng.

## 7. Trả lời bằng tiếng Việt
- Mọi gợi ý mã, giải thích, bình luận code đều phải bằng tiếng Việt.
