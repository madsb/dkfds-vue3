<template>
  <div
    class="component-preview component-preview-details mb-4"
    :aria-label="header">
    <div class="component-link">
      {{ header }}

      <a
        v-if="href"
        :href="href"
        target="designsystem">
        {{ linkText }}
      </a>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">


const {
  header = null,
  href = null,
  linkText = 'Design System',
} = defineProps<{
  header?: string | null;
  href?: string | null;
  linkText?: string;
}>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
