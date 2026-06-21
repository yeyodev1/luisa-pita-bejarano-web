<script setup lang="ts">
defineProps<{
  categories: { value: string; label: string }[]
  selected: string
}>()

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()
</script>

<template>
  <section class="filters">
    <button
      v-for="cat in categories"
      :key="cat.value"
      class="filter-btn"
      :class="{ 'filter-btn--active': selected === cat.value }"
      type="button"
      @click="emit('select', cat.value)"
    >
      {{ cat.label }}
    </button>
  </section>
</template>

<style lang="scss" scoped>
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

  &:hover { background: rgba($lpb-green, 0.08); }

  &--active {
    background: $lpb-black;
    color: $lpb-white;
    border-color: $lpb-black;
  }
}
</style>
