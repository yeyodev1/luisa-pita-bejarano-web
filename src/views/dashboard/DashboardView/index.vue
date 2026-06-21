<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import StatCards from './components/StatCards.vue'
import LiveBanner from './components/LiveBanner.vue'
import RecentCourses from './components/RecentCourses.vue'
import AchievementBadges from './components/AchievementBadges.vue'

const dashboardStore = useDashboardStore()

const subscriptionStatusLabel = computed(() => {
  switch (dashboardStore.subscription.status) {
    case 'active': return 'Activa'
    case 'pending': return 'Pendiente'
    default: return 'Inactiva'
  }
})

const expiresAtLabel = computed(() => {
  if (!dashboardStore.subscription.expiresAt) return 'Sin fecha'
  const date = new Date(dashboardStore.subscription.expiresAt)
  return date.toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
})
</script>

<template>
  <div class="dashboard">
    <StatCards
      :total-progress="dashboardStore.totalProgress"
      :course-count="dashboardStore.courses.length"
      :achievement-count="dashboardStore.completedAchievements.length"
      :status="dashboardStore.subscription.status"
      :expires-at-label="expiresAtLabel"
      :status-label="subscriptionStatusLabel"
    />

    <LiveBanner
      v-if="dashboardStore.nextLiveClass"
      :title="dashboardStore.nextLiveClass.title"
      :coach="dashboardStore.nextLiveClass.coach"
      :date="dashboardStore.nextLiveClass.date"
      :time="dashboardStore.nextLiveClass.time"
      :duration="dashboardStore.nextLiveClass.duration"
    />

    <RecentCourses :courses="dashboardStore.courses.slice(0, 3)" />

    <AchievementBadges :achievements="dashboardStore.achievements.slice(0, 4)" />
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 16px;
}
</style>
