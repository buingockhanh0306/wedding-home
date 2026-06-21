<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getDemoById, getDemoStaticUrl } from '@/data/demos'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const demo = computed(() => getDemoById(props.id))
const iframeSrc = computed(() => (demo.value ? getDemoStaticUrl(demo.value.id) : ''))

function goHome() {
  router.push('/')
}

function openFullscreen() {
  if (!iframeSrc.value) return
  window.open(iframeSrc.value, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div v-if="demo" class="demo-view">
    <header class="demo-view__bar">
      <button type="button" class="demo-view__back" @click="goHome">
        ← Danh mục
      </button>

      <div class="demo-view__info">
        <strong>{{ demo.title }}</strong>
        <span>/demo/{{ demo.id }}</span>
      </div>

      <button type="button" class="demo-view__open" @click="openFullscreen">
        Mở toàn màn hình
      </button>
    </header>

    <iframe
      class="demo-view__frame"
      :src="iframeSrc"
      :title="demo.title"
      loading="lazy"
    />
  </div>

  <div v-else class="demo-view demo-view--missing">
    <div class="demo-view__missing-card">
      <h1>Không tìm thấy mẫu</h1>
      <p>Route <code>/demo/{{ id }}</code> chưa được cấu hình.</p>
      <button type="button" class="demo-view__back" @click="goHome">
        Về trang chủ
      </button>
    </div>
  </div>
</template>

<style scoped>
.demo-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1a1014;
}

.demo-view__bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(26, 16, 20, 0.96);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #f8e8ee;
}

.demo-view__back,
.demo-view__open {
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  font: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.demo-view__back {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.demo-view__open {
  margin-left: auto;
  background: #be185d;
  color: #fff;
}

.demo-view__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.demo-view__info strong {
  font-size: 0.98rem;
}

.demo-view__info span {
  font-size: 0.82rem;
  color: rgba(248, 232, 238, 0.72);
}

.demo-view__frame {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 57px);
  border: 0;
  background: #fff;
}

.demo-view--missing {
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.demo-view__missing-card {
  width: min(420px, 100%);
  padding: 32px;
  border-radius: 20px;
  background: #fff;
  text-align: center;
}

.demo-view__missing-card h1 {
  margin: 0 0 12px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  color: #5c1a2e;
}

.demo-view__missing-card p {
  margin: 0 0 20px;
  color: #6b4b57;
}

@media (max-width: 720px) {
  .demo-view__bar {
    flex-wrap: wrap;
  }

  .demo-view__open {
    margin-left: 0;
    width: 100%;
  }
}
</style>
