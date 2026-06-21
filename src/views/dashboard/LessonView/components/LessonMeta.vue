<script setup lang="ts">
defineProps<{
  title: string
  description: string
  isCompleted: boolean
}>()

const emit = defineEmits<{
  (e: 'mark-completed'): void
}>()
</script>

<template>
  <div class="meta">
    <div>
      <h1 class="meta__title">{{ title }}</h1>
      <p class="meta__desc">{{ description }}</p>
    </div>
    <button
      v-if="!isCompleted"
      class="meta__complete"
      type="button"
      @click="emit('mark-completed')"
    >
      Marcar como completada
    </button>
    <span v-else class="meta__done">✓ Clase completada</span>
  </div>
</template>

<style lang="scss" scoped>
.meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;

  &__title {
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 400;
    color: $lpb-black;
    margin: 0;
  }

  &__desc {
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $lpb-graphite;
    margin: 0.5rem 0 0;
    max-width: 720px;
    line-height: 1.6;
  }

  &__complete {
    flex-shrink: 0;
    background: $lpb-green;
    color: $lpb-black;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.85rem 1.25rem;
    border-radius: 999px;
    transition: background 0.2s ease;

    &:hover {
      background: $lpb-green-dark;
      color: $lpb-white;
    }
  }

  &__done {
    flex-shrink: 0;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $lpb-green-deep;
    padding: 0.85rem 1.25rem;
    border-radius: 999px;
    background: rgba($lpb-green, 0.12);
  }
}

@media (max-width: 720px) {
  .meta { flex-direction: column; }
}
</style>
