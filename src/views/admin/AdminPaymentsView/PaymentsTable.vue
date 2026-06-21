<script setup lang="ts">
import type { ManualPayment } from '@/services/adminService'

const props = defineProps<{
  payments: ManualPayment[]
  initialLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'register'): void
  (e: 'delete', payment: ManualPayment): void
}>()

const skeletonRows = Array.from({ length: 5 }, (_, i) => i)

function planLabel(plan: string) {
  return plan === 'annual' ? 'Anual' : 'Mensual'
}

function statusLabel(status: string) {
  return status === 'approved' ? 'Aprobado' : 'Pendiente'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatAmount(amount: number) {
  return `USD ${amount}`
}
</script>

<template>
  <section class="admin-payments__table-card">
    <Transition name="fade" mode="out-in">
      <div v-if="initialLoading" key="skeleton" class="admin-payments__skeleton">
          <div v-for="n in skeletonRows" :key="n" class="admin-payments__skeleton-row">
            <div class="admin-payments__skeleton-cell admin-payments__skeleton-cell--student" />
            <div class="admin-payments__skeleton-cell admin-payments__skeleton-cell--plan" />
            <div class="admin-payments__skeleton-cell admin-payments__skeleton-cell--amount" />
            <div class="admin-payments__skeleton-cell admin-payments__skeleton-cell--status" />
            <div class="admin-payments__skeleton-cell admin-payments__skeleton-cell--date" />
            <div class="admin-payments__skeleton-cell admin-payments__skeleton-cell--receipt" />
            <div class="admin-payments__skeleton-cell admin-payments__skeleton-cell--actions" />
          </div>
      </div>

      <div v-else-if="payments.length === 0" key="empty" class="admin-payments__empty">
        <div class="admin-payments__empty-icon">
          <i class="fa-solid fa-receipt" />
        </div>
        <h3 class="admin-payments__empty-title">Aún no hay pagos registrados</h3>
        <p class="admin-payments__empty-text">
          Registra el primer pago manual para activar el acceso de un alumno.
        </p>
        <button class="admin-payments__btn admin-payments__btn--primary" @click="emit('register')">
          Registrar pago
        </button>
      </div>

      <div v-else key="table" class="admin-payments__table-wrap">
        <table class="admin-payments__table">
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Plan</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Notas</th>
              <th>Fecha</th>
              <th>Comprobante</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments" :key="payment.id" class="admin-payments__row">
              <td>
                <div class="admin-payments__student">
                  <div class="admin-payments__avatar">
                    {{ payment.user.name.charAt(0).toUpperCase() }}{{ payment.user.lastName.charAt(0).toUpperCase() }}
                  </div>
                  <div class="admin-payments__student-info">
                    <span class="admin-payments__student-name">
                      {{ payment.user.name }} {{ payment.user.lastName }}
                    </span>
                    <span class="admin-payments__student-email">{{ payment.user.email }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="admin-payments__plan">
                  <i class="fa-solid" :class="payment.plan === 'annual' ? 'fa-crown' : 'fa-calendar-days'" />
                  {{ planLabel(payment.plan) }}
                </span>
              </td>
              <td>
                <span class="admin-payments__amount">{{ formatAmount(payment.amount) }}</span>
              </td>
              <td>
                <span
                  class="admin-payments__badge"
                  :class="`admin-payments__badge--${payment.status}`"
                >
                  <i class="fa-solid" :class="payment.status === 'approved' ? 'fa-circle-check' : 'fa-clock'" />
                  {{ statusLabel(payment.status) }}
                </span>
              </td>
              <td>
                <span class="admin-payments__notes">{{ payment.notes || '—' }}</span>
              </td>
              <td>{{ formatDate(payment.createdAt) }}</td>
              <td>
                <a
                  :href="payment.receiptImage"
                  target="_blank"
                  rel="noopener"
                  class="admin-payments__receipt"
                >
                  <i class="fa-solid fa-image" />
                  Ver
                </a>
              </td>
              <td>
                <div class="admin-payments__actions">
                  <button
                    class="admin-payments__action admin-payments__action--delete"
                    title="Eliminar pago"
                    @click="emit('delete', payment)"
                  >
                    <i class="fa-solid fa-trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/admin-shared.scss';
@use './_payments-table.scss';
</style>
