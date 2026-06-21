<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDashboardStore, type Recipe } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const selectedCategory = ref<Recipe['category'] | 'todas'>('todas')
const selectedRecipe = ref<Recipe | null>(null)

const categories: { value: Recipe['category'] | 'todas'; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'desayuno', label: 'Desayuno' },
  { value: 'almuerzo', label: 'Almuerzo' },
  { value: 'cena', label: 'Cena' },
  { value: 'snack', label: 'Snack' },
  { value: 'postre', label: 'Postre' },
]

const filteredRecipes = computed(() =>
  dashboardStore.recipesByCategory(selectedCategory.value),
)

const totalMacros = computed(() => {
  return filteredRecipes.value.reduce(
    (acc, recipe) => {
      acc.calories += recipe.calories
      acc.protein += recipe.protein
      acc.carbs += recipe.carbs
      acc.fats += recipe.fats
      return acc
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 },
  )
})

const averageCalories = computed(() => {
  if (filteredRecipes.value.length === 0) return 0
  return Math.round(totalMacros.value.calories / filteredRecipes.value.length)
})

function openRecipe(recipe: Recipe) {
  selectedRecipe.value = recipe
}

function closeRecipe() {
  selectedRecipe.value = null
}

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    desayuno: 'Desayuno',
    almuerzo: 'Almuerzo',
    cena: 'Cena',
    snack: 'Snack',
    postre: 'Postre',
  }
  return labels[category] || category
}
</script>

<template>
  <div class="recipes-view-wrapper">
    <div class="recipes-page">
      <div class="recipes-view">
      <section class="stats">
      <div class="stat-card">
        <span class="stat-card__value">{{ filteredRecipes.length }}</span>
        <span class="stat-card__label">Recetas disponibles</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">{{ averageCalories }}</span>
        <span class="stat-card__label">Promedio de calorías</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">{{ totalMacros.protein }}g</span>
        <span class="stat-card__label">Proteína total</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">{{ totalMacros.carbs }}g</span>
        <span class="stat-card__label">Carbos total</span>
      </div>
    </section>

    <section class="filters">
      <button
        v-for="category in categories"
        :key="category.value"
        class="filter-btn"
        :class="{ 'filter-btn--active': selectedCategory === category.value }"
        type="button"
        @click="selectedCategory = category.value"
      >
        {{ category.label }}
      </button>
    </section>

    <section class="recipe-grid">
      <article
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="recipe-card"
        @click="openRecipe(recipe)"
      >
        <div class="recipe-card__image">
          <img :src="recipe.image" :alt="recipe.title" />
          <span class="recipe-card__category">{{ categoryLabel(recipe.category) }}</span>
        </div>
        <div class="recipe-card__body">
          <h3 class="recipe-card__title">{{ recipe.title }}</h3>
          <div class="recipe-card__meta">
            <span><i class="fa-regular fa-clock" /> {{ recipe.time }}</span>
            <span><i class="fa-solid fa-user" /> {{ recipe.servings }}</span>
            <span><i class="fa-solid fa-fire" /> {{ recipe.calories }} kcal</span>
          </div>
          <div class="recipe-card__macros">
            <span class="recipe-card__macro recipe-card__macro--protein">P {{ recipe.protein }}g</span>
            <span class="recipe-card__macro recipe-card__macro--carbs">C {{ recipe.carbs }}g</span>
            <span class="recipe-card__macro recipe-card__macro--fats">G {{ recipe.fats }}g</span>
          </div>
          <div class="recipe-card__tags">
            <span v-for="tag in recipe.tags" :key="tag" class="recipe-card__tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </section>

    <div v-if="filteredRecipes.length === 0" class="empty-state">
      <p>No hay recetas en esta categoría.</p>
    </div>
      </div>
    </div>

    <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="selectedRecipe" class="recipe-modal" @click="closeRecipe">
        <div class="recipe-modal__panel" @click.stop>
          <button class="recipe-modal__close" type="button" aria-label="Cerrar" @click="closeRecipe">
            <i class="fa-solid fa-xmark" />
          </button>

          <div class="recipe-modal__hero">
            <img :src="selectedRecipe.image" :alt="selectedRecipe.title" />
            <span class="recipe-modal__category">{{ categoryLabel(selectedRecipe.category) }}</span>
          </div>

          <div class="recipe-modal__content">
            <h2 class="recipe-modal__title">{{ selectedRecipe.title }}</h2>

            <div class="recipe-modal__meta">
              <span><i class="fa-regular fa-clock" /> {{ selectedRecipe.time }}</span>
              <span><i class="fa-solid fa-user" /> {{ selectedRecipe.servings }} porciones</span>
              <span><i class="fa-solid fa-fire" /> {{ selectedRecipe.calories }} kcal</span>
            </div>

            <div class="recipe-modal__macros">
              <div class="macro">
                <span class="macro__value">{{ selectedRecipe.protein }}g</span>
                <span class="macro__label">Proteína</span>
              </div>
              <div class="macro">
                <span class="macro__value">{{ selectedRecipe.carbs }}g</span>
                <span class="macro__label">Carbohidratos</span>
              </div>
              <div class="macro">
                <span class="macro__value">{{ selectedRecipe.fats }}g</span>
                <span class="macro__label">Grasas</span>
              </div>
            </div>

            <div class="recipe-modal__section">
              <h3 class="recipe-modal__section-title">Ingredientes</h3>
              <ul class="recipe-modal__list">
                <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">
                  {{ ingredient }}
                </li>
              </ul>
            </div>

            <div class="recipe-modal__section">
              <h3 class="recipe-modal__section-title">Preparación</h3>
              <ol class="recipe-modal__list recipe-modal__list--numbered">
                <li v-for="(step, index) in selectedRecipe.instructions" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.recipes-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

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

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: $lpb-white;
  border: 1px solid var(--border);
  color: $lpb-graphite;
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba($lpb-green, 0.08);
  }

  &--active {
    background: $lpb-black;
    color: $lpb-white;
    border-color: $lpb-black;
  }
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.recipe-card {
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

    &:hover img {
      transform: scale(1.05);
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

    i {
      margin-right: 0.25rem;
    }
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

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: $lpb-muted;
  font-family: $font-sans;
}

.recipe-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba($lpb-black, 0.55);
  backdrop-filter: blur(6px);
  overflow-y: auto;
}

.recipe-modal__panel {
  position: relative;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba($lpb-black, 0.2);
  display: flex;
  flex-direction: column;
}

.recipe-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba($lpb-white, 0.92);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $lpb-black;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s ease;

  &:hover {
    background: $lpb-white;
  }
}

.recipe-modal__hero {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.recipe-modal__category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: $lpb-paper;
  color: $lpb-black;
  font-family: $font-mono;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
}

.recipe-modal__content {
  padding: 1.5rem 2rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.recipe-modal__title {
  font-family: $font-display;
  font-size: 1.6rem;
  font-weight: 400;
  color: $lpb-black;
  margin: 0;
}

.recipe-modal__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $lpb-muted;

  i {
    margin-right: 0.3rem;
  }
}

.recipe-modal__macros {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.macro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.85rem;
  background: $lpb-cream;
  border-radius: 0.75rem;

  &__value {
    font-family: $font-display;
    font-size: 1.35rem;
    color: $lpb-black;
  }

  &__label {
    font-family: $font-mono;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $lpb-muted;
  }
}

.recipe-modal__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.recipe-modal__section-title {
  font-family: $font-display;
  font-size: 1.15rem;
  font-weight: 400;
  color: $lpb-black;
  margin: 0;
}

.recipe-modal__list {
  margin: 0;
  padding-left: 1.25rem;
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $lpb-graphite;
  line-height: 1.6;

  li {
    margin-bottom: 0.4rem;
  }

  &--numbered {
    list-style-type: decimal;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1200px) {
  .recipe-grid { grid-template-columns: repeat(2, 1fr); }
  .stats { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 720px) {
  .recipe-grid { grid-template-columns: 1fr; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .recipe-modal__content { padding: 1.25rem; }
}
</style>
