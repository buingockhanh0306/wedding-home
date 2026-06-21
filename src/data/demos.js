export const demos = [
  {
    id: 'demo1',
    folder: 'wedding-demo1',
    title: 'Mẫu 1 — Classic',
    description: 'Thiết kế cổ điển, animation mượt, phù hợp thiệp truyền thống.',
    preview: '/demos/_shared/images/header-bg.jpg',
  },
  {
    id: 'demo2',
    folder: 'wedding_demo2',
    title: 'Mẫu 2 — Romantic',
    description: 'Phong cách lãng mạn với slider ảnh và lịch cưới.',
    preview: '/demos/_shared/images/slide_img/slide_01.jpg',
  },
  {
    id: 'demo3',
    folder: 'wedding_demo3',
    title: 'Mẫu 3 — Elegant',
    description: 'Bố cục tinh tế, typography sang trọng.',
    preview: '/demos/_shared/images/slide_img/slide_01.jpg',
  },
  {
    id: 'demo4',
    folder: 'wedding_demo4',
    title: 'Mẫu 4 — Modern',
    description: 'Thiết kế hiện đại, tối ưu mobile.',
    preview: '/demos/_shared/images/slide_img/slide_02.jpg',
  },
  {
    id: 'demo5',
    folder: 'wedding_demo5',
    title: 'Mẫu 5 — Floral',
    description: 'Họa tiết hoa, tone ấm áp cho tiệc cưới.',
    preview: '/demos/_shared/images/our_img/img1.jpg',
  },
  {
    id: 'demo6',
    folder: 'wedding_demo6',
    title: 'Mẫu 6 — Minimal',
    description: 'Tối giản, tập trung nội dung chính.',
    preview: '/demos/_shared/images/our_img/img2.jpg',
  },
  {
    id: 'demo7',
    folder: 'wedding_demo7',
    title: 'Mẫu 7 — Story',
    description: 'Kể chuyện tình yêu qua từng section.',
    preview: '/demos/_shared/images/our_img/img3.jpg',
  },
  {
    id: 'demo8',
    folder: 'wedding_demo8',
    title: 'Mẫu 8 — Gallery',
    description: 'Nhấn mạnh album ảnh cặp đôi.',
    preview: '/demos/_shared/images/our_img/img4.jpg',
  },
  {
    id: 'demo9',
    folder: 'wedding_demo9',
    title: 'Mẫu 9 — Premium',
    description: 'Layout cao cấp, hiệu ứng parallax.',
    preview: '/demos/_shared/images/our_img/img5.jpg',
  },
  {
    id: 'demo10',
    folder: 'wedding_demo10',
    title: 'Mẫu 10 — Celebration',
    description: 'Không khí lễ hội, countdown ngày cưới.',
    preview: '/demos/_shared/images/our_img/img6.jpg',
  },
]

export function getDemoById(id) {
  return demos.find((demo) => demo.id === id)
}

export function getDemoPreviewUrl(id) {
  return getDemoById(id)?.preview ?? ''
}

export function getDemoStaticUrl(id) {
  return `/demos/${id}/index.html`
}
