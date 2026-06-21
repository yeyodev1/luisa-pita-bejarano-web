<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDashboardStore, type Recipe } from '@/stores/dashboard'
import RecipeStats from './components/RecipeStats.vue'
import RecipeFilters from './components/RecipeFilters.vue'
import RecipeGrid from './components/RecipeGrid.vue'
import RecipeDetailModal from './components/RecipeDetailModal.vue'

const dashboardStore = useDashboardStore()

const selectedCategory = ref<Recipe['category'] | 'todas'>('todas')
const selectedRecipe = ref<Recipe | null>(null)

const categories = [
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
    (acc, r) => {
      acc.calories += r.calories
      acc.protein += r.protein
      acc.carbs += r.carbs
      return acc
    },
    { calories: 0, protein: 0, carbs: 0 },
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
</script>

<template>
  <div class="recipes">
    <RecipeStats
      :filtered-count="filteredRecipes.length"
      :average-calories="averageCalories"
      :total-protein="totalMacros.protein"
      :total-carbs="totalMacros.carbs"
    />

    <RecipeFilters :categories="categories" :selected="selectedCategory" @select="selectedCategory = $event as Recipe['category'] | 'todas'" />

    <RecipeGrid :recipes="filteredRecipes" @select="openRecipe" />

    <RecipeDetailModal :recipe="selectedRecipe" @close="closeRecipe" />
  </div>
</template>

<style lang="scss" scoped>
.recipes {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
