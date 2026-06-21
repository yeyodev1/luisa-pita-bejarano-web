<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const weekDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

const schedule = computed(() => dashboardStore.schedule)
</script>

<template>
  <div class="schedule">
    <section class="schedule__grid">
      <div v-for="day in weekDays" :key="day" class="day-col">
        <h3 class="day-col__name">{{ day }}</h3>
        <div class="day-col__slots">
          <div
            v-for="item in schedule.filter((s) => s.day === day)"
            :key="item.id"
            class="slot"
          >
            <span class="slot__time">{{ item.time }}</span>
            <span class="slot__title">{{ item.title }}</span>
            <span class="slot__type">{{ item.type }}</span>
          </div>
          <div v-if="schedule.filter((s) => s.day === day).length === 0" class="day-col__empty">
            Sin actividades
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.schedule__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.75rem;
}

.day-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__name {
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $lpb-muted;
    text-align: center;
    margin: 0;
    padding: 0.5rem;
    background: $lpb-cream;
    border-radius: 0.5rem;
  }

  &__slots {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__empty {
    text-align: center;
    font-family: $font-sans;
    font-size: 0.8rem;
    color: $lpb-muted;
    padding: 1rem 0.5rem;
  }
}

.slot {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.75rem;
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 0.5rem;

  &__time {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    color: $lpb-green-deep;
  }

  &__title {
    font-family: $font-sans;
    font-size: 0.85rem;
    font-weight: 600;
    color: $lpb-black;
  }

  &__type {
    font-family: $font-mono;
    font-size: 0.6rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: $lpb-muted;
  }
}

@media (max-width: 1100px) {
  .schedule__grid { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 720px) {
  .schedule__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .schedule__grid { grid-template-columns: 1fr; }
}
</style>
