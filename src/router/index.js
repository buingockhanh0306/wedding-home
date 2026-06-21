import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DemoView from '@/views/DemoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/demo/:id',
      name: 'demo',
      component: DemoView,
      props: true,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
