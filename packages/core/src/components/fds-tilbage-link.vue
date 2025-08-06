<template>
  <div>
    <a :href="href" class="back-link">
      <svg class="icon-svg" focusable="false" aria-hidden="true">
        <use href="#chevron-left"></use>
      </svg>
      <slot>Tilbage</slot>
    </a>
  </div>
</template>

<script setup lang="ts">
/**
 * Tilbage-link komponent
 *
 * Tilbage-linket lader brugeren gå tilbage til forrige trin eller side i en selvbetjeningsløsning.
 * Brug tilbage-linket i flertrinsselvbetjeningsløsninger eller i løsninger med sammenhængende sider.
 *
 * https://designsystem.dk/komponenter/tilbage-link/
 */

const {
  /** Href for linket. Standard er javascript:void(0); for at undgå navigation */
  href = 'javascript:void(0);',
} = defineProps<{
  href?: string
}>()
</script>
