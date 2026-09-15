import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(rootSelector = '.reveal') {
  let observer

  onMounted(() => {
    requestAnimationFrame(() => {
      const elements = document.querySelectorAll(`${rootSelector}, .reveal-scale`)
      if (!elements.length) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
      )

      elements.forEach((el) => observer.observe(el))
    })
  })

  onUnmounted(() => observer?.disconnect())
}
