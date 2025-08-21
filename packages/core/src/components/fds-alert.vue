<template>
  <transition name="fade">
    <div
      v-if="showAlert"
      :role="compAlert ? 'alert' : ''"
      class="alert"
      :class="[`alert-${variant}`, { 'has-close': closeable }]"
    >
      <fds-ikon
        v-if="showIcon"
        :icon="variant"
        class="alert-icon"
        :aria-label="iconAriaLabel"
        :decorative="false"
      />
      <div class="alert-body">
        <slot v-if="$slots.header || header" name="header">
          <h2 class="alert-heading">
            {{ header }}
          </h2>
        </slot>
        <p class="alert-text">
          <slot />
        </p>
        <button v-if="closeable" type="button" class="alert-close" @click="onClose">
          <slot name="button">
            <fds-ikon icon="close" :decorative="true" />Luk
          </slot>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
/**
 *
 * Komponent til Besked
 * https://designsystem.dk/komponenter/beskeder/
 *
 * */
import { ref, computed } from 'vue'
import FdsIkon from './fds-ikon.vue'

const {
  /** Overskrift */
  header = null,
  /** Type af besked */
  variant = 'info',
  /** Vis venstrestillet ikon */
  showIcon = false,
  /** Klik for at lukke/fjerne besked */
  closeable = false,
} = defineProps<{
  header?: string | null
  variant?: 'success' | 'info' | 'warning' | 'error'
  showIcon?: boolean
  closeable?: boolean
}>()

const emit = defineEmits<{
  close: [closed: boolean]
}>()

const showAlert = ref(true)

const compAlert = computed(() => ['warning', 'error'].includes(variant))

const iconAriaLabel = computed(() => {
  const labels = {
    info: 'Information',
    success: 'Succes',
    warning: 'Advarsel',
    error: 'Fejl',
  }
  return labels[variant]
})

const onClose = () => {
  showAlert.value = !showAlert.value
  emit('close', true)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.alert-close {
  > i {
    margin-right: 4px;
    width: 1.6rem;
    height: 1.6rem;
    overflow: hidden;
    vertical-align: middle;
  }
}
</style>
