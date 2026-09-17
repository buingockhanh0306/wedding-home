<script setup>
import { computed, inject, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { demos } from '@/data/demos'

const ITEMS_PER_PAGE = 10
const currentPage = ref(1)
const totalPages = Math.ceil(demos.length / ITEMS_PER_PAGE)

const pagedDemos = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return demos.slice(start, start + ITEMS_PER_PAGE)
})

const refreshReveal = inject('refreshReveal', () => {})

function goToPage(page) {
  if (page < 1 || page > totalPages || page === currentPage.value) return
  currentPage.value = page
  document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  nextTick(refreshReveal)
}

// Real mobile viewport the live demos are designed for. We render each
// iframe at this size, then scale the whole thing down with CSS transform
// to fit the thumbnail — cropping the iframe to its own width instead (e.g.
// width: 100%) makes these templates' layout overlap/clip at ~180px.
const VIEWPORT_WIDTH = 390
const VIEWPORT_HEIGHT = Math.round((VIEWPORT_WIDTH * 16) / 9)

const scales = reactive({})
// Plain object, not reactive: this is just an internal DOM-node cache for
// ResizeObserver bookkeeping, never read during render.
const screenEls = {}
let resizeObserver

function measure(id, el) {
  const width = el.clientWidth
  if (width > 0) scales[id] = width / VIEWPORT_WIDTH
}

function setScreenRef(el, id) {
  const prev = screenEls[id]
  if (prev && prev !== el) resizeObserver?.unobserve(prev)

  screenEls[id] = el ?? undefined
  if (el) {
    measure(id, el)
    resizeObserver?.observe(el)
  }
}

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const id = Object.keys(screenEls).find((key) => screenEls[key] === entry.target)
        if (id) measure(id, entry.target)
      }
    })
    Object.entries(screenEls).forEach(([, el]) => el && resizeObserver.observe(el))
  }
})

onUnmounted(() => resizeObserver?.disconnect())

function isPremium(demo) {
  const index = demos.indexOf(demo)
  return index % 3 === 0 || index === 4 || index === 8
}

function cardStyle(demo) {
  return { '--accent': demo.vibe.accent }
}

function iframeStyle(demo) {
  const scale = scales[demo.id] || 0.5
  return {
    width: `${VIEWPORT_WIDTH}px`,
    height: `${VIEWPORT_HEIGHT}px`,
    transform: `scale(${scale})`,
  }
}
</script>

<template>
  <section id="templates" class="templates">
    <div class="templates__head reveal">
      <span class="templates__tag">{{ demos.length }} mẫu</span>
      <h2>Mẫu thiết kế phổ biến</h2>
      <p>Chọn mẫu yêu thích và xem thử ngay</p>
    </div>

    <ul class="templates__grid reveal reveal-delay-1">
      <li
        v-for="(demo, index) in pagedDemos"
        :key="demo.id"
        class="templates__item reveal-scale"
        :class="`reveal-delay-${(index % 5) + 1}`"
        :style="cardStyle(demo)"
      >
        <a :href="demo.url" class="templates__card" target="_blank" rel="noopener noreferrer">
          <div class="templates__phone">
            <div class="templates__notch" aria-hidden="true" />
            <div class="templates__screen" :ref="(el) => setScreenRef(el, demo.id)">
              <div class="templates__fallback" :style="{ background: demo.vibe.gradient }">
                {{ demo.vibe.emoji }}
              </div>

              <iframe
                class="templates__iframe"
                :src="demo.url"
                :style="iframeStyle(demo)"
                :title="`Xem trước ${demo.title}`"
                loading="lazy"
                tabindex="-1"
                scrolling="no"
                sandbox="allow-scripts"
              />

              <span
                class="templates__tier"
                :class="isPremium(demo) ? 'templates__tier--premium' : 'templates__tier--basic'"
              >
                {{ isPremium(demo) ? 'PREMIUM' : 'BASIC' }}
              </span>

              <span class="templates__vibe">{{ demo.vibe.label }}</span>
            </div>
          </div>

          <div class="templates__meta">
            <h3>{{ demo.title }}</h3>
            <span class="templates__cta">Xem mẫu →</span>
          </div>
        </a>
      </li>
    </ul>

    <nav v-if="totalPages > 1" class="templates__pagination" aria-label="Phân trang mẫu thiệp">
      <button
        type="button"
        class="templates__page-btn templates__page-btn--nav"
        :disabled="currentPage === 1"
        aria-label="Trang trước"
        @click="goToPage(currentPage - 1)"
      >
        ←
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        class="templates__page-btn"
        :class="{ 'templates__page-btn--active': page === currentPage }"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
        type="button"
        class="templates__page-btn templates__page-btn--nav"
        :disabled="currentPage === totalPages"
        aria-label="Trang sau"
        @click="goToPage(currentPage + 1)"
      >
        →
      </button>
    </nav>
  </section>
</template>

<style scoped>
.templates {
  padding: 72px 20px 64px;
  background: #fff;
}

.templates__head {
  max-width: 1240px;
  margin: 0 auto 36px;
  text-align: center;
}

.templates__tag {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(167, 139, 250, 0.12));
  color: #be185d;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.templates__head h2 {
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.7rem, 5vw, 2.4rem);
  font-weight: 700;
  color: #1a1020;
}

.templates__head p {
  margin: 10px 0 0;
  font-size: 0.92rem;
  color: #9ca3af;
}

.templates__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.templates__card {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.templates__card:hover {
  transform: translateY(-8px);
}

.templates__card:active {
  transform: scale(0.98);
}

.templates__phone {
  position: relative;
  padding: 8px;
  border-radius: 28px;
  background: linear-gradient(160deg, #333, #111);
  box-shadow: 0 16px 40px rgba(26, 16, 32, 0.15);
}

.templates__notch {
  position: absolute;
  top: 12px;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
  width: 48px;
  height: 5px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
}

.templates__screen {
  position: relative;
  aspect-ratio: 9 / 16;
  border-radius: 22px;
  overflow: hidden;
  background: #f3f4f6;
}

.templates__iframe {
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  transform-origin: top left;
  pointer-events: none;
  background: #fff;
}

.templates__fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 2rem;
}

.templates__tier {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.templates__tier--premium {
  background: linear-gradient(135deg, #f5e6c8, #c9a227);
  color: #3d2a00;
}

.templates__tier--basic {
  background: rgba(255, 255, 255, 0.92);
  color: #64748b;
}

.templates__vibe {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
  text-align: center;
}

.templates__meta {
  padding: 12px 2px 0;
}

.templates__meta h3 {
  margin: 0 0 6px;
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.35;
  color: #1a1020;
}

.templates__cta {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent, #be185d);
}

.templates__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 1240px;
  margin: 40px auto 0;
}

.templates__page-btn {
  min-width: 44px;
  min-height: 44px;
  padding: 0 8px;
  border: 1.5px solid rgba(236, 72, 153, 0.16);
  border-radius: 14px;
  background: #fff;
  color: #4a3040;
  font-size: 0.95rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.templates__page-btn:hover:not(:disabled) {
  border-color: rgba(236, 72, 153, 0.4);
  color: #be185d;
}

.templates__page-btn--active {
  border-color: transparent;
  background: linear-gradient(135deg, #ec4899, #be185d);
  color: #fff;
  box-shadow: 0 8px 20px rgba(190, 24, 93, 0.28);
}

.templates__page-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

@media (max-width: 768px) {
  .templates {
    padding: 56px 16px 48px;
  }

  .templates__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 400px) {
  .templates__grid {
    grid-template-columns: 1fr;
    max-width: 240px;
  }
}

@media (min-width: 1024px) {
  .templates__grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
