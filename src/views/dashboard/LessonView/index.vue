<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'
import { useUserStore } from '@/stores/user'
import VideoPlayer from './components/VideoPlayer.vue'
import LessonMeta from './components/LessonMeta.vue'
import LessonNav from './components/LessonNav.vue'
import CommentsSection from './components/CommentsSection.vue'

const route = useRoute()
const dashboardStore = useDashboardStore()
const userStore = useUserStore()

const course = computed(() => dashboardStore.courseById(route.params.courseId as string))
const lesson = computed(() =>
  dashboardStore.lessonById(route.params.courseId as string, route.params.lessonId as string),
)

const lessonIndex = computed(() => {
  if (!course.value || !lesson.value) return -1
  return course.value.lessons.findIndex((l) => l.id === lesson.value?.id)
})

const nextLesson = computed(() => {
  if (!course.value || lessonIndex.value === -1) return null
  return course.value.lessons[lessonIndex.value + 1] || null
})

const prevLesson = computed(() => {
  if (!course.value || lessonIndex.value === -1) return null
  return course.value.lessons[lessonIndex.value - 1] || null
})

function markCompleted() {
  if (course.value && lesson.value) {
    dashboardStore.completeLesson(course.value.id, lesson.value.id)
  }
}

function submitComment(text: string) {
  dashboardStore.addComment(text, userStore.fullName, userStore.profilePicture)
}
</script>

<template>
  <div v-if="course && lesson" class="lesson">
    <nav class="breadcrumbs">
      <RouterLink :to="{ name: 'courses' }" class="breadcrumbs__link">Cursos</RouterLink>
      <span class="breadcrumbs__sep">/</span>
      <RouterLink :to="{ name: 'course-detail', params: { courseId: course.id } }" class="breadcrumbs__link">{{ course.title }}</RouterLink>
      <span class="breadcrumbs__sep">/</span>
      <span class="breadcrumbs__current">{{ lesson.title }}</span>
    </nav>

    <VideoPlayer :title="lesson.title" :duration="lesson.duration" :is-completed="lesson.isCompleted" />

    <LessonMeta
      :title="lesson.title"
      :description="lesson.description"
      :is-completed="lesson.isCompleted"
      @mark-completed="markCompleted"
    />

    <LessonNav :course-id="course.id" :prev-lesson="prevLesson" :next-lesson="nextLesson" />

    <CommentsSection :comments="dashboardStore.comments" @submit="submitComment" />
  </div>

  <div v-else class="empty">
    <h1 class="empty__title">Clase no encontrada</h1>
    <RouterLink :to="{ name: 'courses' }" class="empty__link">Volver a mis cursos</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.lesson {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: $font-sans;
  font-size: 0.85rem;
  color: $lpb-muted;

  &__link {
    color: $lpb-green-deep;
    &:hover { text-decoration: underline; }
  }

  &__current { color: $lpb-black; }
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
</style>
