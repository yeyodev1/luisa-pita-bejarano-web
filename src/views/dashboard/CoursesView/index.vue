<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const courses = computed(() => dashboardStore.courses)
</script>

<template>
  <div class="courses">
    <section class="courses__grid">
      <RouterLink
        v-for="course in courses"
        :key="course.id"
        :to="{ name: 'course-detail', params: { courseId: course.id } }"
        class="course-card"
      >
        <div class="course-card__thumb">
          <img :src="course.thumbnail" :alt="course.title" />
          <span class="course-card__category">{{ course.category }}</span>
        </div>
        <div class="course-card__body">
          <h2 class="course-card__title">{{ course.title }}</h2>
          <p class="course-card__subtitle">{{ course.subtitle }}</p>
          <div class="course-card__meta">
            <span><i class="fa-regular fa-clock" /> {{ course.totalDuration }}</span>
            <span><i class="fa-solid fa-film" /> {{ course.lessons.length }} clases</span>
          </div>
          <div class="course-card__progress">
            <div class="course-card__bar"><div class="course-card__fill" :style="{ width: `${course.progress}%` }" /></div>
            <span class="course-card__pct">{{ course.progress }}%</span>
          </div>
        </div>
      </RouterLink>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.courses__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.course-card {
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba($lpb-black, 0.08);
  }

  &__thumb {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;

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
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.2rem;
    font-weight: 400;
    color: $lpb-black;
    margin: 0;
  }

  &__subtitle {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $lpb-muted;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__meta {
    display: flex;
    gap: 1rem;
    font-family: $font-sans;
    font-size: 0.8rem;
    color: $lpb-muted;

    i { margin-right: 0.3rem; }
  }

  &__progress {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.25rem;
  }

  &__bar {
    flex: 1 1 auto;
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

@media (max-width: 1200px) {
  .courses__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 720px) {
  .courses__grid { grid-template-columns: 1fr; }
}
</style>
