<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '@/composables/useScrollReveal'
import nicole from '@/assets/testimonios/nicole.webp'
import mariaisabel from '@/assets/testimonios/mariaisabel.webp'
import mauro from '@/assets/testimonios/mauro.webp'

interface Testi {
  quote: string
  name: string
  role: string
  photo: string
}

const items: Testi[] = [
  {
    quote: 'Probé de todo durante años. Entré pensando que sería otro intento — y a los seis meses ya no reconocía mi cuerpo. Lo más importante: no me volví obsesiva. Aprendí a sostenerlo.',
    name: 'María Isabel',
    role: 'Empresaria · Quito',
    photo: mariaisabel,
  },
  {
    quote: 'Tengo dos hijos y un negocio. Pensé que no tenía tiempo. La diferencia fue que esto se acopló a mi vida, no al revés. Un año después, sigo comiendo igual y entrenando igual — y mi cuerpo cambió.',
    name: 'Nicole',
    role: 'Dueña de negocio · Guayaquil',
    photo: nicole,
  },
  {
    quote: 'Lo que más valoro no son los kilos. Es haberme conocido en otro nivel. Luisa empuja sin presionar, y la comunidad pesa más que cualquier rutina.',
    name: 'Mauro',
    role: 'Comunidad anual · Cuenca',
    photo: mauro,
  },
]

const root = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value || !trackEl.value) return
  const track = trackEl.value

  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 880px)', () => {
      // Use the sticky wrapper as the pin target instead of the root section
      const stickyWrapper = root.value?.querySelector('.testimonials__sticky') as HTMLElement
      
      // Calculate horizontal scroll distance
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 100)
      // Provide a reasonable scroll duration even if distance is small
      const scrollDuration = () => Math.max(distance(), window.innerHeight)

      if (stickyWrapper) {
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top top',
            end: () => `+=${scrollDuration()}`,
            pin: stickyWrapper,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }
    })

    // Force a refresh after a short delay to account for any font/image loads 
    // that might shift the starting trigger position of the pinned section.
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section class="testimonials" ref="root">
    <div class="testimonials__sticky">
      <header class="testimonials__header">
        <span class="eyebrow eyebrow--green">Historias</span>
        <h2 class="testimonials__title display-lg">
          Lo que cuentan<br />
          <span class="testimonials__title--italic">las que llegaron al final.</span>
        </h2>
      </header>

      <div class="testimonials__track" ref="trackEl">
        <article v-for="(t, i) in items" :key="i" class="testimonials__card">
          <span class="testimonials__num">{{ String(i + 1).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}</span>
          <blockquote class="testimonials__quote">
            <p>“{{ t.quote }}”</p>
          </blockquote>
          <div class="testimonials__author">
            <img :src="t.photo" :alt="t.name" class="testimonials__photo" loading="lazy" />
            <div>
              <span class="testimonials__name">{{ t.name }}</span>
              <span class="testimonials__role">{{ t.role }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.testimonials {
  position: relative;
  background: $lpb-black;
  color: $lpb-white;
  width: 100%;
  overflow-x: hidden;

  @media (min-width: 880px) {
    overflow: clip;
  }
}

.testimonials__sticky {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(2rem, 5vw, 4rem);
  padding-block: clamp(4rem, 8vw, 6rem);
  padding-inline: clamp(2.5rem, 9vw, 9rem);
}

.testimonials__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  max-width: 1100px;
  margin-inline: auto;
  width: 100%;
}

.testimonials__title {
  margin: 0;
  color: $lpb-white;
}

.testimonials__title--italic {
  font-style: italic;
  color: $lpb-green;
}

.testimonials__track {
  display: flex;
  gap: clamp(1rem, 2vw, 1.75rem);
  padding-inline: clamp(1.25rem, 4vw, 2.5rem);

  @media (max-width: 880px) {
    flex-direction: column;
    gap: 1rem;
    overflow: visible;
    padding-inline: 0;
  }

  @media (min-width: 880px) {
    will-change: transform;
  }
}

.testimonials__card {
  flex: 0 0 auto;
  background: $lpb-ink;
  border: 1px solid rgba($lpb-white, 0.08);
  border-radius: 8px;
  padding: clamp(1.75rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 880px) {
    width: 100%;
  }

  @media (min-width: 880px) {
    width: clamp(420px, 36vw, 560px);
  }
}

.testimonials__num {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: $lpb-green;
}

.testimonials__quote {
  margin: 0;
  flex: 1;

  p {
    font-family: $font-display;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    line-height: 1.35;
    color: $lpb-white;
    margin: 0;
    text-wrap: balance;
  }
}

.testimonials__author {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid rgba($lpb-white, 0.08);
  padding-top: 1rem;

  >div {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
}

.testimonials__photo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.testimonials__name {
  font-family: $font-sans;
  font-weight: 600;
  font-size: 0.95rem;
  color: $lpb-white;
}

.testimonials__role {
  font-family: $font-mono;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba($lpb-white, 0.55);
}
</style>
