<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface LessonRef {
  id: string
  title: string
}

defineProps<{
  courseId: string
  prevLesson: LessonRef | null
  nextLesson: LessonRef | null
}>()
</script>

<template>
  <div class="nav">
    <RouterLink
      v-if="prevLesson"
      :to="{ name: 'lesson', params: { courseId, lessonId: prevLesson.id } }"
      class="nav__link nav__link--prev"
    >
      <span class="nav__label">Anterior</span>
      <span class="nav__title">{{ prevLesson.title }}</span>
    </RouterLink>
    <div v-else class="nav__spacer" />
    <RouterLink
      v-if="nextLesson"
      :to="{ name: 'lesson', params: { courseId, lessonId: nextLesson.id } }"
      class="nav__link nav__link--next"
    >
      <span class="nav__label">Siguiente</span>
      <span class="nav__title">{{ nextLesson.title }}</span>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  &__link {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    background: $lpb-white;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    transition: background 0.2s ease;

    &:hover { background: $lpb-cream; }

    &--next {
      text-align: right;
      align-items: flex-end;
    }
  }

  &__label {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $lpb-muted;
  }

  &__title {
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 600;
    color: $lpb-black;
  }
}

@media (max-width: 720px) {
  .nav { grid-template-columns: 1fr; }

  &__spacer { display: none; }
}
</style>
