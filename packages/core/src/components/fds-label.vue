<template>
  <label
    class="form-label"
    :for="formid">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { formId } from 'dkfds-vue3-utils';


const {
  forId = null,
} = defineProps<{
  forId?: string | null;
}>();

const { formid } = formId(forId);
</script>

<style scoped lang="scss"></style>
