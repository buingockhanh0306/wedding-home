import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(rootSelector = '.reveal') {
  let observer
  let fallbackTimer

  function pendingElements() {
    return document.querySelectorAll(
      `${rootSelector}:not(.is-visible), .reveal-scale:not(.is-visible)`,
    )
  }

  function revealAll(elements) {
    elements.forEach((el) => el.classList.add('is-visible'))
  }

  // Re-scan for elements that still need revealing — used both on first
  // mount and whenever content is swapped in later (e.g. pagination), since
  // the observer only ever sees the elements that existed when it started.
  function refresh() {
    requestAnimationFrame(() => {
      const elements = pendingElements()
      if (!elements.length) return

      if (!observer) {
        revealAll(elements)
        return
      }

      elements.forEach((el) => observer.observe(el))

      // Mobile Safari throttles/coalesces IntersectionObserver callbacks during
      // momentum scrolling, so a fast flick can carry an element past the viewport
      // before its callback ever fires — leaving it stuck at opacity: 0 forever.
      // Force everything visible after a short grace period as a safety net.
      clearTimeout(fallbackTimer)
      fallbackTimer = setTimeout(() => revealAll(pendingElements()), 1500)
    })
  }

  onMounted(() => {
    if (typeof IntersectionObserver !== 'undefined') {
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
    }
    refresh()
  })

  onUnmounted(() => {
    observer?.disconnect()
    clearTimeout(fallbackTimer)
  })

  return { refresh }
}
