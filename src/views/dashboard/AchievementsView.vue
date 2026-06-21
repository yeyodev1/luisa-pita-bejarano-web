<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const unlocked = computed(() => dashboardStore.achievements.filter((a) => !a.isLocked))
const locked = computed(() => dashboardStore.achievements.filter((a) => a.isLocked))

function formatDate(iso: string | null) {
  if (!iso) return ''
  const date = new Date(iso)
  return date.toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="achievements-view">
    <header class="summary-card">
      <div class="summary-card__text">
        <span class="summary-card__eyebrow">Tu camino</span>
        <p class="summary-card__description">
          {{ unlocked.length }} de {{ dashboardStore.achievements.length }} desbloqueados.
          Cada logro representa un compromiso real contigo.
        </p>
      </div>
      <div class="summary-card__stat">
        <span class="summary-card__stat-value">{{ Math.round((unlocked.length / dashboardStore.achievements.length) * 100) }}%</span>
        <span class="summary-card__stat-label">Completado</span>
      </div>
    </header>

    <section v-if="unlocked.length" class="achievements-section">
      <h2 class="achievements-section__title">
        <i class="fa-solid fa-medal" aria-hidden="true" />
        Desbloqueados
      </h2>
      <div class="achievements-grid">
        <div
          v-for="achievement in unlocked"
          :key="achievement.id"
          class="achievement-card achievement-card--unlocked"
        >
          <div class="achievement-card__ring">
            <i :class="achievement.iconClass" aria-hidden="true" />
          </div>
          <div class="achievement-card__content">
            <h3 class="achievement-card__title">{{ achievement.title }}</h3>
            <p class="achievement-card__description">{{ achievement.description }}</p>
          </div>
          <span v-if="achievement.unlockedAt" class="achievement-card__date">
            <i class="fa-regular fa-calendar" aria-hidden="true" />
            {{ formatDate(achievement.unlockedAt) }}
          </span>
        </div>
      </div>
    </section>

    <section class="achievements-section">
      <h2 class="achievements-section__title">
        <i class="fa-solid fa-lock" aria-hidden="true" />
        Por desbloquear
      </h2>
      <div class="achievements-grid">
        <div
          v-for="achievement in locked"
          :key="achievement.id"
          class="achievement-card achievement-card--locked"
        >
          <div class="achievement-card__ring">
            <i :class="achievement.iconClass" aria-hidden="true" />
          </div>
          <div class="achievement-card__content">
            <h3 class="achievement-card__title">{{ achievement.title }}</h3>
            <p class="achievement-card__description">{{ achievement.description }}</p>
          </div>
          <span class="achievement-card__hint">Próximo logro</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.achievements-view {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.summary-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 1.75rem 2rem;

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  &__eyebrow {
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: $lpb-green-dark;
  }

  &__description {
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $lpb-muted;
    margin: 0;
    max-width: 520px;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: $lpb-cream;
    border: 1px solid var(--border);
    flex-shrink: 0;
  }

  &__stat-value {
    font-family: $font-display;
    font-size: 1.75rem;
    color: $lpb-green-deep;
    line-height: 1;
  }

  &__stat-label {
    font-family: $font-mono;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $lpb-muted;
    margin-top: 0.25rem;
  }
}

.achievements-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: $font-sans;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: $lpb-graphite;
    margin: 0;

    i {
      color: $lpb-green-dark;
    }
  }
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.achievement-card {
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba($lpb-black, 0.07);
  }

  &__ring {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $lpb-cream;
    border: 1px solid var(--border);

    i {
      font-size: 1.35rem;
      color: $lpb-graphite;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.15rem;
    font-weight: 400;
    color: $lpb-black;
    margin: 0;
  }

  &__description {
    font-family: $font-sans;
    font-size: 0.85rem;
    color: $lpb-muted;
    margin: 0;
    line-height: 1.45;
  }

  &__date,
  &__hint {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    width: max-content;
  }

  &__date {
    color: $lpb-green-deep;

    i {
      color: $lpb-green-dark;
    }
  }

  &__hint {
    color: $lpb-muted;
  }

  &--unlocked {
    border-color: rgba($lpb-green, 0.25);

    .achievement-card__ring {
      background: rgba($lpb-green, 0.12);
      border-color: rgba($lpb-green, 0.25);

      i {
        color: $lpb-green-deep;
      }
    }
  }

  &--locked {
    opacity: 0.65;

    .achievement-card__ring {
      background: rgba($lpb-black, 0.03);
    }
  }
}

@media (max-width: 1200px) {
  .achievements-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 720px) {
  .summary-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .achievements-grid { grid-template-columns: 1fr; }
}
</style>
