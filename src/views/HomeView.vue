<script setup>
import { ref } from 'vue'
import { demos } from '@/data/demos'

const previewFailed = ref({})

const cardThemes = [
  { emoji: '💍', gradient: 'linear-gradient(135deg, #ffe4ec 0%, #ffc2d4 100%)', accent: '#e11d74' },
  { emoji: '🌸', gradient: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)', accent: '#db2777' },
  { emoji: '✨', gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)', accent: '#be185d' },
  { emoji: '💕', gradient: 'linear-gradient(135deg, #fff1f2 0%, #fda4af 100%)', accent: '#f43f5e' },
  { emoji: '🥂', gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', accent: '#d97706' },
  { emoji: '🤍', gradient: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)', accent: '#9333ea' },
  { emoji: '📸', gradient: 'linear-gradient(135deg, #ecfeff 0%, #a5f3fc 100%)', accent: '#0891b2' },
  { emoji: '🎀', gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)', accent: '#ea580c' },
  { emoji: '💐', gradient: 'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)', accent: '#16a34a' },
  { emoji: '🎉', gradient: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%)', accent: '#2563eb' },
]

function themeFor(index) {
  return cardThemes[index % cardThemes.length]
}

function hasPreview(demo) {
  return demo.preview && !previewFailed.value[demo.id]
}

function onPreviewError(id) {
  previewFailed.value = { ...previewFailed.value, [id]: true }
}
</script>

<template>
  <div class="home">
    <div class="home__bg" aria-hidden="true">
      <span class="home__orb home__orb--1" />
      <span class="home__orb home__orb--2" />
      <span class="home__orb home__orb--3" />
      <span
        v-for="n in 8"
        :key="n"
        class="home__heart"
        :style="{ '--i': n }"
      >♥</span>
    </div>

    <header class="home__hero">
      <div class="home__pill">
        <span class="home__pill-dot" />
        Save the Date · Wedding Collection
      </div>

      <h1 class="home__title">
        Thiệp cưới online
        <span class="home__title-accent">cho Gen yêu thích sự tinh tế</span>
      </h1>

      <p class="home__subtitle">
        Chọn mẫu thiệp vừa ý — hiện đại, dễ xem trên điện thoại, sẵn sàng gửi
        cho bạn bè &amp; người thân chỉ với một đường link.
      </p>

      <div class="home__stats">
        <div class="home__stat">
          <strong>{{ demos.length }}</strong>
          <span>mẫu thiệp</span>
        </div>
        <div class="home__stat-divider" />
        <div class="home__stat">
          <strong>100%</strong>
          <span>mobile friendly</span>
        </div>
        <div class="home__stat-divider" />
        <div class="home__stat">
          <strong>1 click</strong>
          <span>xem thử ngay</span>
        </div>
      </div>
    </header>

    <main class="home__main">
      <div class="home__section-head">
        <h2>Bộ sưu tập mẫu</h2>
        <p>Tap vào mẫu yêu thích để xem full preview</p>
      </div>

      <ul class="demo-grid">
        <li
          v-for="(demo, index) in demos"
          :key="demo.id"
          class="demo-card"
        >
          <RouterLink
            :to="`/demo/${demo.id}`"
            class="demo-card__link"
            :style="{ '--accent': themeFor(index).accent }"
          >
            <div
              class="demo-card__cover"
              :class="{ 'demo-card__cover--fallback': !hasPreview(demo) }"
              :style="{ background: themeFor(index).gradient }"
            >
              <img
                v-if="hasPreview(demo)"
                :src="demo.preview"
                :alt="`Xem trước ${demo.title}`"
                class="demo-card__preview"
                loading="lazy"
                @error="onPreviewError(demo.id)"
              />
              <div class="demo-card__cover-overlay" aria-hidden="true" />
              <span v-if="!hasPreview(demo)" class="demo-card__emoji">{{ themeFor(index).emoji }}</span>
              <span class="demo-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span v-if="hasPreview(demo)" class="demo-card__preview-tag">Preview</span>
            </div>

            <div class="demo-card__body">
              <span class="demo-card__badge">{{ demo.id }}</span>
              <h3 class="demo-card__title">{{ demo.title }}</h3>
              <p class="demo-card__desc">{{ demo.description }}</p>
              <span class="demo-card__cta">
                Xem mẫu
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </main>

    <footer class="home__footer">
      <p>Made with ♥ for your big day</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
  --ink: #2a1020;
  --muted: #7a5568;
  --surface: rgba(255, 255, 255, 0.72);
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(165deg, #fff9fb 0%, #fff0f5 38%, #fdf4ff 100%);
}

.home__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.home__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.55;
}

.home__orb--1 {
  width: 420px;
  height: 420px;
  top: -120px;
  right: -80px;
  background: #fda4af;
}

.home__orb--2 {
  width: 360px;
  height: 360px;
  top: 28%;
  left: -120px;
  background: #f9a8d4;
}

.home__orb--3 {
  width: 280px;
  height: 280px;
  bottom: 8%;
  right: 12%;
  background: #c4b5fd;
}

.home__heart {
  position: absolute;
  font-size: calc(12px + var(--i) * 2px);
  color: rgba(225, 29, 116, 0.12);
  animation: float 6s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.7s);
  left: calc(var(--i) * 11%);
  top: calc(12% + (var(--i) * 7%));
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(-8deg);
  }
  50% {
    transform: translateY(-16px) rotate(8deg);
  }
}

.home__hero,
.home__main,
.home__footer {
  position: relative;
  z-index: 1;
}

.home__hero {
  text-align: center;
  padding: 48px 20px 28px;
  max-width: 820px;
  margin: 0 auto;
}

.home__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(225, 29, 116, 0.08);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #be185d;
  backdrop-filter: blur(12px);
}

.home__pill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f43f5e;
  box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.2);
  animation: pulse 2s ease infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

.home__title {
  margin: 24px 0 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.6rem, 7vw, 4.2rem);
  font-weight: 600;
  line-height: 1.08;
  color: var(--ink);
}

.home__title-accent {
  display: block;
  margin-top: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 600;
  font-style: normal;
  letter-spacing: -0.02em;
  color: #db2777;
}

.home__subtitle {
  max-width: 560px;
  margin: 18px auto 0;
  font-size: 1.02rem;
  line-height: 1.75;
  color: var(--muted);
}

.home__stats {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 28px;
  padding: 16px 24px;
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 40px rgba(42, 16, 32, 0.06);
  backdrop-filter: blur(14px);
}

.home__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.home__stat strong {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
}

.home__stat span {
  font-size: 0.78rem;
  color: var(--muted);
}

.home__stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(122, 85, 104, 0.18);
}

.home__main {
  flex: 1;
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 12px 20px 56px;
}

.home__section-head {
  margin-bottom: 24px;
}

.home__section-head h2 {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.85rem;
  color: var(--ink);
}

.home__section-head p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.demo-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 22px;
}

.demo-card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    0 4px 6px rgba(42, 16, 32, 0.02),
    0 18px 48px rgba(225, 29, 116, 0.08);
  text-decoration: none;
  transition:
    transform 0.28s cubic-bezier(0.34, 1.4, 0.64, 1),
    box-shadow 0.28s ease;
  backdrop-filter: blur(10px);
}

.demo-card__link:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow:
    0 8px 12px rgba(42, 16, 32, 0.04),
    0 28px 60px rgba(225, 29, 116, 0.14);
}

.demo-card__cover {
  position: relative;
  height: 188px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.demo-card__cover--fallback {
  background-blend-mode: normal;
}

.demo-card__preview {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.demo-card__link:hover .demo-card__preview {
  transform: scale(1.07);
}

.demo-card__cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(42, 16, 32, 0.08) 0%,
    rgba(42, 16, 32, 0.02) 45%,
    rgba(42, 16, 32, 0.45) 100%
  );
  pointer-events: none;
}

.demo-card__preview-tag {
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.demo-card__emoji {
  font-size: 2.8rem;
  filter: drop-shadow(0 8px 16px rgba(255, 255, 255, 0.6));
  transition: transform 0.28s ease;
}

.demo-card__link:hover .demo-card__emoji {
  transform: scale(1.12) rotate(-6deg);
}

.demo-card__number {
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 1;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.demo-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 20px 22px;
}

.demo-card__badge {
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 12%, white);
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.demo-card__title {
  margin: 12px 0 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
}

.demo-card__desc {
  flex: 1;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--muted);
}

.demo-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(122, 85, 104, 0.1);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--accent);
  transition: gap 0.2s ease;
}

.demo-card__link:hover .demo-card__cta {
  gap: 10px;
}

.home__footer {
  text-align: center;
  padding: 24px 20px 32px;
  color: #a07085;
  font-size: 0.88rem;
}

.home__footer p {
  margin: 0;
}

@media (max-width: 640px) {
  .home__hero {
    padding-top: 32px;
  }

  .home__stats {
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 280px;
  }

  .home__stat-divider {
    width: 48px;
    height: 1px;
  }

  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
