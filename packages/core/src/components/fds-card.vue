<template>
  <!-- Custom slot replaces entire structure when used -->
  <slot v-if="$slots.custom" name="custom" />

  <!-- Navigation card (link wrapper) -->
  <component
    :is="'a'"
    v-else-if="href"
    :href="href"
    :class="['card', { long: variant === 'long' }]"
  >
    <div v-if="$slots.image" class="card-image">
      <slot name="image" />
    </div>

    <div class="card-content">
      <span v-if="subheader" class="card-subheading">
        {{ subheader }}
      </span>

      <slot name="header">
        <component :is="headerTag" v-if="header" class="card-heading">
          {{ header }}
        </component>
      </slot>

      <slot name="content" />

      <slot />
    </div>

    <!-- Navigation icon -->
    <fds-ikon v-if="icon" :icon="icon" class="card-icon" :decorative="true" />
  </component>

  <!-- Regular card (section wrapper) -->
  <section v-else :class="['card', { long: variant === 'long' }]">
    <div v-if="$slots.image" class="card-image">
      <slot name="image" />
    </div>

    <div class="card-content">
      <span v-if="subheader" class="card-subheading">
        {{ subheader }}
      </span>

      <slot name="header">
        <component :is="headerTag" v-if="header" class="card-heading">
          {{ header }}
        </component>
      </slot>

      <slot name="content" />

      <slot />

      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FdsIkon from './fds-ikon.vue'

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
  /** Link for navigation card */
  href = null,
  /** Icon for navigation card (e.g., 'arrow-forward', 'open-in-new') */
  icon = null,
  /** Card variant */
  variant = null,
} = defineProps<{
  header?: string | null
  headerTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  subheader?: string | null
  href?: string | null
  icon?: string | null
  variant?: 'long' | null
}>()
</script>
