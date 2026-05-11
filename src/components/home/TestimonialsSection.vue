<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/composables/useScrollReveal'
import nicole from '@/assets/testimonios/nicole.webp'
import mariaisabel from '@/assets/testimonios/mariaisabel.webp'
import mauro from '@/assets/testimonios/mauro.webp'

const items = [
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
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return

  document.body.style.overflowX = 'hidden'

  ctx = gsap.context(() => {
    gsap.from(root.value!.querySelectorAll('.testimonials__card'), {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '.testimonials__track', start: 'top 80%' },
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  document.body.style.overflowX = ''
})
</script>

<template>
  <section class="testimonials" id="historias" ref="root">
    <div class="testimonials__inner">
      <header class="testimonials__header">
        <span class="eyebrow eyebrow--green">Historias</span>
        <h2 class="testimonials__title display-lg">
          Lo que cuentan<br />
          <span class="testimonials__title--italic">las que llegaron al final.</span>
        </h2>
      </header>

      <div class="testimonials__track">
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
}

.testimonials__inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 4rem);
  padding-block: clamp(4rem, 8vw, 6rem);
  padding-inline: clamp(2.5rem, 9vw, 9rem);

  @media (min-width: 880px) {
    justify-content: center;
  }
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

  @media (min-width: 880px) {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding-bottom: 0.5rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 880px) {
    flex-direction: column;
    gap: 1rem;
    overflow: visible;
    padding-inline: 0;
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
  scroll-snap-align: start;

  @media (max-width: 880px) {
    width: 100%;
  }

  @media (min-width: 880px) {
    width: clamp(420px, 36vw, 560px);
    transition: transform 0.4s cubic-bezier(0.2, 0.7, 0, 1), border-color 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: rgba($lpb-white, 0.2);
    }
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

  > div {
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
