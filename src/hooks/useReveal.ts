import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const observeAll = () => {
      const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
      if (!nodes.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )

      nodes.forEach((node, i) => {
        node.style.setProperty('--reveal-delay', `${Math.min(i % 6, 5) * 60}ms`)
        observer.observe(node)
      })

      return observer
    }

    const observer = observeAll()
    return () => observer?.disconnect()
  }, [])
}
