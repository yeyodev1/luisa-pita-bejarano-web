<script setup lang="ts">
import { reactive, watch } from 'vue'
import AdminModal from '@/components/admin/AdminModal.vue'
import type { AdminUser } from '@/services/adminService'

const props = defineProps<{
  open: boolean
  user: AdminUser | null
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', months: number): void
}>()

const form = reactive({ months: 1 })
const accessMonthOptions = [1, 3, 6, 12]

watch(() => props.open, (open) => {
  if (open) form.months = 1
})

function onClose() {
  form.months = 1
  emit('close')
}

function onSubmit() {
  emit('submit', form.months)
}
</script>

<template>
  <AdminModal
    :open="open"
    title="Extender acceso"
    size="small"
    @close="onClose"
  >
    <p class="admin-modal__description">
      Extiende el acceso de <strong>{{ user?.name }} {{ user?.lastName }}</strong>.
    </p>
    <form class="admin-modal__form" @submit.prevent="onSubmit">
      <label class="admin-modal__field">
        <span class="admin-modal__label">Meses a extender</span>
        <AppSelect
          v-model="form.months"
          :options="accessMonthOptions.map((m) => ({ value: m, label: `${m} ${m === 1 ? 'mes' : 'meses'}` }))"
          placeholder="Seleccionar meses"
        />
      </label>
      <div class="admin-modal__actions">
        <button
          type="button"
          class="admin-users__btn admin-users__btn--ghost"
          @click="onClose"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="admin-users__btn admin-users__btn--primary"
          :disabled="loading"
        >
          <i v-if="loading" class="fa-solid fa-circle-notch fa-spin" />
          <i v-else class="fa-solid fa-calendar-plus" />
          {{ loading ? 'Guardando…' : 'Extender acceso' }}
        </button>
      </div>
    </form>
  </AdminModal>
</template>

<style lang="scss" scoped>
@use '@/styles/admin-shared.scss';
</style>
