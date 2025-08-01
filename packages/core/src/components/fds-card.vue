<template>
  <div class="card">
    <slot name="custom" />

    <div
      v-if="$slots.content"
      class="card-content">
      <slot name="content" />
    </div>

    <div
      v-if="$slots.header || header"
      class="card-header">
      <slot name="header">
        <component
          :is="headerTag"
          class="header-title">
          {{ header }}
        </component>
        <p
          v-if="subheader"
          class="sub-header">
          {{ subheader }}
        </p>
      </slot>
    </div>

    <div class="card-text">
      <slot />
    </div>

    <div
      v-if="$slots.actions"
      class="card-footer card-action">
      <div class="action-buttons">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 *
 * Komponent for card
 * https://designsystem.dk/komponenter/cards/
 *
 * */
const {
  /** Overskrift */
  header = null,
  headerTag = 'h2',
  /** Under overskrift */
  subheader = null,
} = defineProps<{
  header?: string | null;
  headerTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subheader?: string | null;
}>();
</script>
