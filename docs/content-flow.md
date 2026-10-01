# Luồng nội dung website HCM202

`docs/web-content.md` là nguồn nội dung duy nhất của website. Khi sửa nội dung, hãy sửa file nguồn đó và giữ nguyên các tiêu đề đánh dấu bên dưới để website có thể tự chia nội dung vào đúng chuyên đề.

## Trang chính

| Chặng | Nội dung lấy từ `web-content.md` |
| --- | --- |
| 01A | Tên chương và chủ đề “người cầm lái” |
| 01B | I. Đặt vấn đề: hình ảnh người cầm lái |
| 02A–02D | II. Tính tất yếu của vai trò lãnh đạo |
| 03 | III. Bản chất giai cấp gắn với tính dân tộc |
| 04 | IV. Ba vai trò lãnh đạo của Đảng |
| 05A–05F | Sáu phần tóm lược, mỗi phần dẫn tới một trang chuyên đề |
| 06A–06F | Sáu chuyên đề trong hành trình bấm **Tiếp theo** |
| 07 | VI. Vận dụng trong giai đoạn hiện nay |
| 08 | VII. Kết luận |

## Sáu trang chuyên đề

| Chuyên đề | Slug | Phạm vi nguyên văn |
| --- | --- | --- |
| 01 | `tinh-tat-yeu` | Từ tên chương đến hết mục II |
| 02 | `ban-chat-giai-cap` | Toàn bộ mục III |
| 03 | `ba-vai-tro` | Toàn bộ mục IV |
| 04 | `dao-duc-van-minh` | Từ đầu mục V đến trước “Đảng phải thường xuyên xây dựng và chỉnh đốn” |
| 05 | `xay-dung-chinh-don` | Từ “Đảng phải thường xuyên xây dựng và chỉnh đốn” đến trước “Con người là yếu tố quyết định việc thực hiện đường lối” |
| 06 | `con-nguoi-va-van-dung` | Từ “Con người là yếu tố quyết định việc thực hiện đường lối” đến hết mục VII |

Các đoạn nguyên văn được đọc và chia tại `lib/course-document.ts`. Thông tin trình bày ngắn trên trang chính được khai báo tại `lib/topics.ts` và phải dùng câu chữ có trong `docs/web-content.md`.

## Cách cập nhật

1. Sửa nội dung trong `docs/web-content.md`.
2. Giữ nguyên sáu tiêu đề dùng làm mốc trong `lib/course-document.ts`.
3. Nếu đổi tiêu đề mốc, cập nhật chuỗi tương ứng trong `lib/course-document.ts`; ứng dụng sẽ báo lỗi rõ ràng khi không tìm thấy mốc.
4. Chạy `npm run typecheck`, `npm run lint` và `npm run build`.
