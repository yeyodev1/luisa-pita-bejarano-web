<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const achievements = computed(() =>
  dashboardStore.achievements.filter((a) => !a.isLocked),
)

const lockedCount = computed(() =>
  dashboardStore.achievements.filter((a) => a.isLocked).length,
)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="achievements">
    <section class="achievements__stats">
      <div class="stat-card">
        <span class="stat-card__value">{{ achievements.length }}</span>
        <span class="stat-card__label">Logros desbloqueados</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">{{ lockedCount }}</span>
        <span class="stat-card__label">Por desbloquear</span>
      </div>
    </section>

    <section class="achievements__grid">
      <div
        v-for="achievement in dashboardStore.achievements"
        :key="achievement.id"
        class="achievement-card"
        :class="{ 'achievement-card--locked': achievement.isLocked }"
      >
        <div class="achievement-card__icon">
          <i :class="achievement.isLocked ? 'fa-solid fa-lock' : 'fa-solid fa-medal'" aria-hidden="true" />
        </div>
        <div class="achievement-card__body">
          <h3 class="achievement-card__title">{{ achievement.title }}</h3>
          <p class="achievement-card__desc">{{ achievement.description }}</p>
          <span v-if="!achievement.isLocked && achievement.unlockedAt" class="achievement-card__date">
            {{ formatDate(achievement.unlockedAt) }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.achievements {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.achievements__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  &__value {
    font-family: $font-display;
    font-size: 1.75rem;
    color: $lpb-black;
  }

  &__label {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $lpb-muted;
  }
}

.achievements__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.achievement-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1rem;

  &--locked {
    opacity: 0.6;
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba($lpb-green, 0.12);
    color: $lpb-green-deep;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    flex-shrink: 0;
  }

  &--locked &__icon {
    background: rgba($lpb-black, 0.05);
    color: $lpb-muted;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.1rem;
    font-weight: 400;
    margin: 0;
    color: $lpb-black;
  }

  &__desc {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $lpb-graphite;
    margin: 0;
    line-height: 1.4;
  }

  &__date {
    font-family: $font-mono;
    font-size: 0.65rem;
    color: $lpb-muted;
    margin-top: 0.25rem;
  }
}

@media (max-width: 720px) {
  .achievements__stats {
    grid-template-columns: 1fr;
  }
}
</style>
