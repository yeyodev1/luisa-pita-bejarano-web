<script setup lang="ts">
defineProps<{
  filteredCount: number
  averageCalories: number
  totalProtein: number
  totalCarbs: number
}>()
</script>

<template>
  <section class="stats">
    <div class="stat-card">
      <span class="stat-card__value">{{ filteredCount }}</span>
      <span class="stat-card__label">Recetas disponibles</span>
    </div>
    <div class="stat-card">
      <span class="stat-card__value">{{ averageCalories }}</span>
      <span class="stat-card__label">Promedio de calorías</span>
    </div>
    <div class="stat-card">
      <span class="stat-card__value">{{ totalProtein }}g</span>
      <span class="stat-card__label">Proteína total</span>
    </div>
    <div class="stat-card">
      <span class="stat-card__value">{{ totalCarbs }}g</span>
      <span class="stat-card__label">Carbos total</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

@media (max-width: 1200px) { .stats { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 720px) { .stats { grid-template-columns: repeat(2, 1fr); } }
</style>
