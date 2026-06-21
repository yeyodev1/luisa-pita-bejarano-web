<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { paymentService } from '@/services/paymentService'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import AuthSubmit from '@/components/auth/AuthSubmit.vue'

const route = useRoute()
const router = useRouter()

const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('')

onMounted(async () => {
  const id = route.query.id
  const clientTransactionId = route.query.clientTransactionId

  if (!id || !clientTransactionId || typeof id !== 'string' || typeof clientTransactionId !== 'string') {
    status.value = 'error'
    message.value = 'Los datos de la transacción no son válidos.'
    return
  }

  try {
    const { data } = await paymentService.confirmPayment(id, clientTransactionId)
    status.value = data.data.status === 'approved' ? 'success' : 'error'
    message.value = data.message || (status.value === 'success'
      ? 'Tu pago fue procesado correctamente. Bienvenida a la comunidad.'
      : 'No pudimos confirmar tu pago. Contacta a soporte si el cargo fue realizado.')
  } catch (err: unknown) {
    status.value = 'error'
    const e = err as { message?: string }
    message.value = e.message || 'Ocurrió un error al confirmar el pago.'
  }
})

const goHome = () => router.push({ name: 'home' })
</script>

<template>
  <AuthLayout title="Confirmación de pago" :subtitle="message || 'Estamos confirmando tu transacción...'">
    <div class="payment-state">
      <div v-if="status === 'loading'" class="payment-state__spinner" aria-hidden="true" />
      <div v-else-if="status === 'success'" class="payment-state__icon payment-state__icon--success">
        <i class="fa-solid fa-check" />
      </div>
      <div v-else class="payment-state__icon payment-state__icon--error">
        <i class="fa-solid fa-xmark" />
      </div>

      <AuthSubmit v-if="status !== 'loading'" :loading="false" @click="goHome">
        Volver al inicio
      </AuthSubmit>
    </div>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.payment-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.payment-state__spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid rgba($lpb-green, 0.2);
  border-top-color: $lpb-green;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.payment-state__icon {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.5rem;

  &--success {
    background: $alert-success-bg;
    color: $alert-success;
  }

  &--error {
    background: $alert-error-bg;
    color: $alert-error;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
