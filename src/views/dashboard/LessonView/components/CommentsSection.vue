<script setup lang="ts">
import { ref } from 'vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'

interface Comment {
  id: string
  author: string
  authorPicture: string | null
  avatar: string
  content: string
  date: string
  likes: number
}

defineProps<{
  comments: Comment[]
}>()

const emit = defineEmits<{
  (e: 'submit', text: string): void
}>()

const newComment = ref('')

function submit() {
  if (!newComment.value.trim()) return
  emit('submit', newComment.value.trim())
  newComment.value = ''
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <section class="comments">
    <h2 class="comments__title">Comentarios de la comunidad</h2>
    <div class="comments__list">
      <div v-for="c in comments" :key="c.id" class="comment">
        <UserAvatar
          v-if="c.authorPicture"
          :name="c.author"
          :picture="c.authorPicture"
          size="md"
        />
        <div v-else class="comment__avatar">{{ c.avatar }}</div>
        <div class="comment__body">
          <div class="comment__header">
            <span class="comment__author">{{ c.author }}</span>
            <span class="comment__date">{{ formatDate(c.date) }}</span>
          </div>
          <p class="comment__text">{{ c.content }}</p>
          <button class="comment__like" type="button">♡ {{ c.likes }}</button>
        </div>
      </div>
    </div>
    <form class="comments__form" @submit.prevent="submit">
      <textarea
        v-model="newComment"
        class="comments__input"
        rows="3"
        placeholder="Escribe un comentario..."
      />
      <button class="comments__submit" type="submit">Comentar</button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.comments {
  background: $lpb-white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    font-family: $font-display;
    font-size: 1.25rem;
    font-weight: 400;
    color: $lpb-black;
    margin: 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__input {
    width: 100%;
    font-family: $font-sans;
    font-size: 0.95rem;
    color: $lpb-black;
    background: $lpb-cream;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 0.85rem 1rem;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: $lpb-green;
      box-shadow: 0 0 0 3px rgba($lpb-green, 0.15);
    }
  }

  &__submit {
    align-self: flex-end;
    background: $lpb-black;
    color: $lpb-white;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
    transition: background 0.2s ease;

    &:hover { background: $lpb-green-dark; }
  }
}

.comment {
  display: flex;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  &__avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: $lpb-green;
    color: $lpb-black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-mono;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  &__body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__author {
    font-family: $font-sans;
    font-size: 0.9rem;
    font-weight: 600;
    color: $lpb-black;
  }

  &__date {
    font-family: $font-mono;
    font-size: 0.65rem;
    color: $lpb-muted;
  }

  &__text {
    font-family: $font-sans;
    font-size: 0.9rem;
    color: $lpb-graphite;
    margin: 0;
    line-height: 1.5;
  }

  &__like {
    align-self: flex-start;
    font-family: $font-mono;
    font-size: 0.7rem;
    color: $lpb-muted;
    padding: 0.25rem 0;

    &:hover { color: $lpb-green-deep; }
  }
}
</style>
