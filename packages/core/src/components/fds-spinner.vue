<template>
  <div
    class="spinner"
    v-bind="attrs"></div>
  <div
    v-if="$slots.default"
    class="spinner-status"
    role="status">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
const {
  variant = null,
} = defineProps<{
  variant?: string | null;
}>();
</script>

<style scoped lang="scss"></style>
