<script setup lang="ts">
import type { Recipe } from '@/stores/dashboard'

defineProps<{
  recipe: Recipe | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function categoryLabel(category: string) {
  const labels: Record<string, string> = { desayuno: 'Desayuno', almuerzo: 'Almuerzo', cena: 'Cena', snack: 'Snack', postre: 'Postre' }
  return labels[category] || category
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="recipe" class="modal" @click="emit('close')">
        <div class="modal__panel" @click.stop>
          <button class="modal__close" type="button" aria-label="Cerrar" @click="emit('close')">
            <i class="fa-solid fa-xmark" />
          </button>

          <div class="modal__hero">
            <img :src="recipe.image" :alt="recipe.title" />
            <span class="modal__category">{{ categoryLabel(recipe.category) }}</span>
          </div>

          <div class="modal__content">
            <h2 class="modal__title">{{ recipe.title }}</h2>

            <div class="modal__meta">
              <span><i class="fa-regular fa-clock" /> {{ recipe.time }}</span>
              <span><i class="fa-solid fa-user" /> {{ recipe.servings }} porciones</span>
              <span><i class="fa-solid fa-fire" /> {{ recipe.calories }} kcal</span>
            </div>

            <div class="modal__macros">
              <div class="macro">
                <span class="macro__value">{{ recipe.protein }}g</span>
                <span class="macro__label">Proteína</span>
              </div>
              <div class="macro">
                <span class="macro__value">{{ recipe.carbs }}g</span>
                <span class="macro__label">Carbohidratos</span>
              </div>
              <div class="macro">
                <span class="macro__value">{{ recipe.fats }}g</span>
                <span class="macro__label">Grasas</span>
              </div>
            </div>

            <div class="modal__section">
              <h3 class="modal__section-title">Ingredientes</h3>
              <ul class="modal__list">
                <li v-for="(ing, i) in recipe.ingredients" :key="i">{{ ing }}</li>
              </ul>
            </div>

            <div class="modal__section">
              <h3 class="modal__section-title">Preparación</h3>
              <ol class="modal__list modal__list--numbered">
                <li v-for="(step, i) in recipe.instructions" :key="i">{{ step }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
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

.modal__panel {
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

.modal__close {
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

  &:hover { background: $lpb-white; }
}

.modal__hero {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
}

.modal__category {
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

.modal__content {
  padding: 1.5rem 2rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal__title {
  font-family: $font-display;
  font-size: 1.6rem;
  font-weight: 400;
  color: $lpb-black;
  margin: 0;
}

.modal__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $lpb-muted;

  i { margin-right: 0.3rem; }
}

.modal__macros {
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

.modal__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal__section-title {
  font-family: $font-display;
  font-size: 1.15rem;
  font-weight: 400;
  color: $lpb-black;
  margin: 0;
}

.modal__list {
  margin: 0;
  padding-left: 1.25rem;
  font-family: $font-sans;
  font-size: 0.95rem;
  color: $lpb-graphite;
  line-height: 1.6;

  li { margin-bottom: 0.4rem; }

  &--numbered { list-style-type: decimal; }
}

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

@media (max-width: 720px) {
  .modal__content { padding: 1.25rem; }
}
</style>
