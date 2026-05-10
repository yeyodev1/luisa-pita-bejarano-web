<script setup lang="ts">
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import TheNav from '@/components/layout/TheNav.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

useSmoothScroll()
</script>

<template>
  <div class="app">
    <TheNav />
    <main class="app__main">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

.app__main {
  flex: 1 1 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
