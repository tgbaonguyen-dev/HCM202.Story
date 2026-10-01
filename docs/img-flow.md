# Luồng hình ảnh website HCM202

File này ghi vị trí ảnh, nơi khai báo và cách thay ảnh. Nội dung học thuật vẫn chỉ lấy từ `docs/web-content.md`.

## Sơ đồ vị trí ảnh

| Mã | Vị trí | Tệp hiện tại | Nơi khai báo |
| --- | --- | --- | --- |
| `IMG-01` | Lớp màu nước cố định xuyên suốt website | `public/images/motifs/lotus-watercolor-square.jpg` | `components/watercolor-lotus.tsx` |
| `IMG-02` | Mặt trống đồng chìm dưới nền | `public/images/motifs/ngoc-lu-drum.gif` | `lib/content.ts` → `drumMotif` |
| `IMG-03` | Ảnh lớn ở màn hình mở đầu | `public/images/mausoleum.jpg` | `lib/content.ts` → `mausoleum` |
| `IMG-04` | Chân dung ở phần III | `public/images/portrait.jpg` | `lib/content.ts` → `portrait` |
| `IMG-05` | Chuyên đề `tinh-tat-yeu` | `public/images/stilt-house.jpg` | `lib/topics.ts` |
| `IMG-06` | Chuyên đề `ban-chat-giai-cap` | `public/images/portrait.jpg` | `lib/topics.ts` |
| `IMG-07` | Chuyên đề `ba-vai-tro` | `public/images/museum.jpg` | `lib/topics.ts` |
| `IMG-08` | Chuyên đề `dao-duc-van-minh` | `public/images/portrait.jpg` | `lib/topics.ts` |
| `IMG-09` | Chuyên đề `xay-dung-chinh-don` | `public/images/museum-interior.jpg` | `lib/topics.ts` |
| `IMG-10` | Chuyên đề `con-nguoi-va-van-dung` | `public/images/stilt-house.jpg` | `lib/topics.ts` |
| `IMG-11` | Họa tiết rồng ở trang chính và trang chuyên đề | `public/images/motifs/vietnamese-dragon.svg` | `lib/content.ts` → `dragonMotif` |

Ảnh của mỗi chuyên đề xuất hiện ở chặng 06A–06F trên trang chính và ở đầu trang chi tiết tương ứng.

## Cách thay ảnh chuyên đề

1. Chép ảnh mới vào `public/images/`.
2. Khai báo ảnh trong `lib/content.ts` với đủ `src`, `alt`, `source`, `author`, `license`, `licenseUrl`, `width` và `height`.
3. Import ảnh trong `lib/topics.ts` và gán vào trường `image` của chuyên đề.
4. Chạy lại website để kiểm tra khung cắt và phần ghi nguồn.

Ví dụ:

```ts
export const topicImage: ArchiveImage = {
  src: '/images/topic-image.jpg',
  alt: 'Mô tả chính xác nội dung ảnh',
  source: 'https://duong-dan-den-nguon-anh',
  author: 'Tên tác giả',
  license: 'Tên giấy phép',
  licenseUrl: 'https://duong-dan-den-giay-phep',
  width: 1600,
  height: 1200,
};
```

## Cách thay ảnh nền màu nước

- Giữ tên tệp: thay trực tiếp `public/images/motifs/lotus-watercolor-square.jpg`.
- Dùng tên mới: chép tệp vào `public/images/motifs/`, rồi sửa thuộc tính `src` trong `components/watercolor-lotus.tsx`.

Ảnh nền nên sáng, ít chi tiết ở vùng giữa và đủ lớn để không vỡ trên màn hình rộng.

## Mẫu thông tin cho ảnh mới

```text
Mã vị trí: IMG-xx
Tên ảnh:
Tệp ảnh:
Mô tả ảnh:
Nguồn:
Tác giả:
Giấy phép:
URL giấy phép:
Ghi chú cắt ảnh:
```
