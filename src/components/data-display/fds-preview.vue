<template>
  <div class="component-preview component-preview-details mb-4" :aria-label="header">
    <div class="component-link">
      {{ header }}

      <a v-if="href" :href="href" target="designsystem">
        {{ linkText }}
      </a>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
export interface FdsPreviewProps {
  header?: string
  href?: string
  linkText?: string
}

const {
  header,
  href,
  linkText = 'Design System',
} = defineProps<FdsPreviewProps>()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
