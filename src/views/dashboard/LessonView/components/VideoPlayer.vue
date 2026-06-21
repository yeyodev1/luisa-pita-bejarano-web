<script setup lang="ts">
defineProps<{
  title: string
  duration: string
  isCompleted: boolean
}>()

const emit = defineEmits<{
  (e: 'play'): void
}>()
</script>

<template>
  <div class="player">
    <div class="player__screen">
      <button class="player__play" type="button" aria-label="Reproducir clase" @click="emit('play')">
        <i class="fa-solid fa-play" aria-hidden="true" />
      </button>
      <span class="player__duration">
        <i class="fa-regular fa-clock" aria-hidden="true" />
        {{ duration }}
      </span>
    </div>
    <div class="player__controls">
      <button class="player__control" type="button" aria-label="Reproducir" @click="emit('play')">
        <i class="fa-solid fa-play" aria-hidden="true" />
      </button>
      <div class="player__track">
        <div class="player__progress" :style="{ width: isCompleted ? '100%' : '12%' }" />
      </div>
      <button class="player__control" type="button" aria-label="Pantalla completa">
        <i class="fa-solid fa-expand" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player {
  background: $lpb-black;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__screen {
    position: relative;
    aspect-ratio: 16 / 9;
    background: linear-gradient(135deg, rgba($lpb-ink, 1) 0%, rgba($lpb-black, 1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__play {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: rgba($lpb-white, 0.95);
    color: $lpb-black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    padding-left: 0.25rem;
    transition: transform 0.25s ease, background 0.25s ease;
    box-shadow: 0 12px 40px rgba($lpb-black, 0.35);

    &:hover {
      transform: scale(1.06);
      background: $lpb-green;
    }
  }

  &__duration {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba($lpb-black, 0.65);
    color: $lpb-white;
    font-family: $font-mono;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    backdrop-filter: blur(6px);
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba($lpb-white, 0.03);
    border-top: 1px solid rgba($lpb-white, 0.08);
  }

  &__control {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $lpb-white;
    background: rgba($lpb-white, 0.08);
    font-size: 0.8rem;
    transition: background 0.2s ease;

    &:hover { background: rgba($lpb-white, 0.18); }
  }

  &__track {
    flex: 1 1 auto;
    height: 5px;
    background: rgba($lpb-white, 0.18);
    border-radius: 999px;
    overflow: hidden;
    cursor: pointer;
  }

  &__progress {
    height: 100%;
    background: $lpb-green;
    border-radius: 999px;
    transition: width 0.3s ease;
  }
}
</style>
