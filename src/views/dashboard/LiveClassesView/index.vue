<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const nextLive = computed(() => dashboardStore.nextLiveClass)

const upcomingClasses = computed(() => dashboardStore.liveClasses)
</script>

<template>
  <div class="live">
    <section v-if="nextLive" class="live__next">
      <div class="live__next-badge">Próxima clase</div>
      <h2 class="live__next-title">{{ nextLive.title }}</h2>
      <p class="live__next-meta">{{ nextLive.coach }} · {{ nextLive.date }} a las {{ nextLive.time }} · {{ nextLive.duration }}</p>
      <button class="live__next-cta" type="button">Recordar</button>
    </section>

    <section class="live__list">
      <h3 class="live__list-title">Próximas clases</h3>
      <div class="live__cards">
        <div v-for="item in upcomingClasses" :key="item.id" class="live-card">
          <div class="live-card__header">
            <h4 class="live-card__title">{{ item.title }}</h4>
            <span class="live-card__badge">{{ item.type }}</span>
          </div>
          <p class="live-card__meta">{{ item.coach }} · {{ item.date }} a las {{ item.time }} · {{ item.duration }}</p>
          <p class="live-card__desc">{{ item.description }}</p>
        </div>
        <div v-if="upcomingClasses.length === 0" class="live__empty">
          No hay clases en vivo programadas próximamente.
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.live {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.live__next {
  background: linear-gradient(135deg, $lpb-green 0%, $lpb-green-dark 100%);
  color: $lpb-black;
  border-radius: 1rem;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.live__next-badge {
  font-family: $font-mono;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.8;
}

.live__next-title {
  font-family: $font-display;
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0;
}

.live__next-meta {
  font-family: $font-sans;
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
}

.live__next-cta {
  align-self: flex-start;
  margin-top: 0.5rem;
  background: $lpb-black;
  color: $lpb-white;
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  transition: background 0.2s ease;

  &:hover { background: $lpb-ink; }
}

.live__list-title {
  font-family: $font-display;
  font-size: 1.25rem;
  font-weight: 400;
  color: $lpb-black;
  margin: 0;
}

.live__cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.live-card {
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.1rem;
    font-weight: 400;
    margin: 0;
    color: $lpb-black;
  }

  &__badge {
    font-family: $font-mono;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    background: rgba($lpb-green, 0.1);
    color: $lpb-green-deep;
    white-space: nowrap;
  }

  &__meta {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $lpb-muted;
    margin: 0;
  }

  &__desc {
    font-family: $font-sans;
    font-size: 0.9rem;
    color: $lpb-graphite;
    margin: 0;
    line-height: 1.4;
  }
}

.live__empty {
  text-align: center;
  padding: 2rem;
  color: $lpb-muted;
  font-family: $font-sans;
}
</style>
