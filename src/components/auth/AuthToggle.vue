<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  prompt: string
  action: string
}>()
</script>

<template>
  <p class="auth-toggle">
    {{ prompt }}
    <RouterLink :to="to" class="auth-toggle__link">{{ action }}</RouterLink>
  </p>
</template>

<style lang="scss" scoped>
.auth-toggle {
  text-align: center;
  font-family: $font-sans;
  font-size: 0.9rem;
  color: $lpb-muted;
  margin: 1.25rem 0 0;
}

.auth-toggle__link {
  color: $lpb-green-dark;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: $lpb-black;
  }
}
</style>
