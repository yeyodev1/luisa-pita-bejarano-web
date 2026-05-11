import Lenis from 'lenis'
import { onBeforeUnmount, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let instance: Lenis | null = null

export const useSmoothScroll = () => {
  onMounted(() => {
    if (instance) return
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    gsap.ticker.lagSmoothing(0)

    instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    instance.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      instance?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  })

  onBeforeUnmount(() => {
    instance?.destroy()
    instance = null
  })
}

export const getLenis = () => instance
