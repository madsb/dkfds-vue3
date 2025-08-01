<template>
  <button
    class="button mr-4"
    :class="[`button-${variant}`]"
    :disabled="showSpinner || disabled"
    @click="emit('click', $event)"
  >
    <div
      v-if="showSpinner"
      :class="{ 'inner-spinner-white': variant === 'primary' }"
      class="inner-spinner mr-4 icon-svg"
    ></div>
    <svg
      v-if="icon && !showSpinner"
      class="icon-svg rightside-icon"
      focusable="false"
      aria-hidden="true"
    >
      <use :xlink:href="`#${icon}`" />
    </svg>
    <slot v-if="showSpinner && !spinnerText" />
    <span v-if="showSpinner && spinnerText">
      {{ spinnerText }}
    </span>
    <slot v-if="!showSpinner" />
  </button>
  <div
    v-if="showSpinner && useoverlay"
    class="spinneroverlay"></div>
</template>

<script setup lang="ts">
/**
 *
 * Komponent for knap med spinner
 * Umiddelbart ikke en del FDS
 * https://designsystem.dk/komponenter/knapper/
 *
 * */
import { FdsVariantEnum } from 'dkfds-vue3-utils';

const {
  /** Visnings variant */
  variant = FdsVariantEnum.secondary,
  /** Vis spinner */
  showSpinner = false,
  disabled = false,
  /** Spinner tekst - erstatter alm tekst */
  spinnerText = null,
  /** Ikon som string */
  icon = null,
  /** Tilføjer overlay når showSpinner, ikke muligt at klikke andre steder imens */
  useoverlay = false,
} = defineProps<{
  variant?: FdsVariantEnum | string;
  showSpinner?: boolean;
  disabled?: boolean;
  spinnerText?: string | null;
  icon?: string | null;
  useoverlay?: boolean;
}>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<style lang="scss"></style>
