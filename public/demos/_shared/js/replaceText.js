// ============================================================
// CẤU HÌNH THIỆP CƯỚI — Dùng chung cho demo3 … demo10
// Chỉnh sửa file này để thay đổi nội dung tất cả mẫu 3–10
// ============================================================

function getDemoId() {
  const match = window.location.pathname.match(/\/demos\/(demo\d+)\//i)
  return match ? match[1] : 'demo3'
}

/** Thư mục ảnh dùng chung (public/demos/_shared/images/) */
const IMG_BASE = "../_shared/images/"

// ======================== THÔNG TIN CHUNG ========================

const coupleLastName = "Khang & Hằng"; // example: Khang & Hằng
const dateWedding = "24 March 2023"; // example: 24 March 2023
const weddingDateISO = "2023-03-12"; // example: 2023-03-12 (YYYY-MM-DD cho đếm ngược & lịch)

const invitationText =
  "Sự hiện diện của bạn là niềm hạnh phúc đối với gia đình chúng tôi. Rất mong nhận được những lời chúc yêu thương từ bạn.";
const taglineCouple = "no matter what, if we vibe, we vibe 🔥";
const metaDescription =
  "Thiệp cưới online — hẹn gặp bạn tại ngày trọng đại của chúng mình!";

// ======================== ẢNH (đặt file trong public/demos/_shared/images/) ========================

// Slide hero
const imgSlide1 = IMG_BASE + "slide_img/slide_01.jpg";
const imgSlide2 = IMG_BASE + "slide_img/slide_02.jpg";

// Ảnh cá nhân
const imgGroom = IMG_BASE + "personal_img/chu_re.jpg";
const imgBride = IMG_BASE + "personal_img/co_dau.jpg";

// Gallery — thêm/bớt ảnh bằng cách sửa mảng này
const galleryImages = [
  IMG_BASE + "our_img/img1.jpg",
  IMG_BASE + "our_img/img2.jpg",
  IMG_BASE + "our_img/img3.jpg",
  IMG_BASE + "our_img/img4.jpg",
  IMG_BASE + "our_img/img5.jpg",
  IMG_BASE + "our_img/img6.jpg",
];

// Sự kiện
const imgEventBride = IMG_BASE + "events/nha_gai.jpg";
const imgEventGroom = IMG_BASE + "events/nha_trai.jpg";

// Footer & QR
const imgThankYou = IMG_BASE + "thank_img.jpg";
const imgQrGroom = IMG_BASE + "qr_code/chu_re.jpg";
const imgQrBride = IMG_BASE + "qr_code/co_dau.jpg";

// ======================== THÔNG TIN CHÚ RỂ ========================

const nameGroom = "Tuấn Khang"; // example: Tuấn Khang
const jobGroom = "Thợ code đến từ Vĩnh Bảo, Hải Phòng";
const phoneGroom = "0981415813";
const fbGroom = "https://www.facebook.com/Buikhanhi2k";
const addressGroom = "Hạnh Phúc, Đồng Minh, Vĩnh Bảo, Hải Phòng";
const timeWeddingGroom = "09:00 AM 12/03/2023";
const mapGroom =
  "https://www.google.com/maps/place/X%C3%B3m+Quy%E1%BA%BFt+Th%E1%BA%AFng";
const bankAccountGroom = "NGUYEN TUAN KHANG";
const bankNameGroom = "Techcombank";
const bankNumberGroom = "68 03 06 2000";

// ======================== THÔNG TIN CÔ DÂU ========================

const nameBride = "Phương Hằng"; // example: Phương Hằng
const jobBride = "Cô nhân viên văn phòng mộng mơ";
const phoneBride = "0559548068";
const fbBride = "https://www.facebook.com/Buikhanhi2k";
const addressBride = "Quyết Thắng, Đồng Minh, Vĩnh Bảo, Hải Phòng";
const timeWeddingBride = "08:30 AM 12/03/2023";
const mapBride = "https://goo.gl/maps/BVG9H29pCrRohjtM8";
const bankAccountBride = "BUI PHUONG HANG";
const bankNameBride = "Techcombank";
const bankNumberBride = "68 03 06 2000";

// ======================== NHẠC & HIỆU ỨNG ========================

const bgMusicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const bgMusicEnabled = true;
const effectType = "heart"; // "heart" | "none"

// ======================== NHÃN GIAO DIỆN (tuỳ chỉnh text UI) ========================

const labelPreloader = "Đang mở thiệp...";
const labelMusicTooltip = "Tap để nghe nhạc nền";
const labelNavCouple = "Cặp đôi";
const labelNavSaveDate = "Save the Date";
const labelNavEvents = "Sự kiện";
const labelNavGallery = "Gallery";
const labelNavDonate = "Mừng cưới";
const labelHeroBadge = "✨ We're getting married ✨";
const labelHeroCta = "Save the Date";
const labelSaveDateTag = "📅 Save the Date";
const labelSaveDateTitle = "Hẹn gặp bạn!";
const labelCountdown = "Đếm ngược ngày cưới";
const labelCountdownDay = "Ngày";
const labelCountdownHour = "Giờ";
const labelCountdownMinute = "Phút";
const labelCountdownSecond = "Giây";
const labelCountdownPrefix = "Ngày cưới:";
const labelCoupleTag = "💑 Cô dâu & Chú rể";
const labelCoupleTitle = "Our Love Story";
const labelGroomBadge = "🤵 Chú rể";
const labelBrideBadge = "👰 Cô dâu";
const labelFacebook = "Facebook";
const labelDonateBtn = "💝 Gửi lời chúc & Mừng cưới";
const labelEventsTag = "🥂 Thời gian & Địa điểm";
const labelEventsTitle = "Join Our Party";
const labelEventsDesc =
  "Till happiness steps up to greet us — welcome you to wish us all the best 🥂";
const labelEventBrideTag = "Nhà gái";
const labelEventGroomTag = "Nhà trai";
const titleEventBride = "Tiệc cưới nhà gái";
const titleEventGroom = "Tiệc cưới nhà trai";
const labelMapBtn = "📍 Xem bản đồ";
const labelGalleryTag = "📸 Memories";
const labelGalleryTitle = "Ảnh chúng mình";
const labelGalleryDesc =
  "You're not only the love of my life — you're my best friend 💫";
const labelFooterTitle = "Thank You!";
const labelFooterSub =
  "Cảm ơn bạn đã dành thời gian xem thiệp cưới của chúng mình 💕";
const labelModalTitle = "💝 Mừng cưới";
const labelModalDesc = "Gửi yêu thương đến cô dâu & chú rể qua chuyển khoản";
const labelDonateGroom = "Mừng cưới chú rể";
const labelDonateBride = "Mừng cưới cô dâu";
const labelBank = "Ngân hàng:";
const labelAccount = "Tên TK:";
const labelNumber = "Số TK:";
const labelCopyBtn = "Copy số TK";
const labelCopyDone = "Đã copy!";

// ======================== MAP TEXT PLACEHOLDER → GIÁ TRỊ THẬT ========================

const objReplace = [
  { text: "Tên chú rể", textReplace: nameGroom },
  { text: "Tên cô dâu", textReplace: nameBride },
  { text: "Tên cặp đôi ngắn", textReplace: coupleLastName },
  { text: "Tên cặp đôi dài", textReplace: nameGroom + " & " + nameBride },
  { text: "Ngày cưới", textReplace: dateWedding },
  { text: "Nghề nghiệp chú rể", textReplace: jobGroom },
  { text: "Nghề nghiệp cô dâu", textReplace: jobBride },
  { text: "Số điện thoại chú rể", textReplace: phoneGroom },
  { text: "Số điện thoại cô dâu", textReplace: phoneBride },
  { text: "facebook chú rể", textReplace: fbGroom },
  { text: "facebook cô dâu", textReplace: fbBride },
  { text: "Thời gian tổ chức nhà gái", textReplace: timeWeddingBride },
  { text: "Thời gian tổ chức nhà trai", textReplace: timeWeddingGroom },
  { text: "Địa chỉ nhà trai", textReplace: addressGroom },
  { text: "Địa chỉ nhà gái", textReplace: addressBride },
  { text: "map nhà trai", textReplace: mapGroom },
  { text: "map nhà gái", textReplace: mapBride },
  { text: "tên ngân hàng chú rể", textReplace: bankNameGroom },
  { text: "tên ngân hàng cô dâu", textReplace: bankNameBride },
  { text: "tên tài khoản chú rể", textReplace: bankAccountGroom },
  { text: "tên tài khoản cô dâu", textReplace: bankAccountBride },
  { text: "số tài khoản chú rể", textReplace: bankNumberGroom },
  { text: "số tài khoản cô dâu", textReplace: bankNumberBride },
  { text: "Lời mời cưới", textReplace: invitationText },
  { text: "Tagline cặp đôi", textReplace: taglineCouple },
  { text: "Mô tả meta", textReplace: metaDescription },
  { text: "Nhãn preloader", textReplace: labelPreloader },
  { text: "Nhãn nhạc nền", textReplace: labelMusicTooltip },
  { text: "Nhãn nav cặp đôi", textReplace: labelNavCouple },
  { text: "Nhãn nav save date", textReplace: labelNavSaveDate },
  { text: "Nhãn nav sự kiện", textReplace: labelNavEvents },
  { text: "Nhãn nav gallery", textReplace: labelNavGallery },
  { text: "Nhãn nav mừng cưới", textReplace: labelNavDonate },
  { text: "Nhãn hero badge", textReplace: labelHeroBadge },
  { text: "Nhãn hero cta", textReplace: labelHeroCta },
  { text: "Nhãn save date tag", textReplace: labelSaveDateTag },
  { text: "Nhãn save date title", textReplace: labelSaveDateTitle },
  { text: "Nhãn countdown prefix", textReplace: labelCountdownPrefix },
  { text: "Nhãn countdown", textReplace: labelCountdown },
  { text: "Nhãn ngày", textReplace: labelCountdownDay },
  { text: "Nhãn giờ", textReplace: labelCountdownHour },
  { text: "Nhãn phút", textReplace: labelCountdownMinute },
  { text: "Nhãn giây", textReplace: labelCountdownSecond },
  { text: "Nhãn couple tag", textReplace: labelCoupleTag },
  { text: "Nhãn couple title", textReplace: labelCoupleTitle },
  { text: "Nhãn groom badge", textReplace: labelGroomBadge },
  { text: "Nhãn bride badge", textReplace: labelBrideBadge },
  { text: "Nhãn facebook", textReplace: labelFacebook },
  { text: "Nhãn donate btn", textReplace: labelDonateBtn },
  { text: "Nhãn events tag", textReplace: labelEventsTag },
  { text: "Nhãn events title", textReplace: labelEventsTitle },
  { text: "Nhãn events desc", textReplace: labelEventsDesc },
  { text: "Nhãn event nhà gái", textReplace: labelEventBrideTag },
  { text: "Nhãn event nhà trai", textReplace: labelEventGroomTag },
  { text: "Tiêu đề tiệc nhà gái", textReplace: titleEventBride },
  { text: "Tiêu đề tiệc nhà trai", textReplace: titleEventGroom },
  { text: "Nhãn xem bản đồ", textReplace: labelMapBtn },
  { text: "Nhãn gallery tag", textReplace: labelGalleryTag },
  { text: "Nhãn gallery title", textReplace: labelGalleryTitle },
  { text: "Nhãn gallery desc", textReplace: labelGalleryDesc },
  { text: "Nhãn footer title", textReplace: labelFooterTitle },
  { text: "Nhãn footer sub", textReplace: labelFooterSub },
  { text: "Nhãn modal title", textReplace: labelModalTitle },
  { text: "Nhãn modal desc", textReplace: labelModalDesc },
  { text: "Nhãn mừng cưới chú rể", textReplace: labelDonateGroom },
  { text: "Nhãn mừng cưới cô dâu", textReplace: labelDonateBride },
  { text: "Nhãn ngân hàng", textReplace: labelBank },
  { text: "Nhãn tên tk", textReplace: labelAccount },
  { text: "Nhãn số tk", textReplace: labelNumber },
  { text: "Nhãn copy tk", textReplace: labelCopyBtn },
  { text: "ảnh chú rể", textReplace: imgGroom },
  { text: "ảnh cô dâu", textReplace: imgBride },
  { text: "ảnh tiệc nhà gái", textReplace: imgEventBride },
  { text: "ảnh tiệc nhà trai", textReplace: imgEventGroom },
  { text: "ảnh thank you", textReplace: imgThankYou },
  { text: "qr chú rể", textReplace: imgQrGroom },
  { text: "qr cô dâu", textReplace: imgQrBride },
];

// Cấu hình dùng bởi app.js (tự động build từ biến phía trên)
const WEDDING_CONFIG = {
  coupleShort: coupleLastName,
  groom: {
    name: nameGroom,
    job: jobGroom,
    phone: phoneGroom,
    facebook: fbGroom,
    avatar: imgGroom,
    bank: {
      name: bankNameGroom,
      account: bankAccountGroom,
      number: bankNumberGroom,
      qr: imgQrGroom,
    },
  },
  bride: {
    name: nameBride,
    job: jobBride,
    phone: phoneBride,
    facebook: fbBride,
    avatar: imgBride,
    bank: {
      name: bankNameBride,
      account: bankAccountBride,
      number: bankNumberBride,
      qr: imgQrBride,
    },
  },
  wedding: {
    date: weddingDateISO,
    dateDisplay: dateWedding,
    tagline: taglineCouple,
    invitation: invitationText,
  },
  events: {
    bride: {
      title: titleEventBride,
      time: timeWeddingBride,
      address: addressBride,
      map: mapBride,
      image: imgEventBride,
    },
    groom: {
      title: titleEventGroom,
      time: timeWeddingGroom,
      address: addressGroom,
      map: mapGroom,
      image: imgEventGroom,
    },
  },
  gallery: galleryImages,
  heroSlides: [imgSlide1, imgSlide2],
  footerImage: imgThankYou,
  music: { url: bgMusicUrl, enabled: bgMusicEnabled },
  effect: { type: effectType, icon: "♥" },
  meta: { description: metaDescription, ogImage: imgSlide1 },
  labels: {
    copyBtn: labelCopyBtn,
    copyDone: labelCopyDone,
  },
};

function replaceContent() {
  document.title = document.title.replace(
    "Tên chú rể & Tên cô dâu",
    nameGroom + " & " + nameBride
  );

  for (let i = 0; i < objReplace.length; i++) {
    document.body.innerHTML = document.body.innerHTML.replaceAll(
      objReplace[i].text,
      objReplace[i].textReplace
    );
  }

  document.querySelectorAll('a[href^="tel:"]').forEach((el) => {
    const phone = el.textContent.trim().replace(/\s/g, "");
    if (/^\d+$/.test(phone)) el.href = "tel:" + phone;
  });
}

replaceContent();
