<script setup lang="ts">
import type { Recipe } from '@/stores/dashboard'

defineProps<{
  recipes: Recipe[]
}>()

const emit = defineEmits<{
  (e: 'select', recipe: Recipe): void
}>()

function categoryLabel(category: string) {
  const labels: Record<string, string> = { desayuno: 'Desayuno', almuerzo: 'Almuerzo', cena: 'Cena', snack: 'Snack', postre: 'Postre' }
  return labels[category] || category
}
</script>

<template>
  <section class="grid">
    <article
      v-for="recipe in recipes"
      :key="recipe.id"
      class="card"
      @click="emit('select', recipe)"
    >
      <div class="card__image">
        <img :src="recipe.image" :alt="recipe.title" />
        <span class="card__category">{{ categoryLabel(recipe.category) }}</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">{{ recipe.title }}</h3>
        <div class="card__meta">
          <span><i class="fa-regular fa-clock" /> {{ recipe.time }}</span>
          <span><i class="fa-solid fa-user" /> {{ recipe.servings }}</span>
          <span><i class="fa-solid fa-fire" /> {{ recipe.calories }} kcal</span>
        </div>
        <div class="card__macros">
          <span class="card__macro card__macro--protein">P {{ recipe.protein }}g</span>
          <span class="card__macro card__macro--carbs">C {{ recipe.carbs }}g</span>
          <span class="card__macro card__macro--fats">G {{ recipe.fats }}g</span>
        </div>
        <div class="card__tags">
          <span v-for="tag in recipe.tags" :key="tag" class="card__tag">{{ tag }}</span>
        </div>
      </div>
    </article>

    <div v-if="recipes.length === 0" class="empty">
      <p>No hay recetas en esta categoría.</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.card {
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba($lpb-black, 0.08);
  }

  &__image {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img { transform: scale(1.05); }
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
    gap: 0.75rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 1.15rem;
    font-weight: 400;
    color: $lpb-black;
    margin: 0;
  }

  &__meta {
    display: flex;
    gap: 1rem;
    font-family: $font-sans;
    font-size: 0.8rem;
    color: $lpb-muted;

    i { margin-right: 0.25rem; }
  }

  &__macros {
    display: flex;
    gap: 0.5rem;
  }

  &__macro {
    font-family: $font-mono;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
    background: $lpb-cream;
    color: $lpb-graphite;

    &--protein { background: rgba($lpb-green, 0.12); color: $lpb-green-deep; }
    &--carbs { background: rgba($alert-info, 0.12); color: $alert-info; }
    &--fats { background: rgba($lpb-amber, 0.12); color: darken($lpb-amber, 8%); }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  &__tag {
    font-family: $font-mono;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: $lpb-muted;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--border);
  }
}

.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: $lpb-muted;
  font-family: $font-sans;
  grid-column: 1 / -1;
}

@media (max-width: 1200px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
</style>
