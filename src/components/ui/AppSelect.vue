<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'

export interface AppSelectOption {
  value: string | number
  label: string
  raw?: unknown
}

interface Props {
  modelValue: string | number
  options: AppSelectOption[]
  placeholder?: string
  disabled?: boolean
  searchableThreshold?: number
  remote?: boolean
  searchFn?: (query: string) => Promise<AppSelectOption[]> | AppSelectOption[]
  remoteMinLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Seleccionar…',
  disabled: false,
  searchableThreshold: 5,
  remote: false,
  remoteMinLength: 2,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'search', query: string): void
}>()

const isOpen = ref(false)
const search = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)
const remoteLoading = ref(false)
const remoteOptions = ref<AppSelectOption[]>([])
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const dropdownStyle = ref({
  top: '0px',
  left: '0px',
  width: '0px',
})

function updateDropdownPosition() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  dropdownStyle.value = {
    top: `${rect.bottom + 6}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
  }
}

const selectedLabel = computed(() => {
  const allOptions = props.remote ? remoteOptions.value : props.options
  const option = allOptions.find((o) => o.value === props.modelValue)
  return option?.label || props.placeholder
})

const isSearchable = computed(() => {
  if (props.remote) return true
  return props.options.length > props.searchableThreshold
})

const filteredOptions = computed(() => {
  if (props.remote) return remoteOptions.value
  if (!isSearchable.value || !search.value.trim()) return props.options
  const query = search.value.toLowerCase()
  return props.options.filter((o) => o.label.toLowerCase().includes(query))
})

const hasValue = computed(() => props.modelValue !== undefined && props.modelValue !== '')

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    search.value = ''
    if (props.remote) {
      remoteOptions.value = []
    }
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

async function runRemoteSearch(query: string) {
  if (!props.searchFn) return
  if (query.trim().length < props.remoteMinLength) {
    remoteOptions.value = []
    return
  }
  remoteLoading.value = true
  try {
    const result = await props.searchFn(query.trim())
    remoteOptions.value = result
  } catch {
    remoteOptions.value = []
  } finally {
    remoteLoading.value = false
  }
}

function debouncedRemoteSearch(query: string) {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  if (query.trim().length < props.remoteMinLength) {
    remoteOptions.value = []
    remoteLoading.value = false
    return
  }
  searchTimeout.value = setTimeout(() => {
    runRemoteSearch(query)
  }, 300)
}

watch(search, (query) => {
  emit('search', query)
  if (props.remote) {
    debouncedRemoteSearch(query)
  }
})

function select(value: string | number, event?: Event) {
  event?.stopPropagation()
  event?.preventDefault()
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
  search.value = ''
}

function close() {
  isOpen.value = false
  search.value = ''
  if (props.remote) {
    remoteOptions.value = []
  }
}

function onClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (
    dropdownRef.value?.contains(target) ||
    triggerRef.value?.contains(target)
  ) {
    return
  }
  close()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
    triggerRef.value?.focus()
  }
}

watch(isOpen, (open) => {
  if (open) {
    nextTick(() => {
      updateDropdownPosition()
      window.addEventListener('resize', updateDropdownPosition)
      window.addEventListener('scroll', updateDropdownPosition, true)
    })
    document.addEventListener('click', onClickOutside, true)
  } else {
    window.removeEventListener('resize', updateDropdownPosition)
    window.removeEventListener('scroll', updateDropdownPosition, true)
    document.removeEventListener('click', onClickOutside, true)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside, true)
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition, true)
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
})

watch(
  () => props.modelValue,
  () => {
    search.value = ''
  },
)
</script>

<template>
  <div class="app-select" :class="{ 'app-select--open': isOpen, 'app-select--disabled': disabled }">
    <button
      ref="triggerRef"
      type="button"
      class="app-select__trigger"
      :disabled="disabled"
      :aria-expanded="isOpen"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span class="app-select__label" :class="{ 'app-select__label--placeholder': !hasValue }">
        {{ selectedLabel }}
      </span>
      <span class="app-select__arrow" aria-hidden="true">
        <i class="fa-solid fa-chevron-down" />
      </span>
    </button>

    <Teleport to="body">
      <Transition name="app-select-dropdown">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          class="app-select__dropdown app-select__dropdown--teleported"
          :style="dropdownStyle"
        >
          <div v-if="isSearchable" class="app-select__search">
            <i class="fa-solid fa-magnifying-glass app-select__search-icon" />
            <input
              ref="searchInput"
              v-model="search"
              type="text"
              class="app-select__search-input"
              :placeholder="remote ? 'Escribe para buscar…' : 'Buscar…'"
              @keydown.stop="onKeydown"
            />
            <i v-if="remoteLoading" class="fa-solid fa-circle-notch fa-spin app-select__search-loading" />
          </div>

          <ul class="app-select__list" role="listbox">
            <li
              v-for="option in filteredOptions"
              :key="option.value"
              class="app-select__option"
              :class="{ 'app-select__option--selected': option.value === modelValue }"
              role="option"
              :aria-selected="option.value === modelValue"
              @click.stop.prevent="select(option.value, $event)"
            >
              <span class="app-select__option-label">{{ option.label }}</span>
              <i v-if="option.value === modelValue" class="fa-solid fa-check app-select__check" />
            </li>
            <li v-if="remote && search.trim().length < remoteMinLength" class="app-select__hint">
              Escribe al menos {{ remoteMinLength }} caracteres para buscar
            </li>
            <li v-else-if="remoteLoading" class="app-select__hint">
              Buscando…
            </li>
            <li v-else-if="filteredOptions.length === 0" class="app-select__empty">
              No se encontraron opciones
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
@use './_app-select.scss';
</style>
