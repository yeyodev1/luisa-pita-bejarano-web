<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'

const route = useRoute()
const dashboardStore = useDashboardStore()

const course = computed(() => dashboardStore.courseById(route.params.courseId as string))
</script>

<template>
  <div v-if="course" class="detail">
    <nav class="detail__breadcrumbs">
      <RouterLink :to="{ name: 'courses' }" class="detail__crumb">Cursos</RouterLink>
      <span class="detail__sep">/</span>
      <span class="detail__current">{{ course.title }}</span>
    </nav>

    <section class="hero">
      <div class="hero__thumb">
        <img :src="course.thumbnail" :alt="course.title" />
        <span class="hero__category">{{ course.category }}</span>
      </div>
      <div class="hero__body">
        <h1 class="hero__title">{{ course.title }}</h1>
        <p class="hero__subtitle">{{ course.subtitle }}</p>
        <div class="hero__meta">
          <span><i class="fa-regular fa-clock" /> {{ course.totalDuration }}</span>
          <span><i class="fa-solid fa-film" /> {{ course.lessons.length }} clases</span>
        </div>
        <div class="hero__progress">
          <div class="hero__bar"><div class="hero__fill" :style="{ width: `${course.progress}%` }" /></div>
          <span class="hero__pct">{{ course.progress }}% completado</span>
        </div>
      </div>
    </section>

    <section class="lessons">
      <h2 class="lessons__title">Clases</h2>
      <div class="lessons__list">
        <RouterLink
          v-for="(lesson, index) in course.lessons"
          :key="lesson.id"
          :to="{ name: 'lesson', params: { courseId: course.id, lessonId: lesson.id } }"
          class="lesson-row"
          :class="{ 'lesson-row--completed': lesson.isCompleted }"
        >
          <span class="lesson-row__index">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="lesson-row__body">
            <span class="lesson-row__title">{{ lesson.title }}</span>
            <span class="lesson-row__meta">{{ lesson.duration }}</span>
          </div>
          <span v-if="lesson.isCompleted" class="lesson-row__check"><i class="fa-solid fa-circle-check" /></span>
        </RouterLink>
      </div>
    </section>
  </div>

  <div v-else class="empty">
    <h1 class="empty__title">Curso no encontrado</h1>
    <RouterLink :to="{ name: 'courses' }" class="empty__link">Volver a mis cursos</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail__breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $lpb-muted;
}

.detail__crumb {
  color: $lpb-green-deep;
  &:hover { text-decoration: underline; }
}

.detail__current { color: $lpb-black; }

.hero {
  display: flex;
  gap: 1.5rem;
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;

  &__thumb {
    position: relative;
    width: 320px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__category {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background: $lpb-paper;
    color: $lpb-black;
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
  }

  &__body {
    flex: 1 1 auto;
    padding: 1.5rem 1.5rem 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    justify-content: center;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 400;
    color: $lpb-black;
    margin: 0;
  }

  &__subtitle {
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $lpb-graphite;
    margin: 0;
  }

  &__meta {
    display: flex;
    gap: 1.25rem;
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $lpb-muted;

    i { margin-right: 0.3rem; }
  }

  &__progress {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__bar {
    flex: 1 1 auto;
    max-width: 280px;
    height: 6px;
    background: rgba($lpb-black, 0.06);
    border-radius: 999px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: $lpb-green;
    border-radius: 999px;
  }

  &__pct {
    font-family: $font-mono;
    font-size: 0.7rem;
    color: $lpb-muted;
  }
}

.lessons__title {
  font-family: $font-display;
  font-size: 1.25rem;
  font-weight: 400;
  color: $lpb-black;
  margin: 0;
}

.lessons__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lesson-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: $lpb-cream;
    border-color: $lpb-green;
  }

  &--completed {
    border-color: rgba($lpb-green, 0.3);
    background: rgba($lpb-green, 0.04);
  }

  &__index {
    font-family: $font-mono;
    font-size: 0.8rem;
    font-weight: 600;
    color: $lpb-muted;
    width: 2rem;
  }

  &__body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  &__title {
    font-family: $font-sans;
    font-size: 0.95rem;
    font-weight: 600;
    color: $lpb-black;
  }

  &__meta {
    font-family: $font-sans;
    font-size: 0.8rem;
    color: $lpb-muted;
  }

  &__check {
    color: $lpb-green-deep;
    font-size: 1.1rem;
  }
}

.empty {
  text-align: center;
  padding: 4rem 1rem;

  &__title {
    font-family: $font-display;
    font-size: 1.5rem;
    color: $lpb-black;
  }

  &__link {
    display: inline-block;
    margin-top: 1rem;
    background: $lpb-green;
    color: $lpb-black;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
  }
}

@media (max-width: 720px) {
  .hero {
    flex-direction: column;

    &__thumb {
      width: 100%;
      aspect-ratio: 16 / 9;
    }

    &__body {
      padding: 0 1.25rem 1.25rem;
    }
  }
}
</style>
