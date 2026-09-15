<script setup>
import { ref } from 'vue'
import { demos } from '@/data/demos'

const previewFailed = ref({})

function isPremium(index) {
  return index % 3 === 0 || index === 4 || index === 8
}

function hasPreview(demo) {
  return demo.preview && !previewFailed.value[demo.id]
}

function onPreviewError(id) {
  previewFailed.value = { ...previewFailed.value, [id]: true }
}

function cardStyle(demo) {
  return { '--accent': demo.vibe.accent }
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
        v-for="(demo, index) in demos"
        :key="demo.id"
        class="templates__item reveal-scale"
        :class="`reveal-delay-${(index % 5) + 1}`"
        :style="cardStyle(demo)"
      >
        <a :href="demo.url" class="templates__card" target="_blank" rel="noopener noreferrer">
          <div class="templates__phone">
            <div class="templates__notch" aria-hidden="true" />
            <div class="templates__screen">
              <img
                v-if="hasPreview(demo)"
                :src="demo.preview"
                :alt="demo.title"
                loading="lazy"
                @error="onPreviewError(demo.id)"
              />
              <div
                v-else
                class="templates__fallback"
                :style="{ background: demo.vibe.gradient }"
              >
                {{ demo.vibe.emoji }}
              </div>

              <span
                class="templates__tier"
                :class="isPremium(index) ? 'templates__tier--premium' : 'templates__tier--basic'"
              >
                {{ isPremium(index) ? 'PREMIUM' : 'BASIC' }}
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

.templates__screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.templates__card:hover .templates__screen img {
  transform: scale(1.08);
}

.templates__fallback {
  width: 100%;
  height: 100%;
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
