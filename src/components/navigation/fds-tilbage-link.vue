<template>
  <div>
    <a :href="href" class="back-link" @click="handleClick">
      <FdsIkon icon="chevron-left" decorative />
      <slot>Tilbage</slot>
    </a>
  </div>
</template>

<script setup lang="ts">
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * Tilbage-link komponent
 *
 * Tilbage-linket lader brugeren gå tilbage til forrige trin eller side i en selvbetjeningsløsning.
 * Brug tilbage-linket i flertrinsselvbetjeningsløsninger eller i løsninger med sammenhængende sider.
 *
 * Placering: Øverst til venstre umiddelbart under headeren.
 * Brug ikke samtidig med brødkrummer.
 *
 * https://designsystem.dk/komponenter/tilbage-link/
 */

export interface FdsTilbageLinkProps {
  /** Href for linket. Standard er javascript:void(0); for at undgå navigation */
  href?: string
}

const _props = withDefaults(defineProps<FdsTilbageLinkProps>(), {
  href: 'javascript:void(0);',
})

// Define emits for better TypeScript support
const emit = defineEmits<{
  /** Emitted when the link is clicked */
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>
