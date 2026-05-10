<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ManifestoSection from '@/components/home/ManifestoSection.vue'
import MethodSection from '@/components/home/MethodSection.vue'
import GallerySection from '@/components/home/GallerySection.vue'
import CommunitySection from '@/components/home/CommunitySection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import AuthoritySection from '@/components/home/AuthoritySection.vue'
import FinalCtaSection from '@/components/home/FinalCtaSection.vue'
import FaqSection from '@/components/home/FaqSection.vue'
import MarqueeText from '@/components/ui/MarqueeText.vue'

const marqueeItems = [
  'Un año contigo',
  'Sin dietas restrictivas',
  'Comunidad anual',
  'Mujeres decididas',
  'Online · Ecuador · Latam · USA · Europa',
  'Por invitación',
]
</script>

<template>
  <div class="home">
    <HeroSection />
    <MarqueeText :items="marqueeItems" theme="green" :speed="42" />
    <ManifestoSection />
    <MethodSection />
    <GallerySection />
    <CommunitySection />
    <MarqueeText :items="['No es para todas', 'Si calificas, recibes el aviso primero', 'Compromiso anual real']" theme="dark" :speed="48" />
    <TestimonialsSection />
    <AuthoritySection />
    <FinalCtaSection />
    <FaqSection />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  background: var(--bg);
}
</style>
