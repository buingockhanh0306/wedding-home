<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function scrollTo(id) {
  menuOpen.value = false
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled, 'header--open': menuOpen }">
    <div class="header__inner">
      <RouterLink to="/" class="header__logo" @click="menuOpen = false">
        <span class="header__logo-mark">W</span>
        <span class="header__logo-text">Wedding</span>
      </RouterLink>

      <nav class="header__nav" :class="{ 'header__nav--open': menuOpen }">
        <button type="button" @click="scrollTo('#hero')">Trang chủ</button>
        <button type="button" @click="scrollTo('#templates')">Mẫu thiệp</button>
        <button type="button" @click="scrollTo('#contact')">Liên hệ</button>
      </nav>

      <div class="header__actions">
        <button type="button" class="header__cta" @click="scrollTo('#templates')">
          Chọn mẫu
          <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          class="header__menu"
          :aria-expanded="menuOpen"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition:
    background 0.35s ease,
    box-shadow 0.35s ease,
    backdrop-filter 0.35s ease;
}

.header--scrolled,
.header--open {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  box-shadow: 0 4px 24px rgba(26, 16, 32, 0.06);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 20px;
}

.header__logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.header__logo-mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ec4899, #be185d);
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
  animation: logoPop 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) both;
}

@keyframes logoPop {
  from { transform: scale(0.6); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.header__logo-text {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1020;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.header__nav button {
  border: 0;
  background: transparent;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a3040;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.header__nav button:hover {
  background: rgba(236, 72, 153, 0.1);
  color: #be185d;
  transform: translateY(-1px);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: 999px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(190, 24, 93, 0.28);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.header__cta:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 32px rgba(190, 24, 93, 0.35);
}

.header__menu {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 12px;
  background: rgba(236, 72, 153, 0.1);
  padding: 0;
}

.header__menu span {
  display: block;
  width: 18px;
  height: 2px;
  margin: 0 auto;
  background: #be185d;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.header--open .header__menu span:first-child {
  transform: translateY(4px) rotate(45deg);
}

.header--open .header__menu span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

@media (max-width: 768px) {
  .header__nav {
    position: fixed;
    top: 64px;
    left: 16px;
    right: 16px;
    flex-direction: column;
    align-items: stretch;
    padding: 10px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    box-shadow: 0 20px 60px rgba(26, 16, 32, 0.14);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-12px) scale(0.98);
    transition:
      opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .header__nav--open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0) scale(1);
  }

  .header__nav button {
    text-align: left;
    padding: 14px 16px;
    font-size: 1rem;
  }

  .header__menu {
    display: flex;
  }

  .header__cta {
    display: none;
  }
}
</style>
