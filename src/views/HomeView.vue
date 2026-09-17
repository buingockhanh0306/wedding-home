<script setup>
import { provide } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import DemoCarousel from '@/components/DemoCarousel.vue'
import ContactSection from '@/components/ContactSection.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { heroBanner } from '@/data/site'

const { refresh: refreshReveal } = useScrollReveal()
provide('refreshReveal', refreshReveal)

function scrollToTemplates() {
  document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="home">
    <AppHeader />

    <!-- Banner -->
    <section id="hero" class="hero">
      <div class="hero__bg" aria-hidden="true">
        <img
          :src="heroBanner.src"
          :alt="heroBanner.alt"
          class="hero__bg-img"
          :style="{ objectPosition: heroBanner.position }"
        />
        <div class="hero__overlay" />
        <div class="hero__blobs">
          <span class="hero__blob hero__blob--1" />
          <span class="hero__blob hero__blob--2" />
          <span class="hero__blob hero__blob--3" />
        </div>
      </div>

      <div class="hero__content">
        <p class="hero__eyebrow">✨ Wedding Collection</p>
        <h1 class="hero__title">
          Make your
          <span class="hero__title-gradient">love story</span>
        </h1>
        <p class="hero__desc">
          Thiệp cưới online hiện đại — chọn mẫu, xem thử, chia sẻ một link.
          Dễ dàng trên mọi điện thoại.
        </p>
        <div class="hero__actions">
          <button type="button" class="hero__btn hero__btn--primary" @click="scrollToTemplates">
            Bắt đầu
            <span aria-hidden="true">→</span>
          </button>
          <a href="#contact" class="hero__btn hero__btn--ghost">
            Liên hệ
          </a>
        </div>
      </div>

      <div class="hero__scroll" aria-hidden="true">
        <span class="hero__scroll-line" />
      </div>
    </section>

    <DemoCarousel />
    <ContactSection />
  </div>
</template>

<style scoped>
.home {
  background: #fff;
}

/* ── Hero / Banner ── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: kenBurns 20s ease-in-out infinite alternate;
}

@keyframes kenBurns {
  from { transform: scale(1.05); }
  to { transform: scale(1.12); }
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(15, 5, 12, 0.4) 0%, rgba(15, 5, 12, 0.65) 55%, rgba(15, 5, 12, 0.92) 100%),
    linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, transparent 55%);
}

.hero__blobs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
}

.hero__blob--1 {
  width: 280px;
  height: 280px;
  top: 15%;
  right: 10%;
  background: #ec4899;
  animation: blobDrift 9s ease-in-out infinite;
}

.hero__blob--2 {
  width: 200px;
  height: 200px;
  bottom: 25%;
  left: 5%;
  background: #a78bfa;
  animation: blobDrift 11s ease-in-out infinite reverse;
}

.hero__blob--3 {
  width: 160px;
  height: 160px;
  top: 40%;
  left: 40%;
  background: #f472b6;
  animation: blobDrift 7s ease-in-out infinite 1s;
}

@keyframes blobDrift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(24px, -20px) scale(1.08); }
  66% { transform: translate(-16px, 12px) scale(0.95); }
}

.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 100px 20px 72px;
  max-width: 680px;
  animation: heroEnter 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes heroEnter {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__eyebrow {
  display: inline-block;
  margin: 0 0 20px;
  padding: 8px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255, 240, 248, 0.95);
  animation: heroEnter 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}

.hero__title {
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.4rem, 9vw, 4.5rem);
  font-weight: 700;
  line-height: 1.08;
  color: #fff;
  animation: heroEnter 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.hero__title-gradient {
  display: block;
  background: linear-gradient(135deg, #fbcfe8, #f472b6, #fff 80%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 4s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.hero__desc {
  margin: 20px auto 0;
  max-width: 480px;
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255, 240, 248, 0.78);
  animation: heroEnter 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
  animation: heroEnter 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  padding: 14px 28px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1),
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.hero__btn--primary {
  border: 0;
  background: linear-gradient(135deg, #ec4899, #be185d);
  color: #fff;
  box-shadow: 0 12px 40px rgba(190, 24, 93, 0.45);
}

.hero__btn--primary:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 18px 48px rgba(190, 24, 93, 0.55);
}

.hero__btn--primary span {
  transition: transform 0.3s ease;
}

.hero__btn--primary:hover span {
  transform: translateX(5px);
}

.hero__btn--ghost {
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  color: #fff;
}

.hero__btn--ghost:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}

.hero__scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.hero__scroll-line {
  display: block;
  width: 2px;
  height: 40px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255,255,255,0.6), transparent);
  animation: scrollPulse 2s ease infinite;
}

@keyframes scrollPulse {
  0%, 100% { transform: scaleY(0.6); opacity: 0.4; }
  50% { transform: scaleY(1); opacity: 1; }
}

@media (max-width: 768px) {
  .hero__content {
    padding: 88px 16px 64px;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero__btn {
    width: 100%;
  }

  .hero__blob--3 {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__bg-img,
  .hero__blob,
  .hero__title-gradient,
  .hero__scroll-line {
    animation: none;
  }

  .hero__content,
  .hero__eyebrow,
  .hero__title,
  .hero__desc,
  .hero__actions {
    animation: none;
  }
}
</style>
