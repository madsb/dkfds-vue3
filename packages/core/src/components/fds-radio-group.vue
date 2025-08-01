<template>
  <fieldset>
    <legend class="form-label">
      <slot name="label">
        {{ label }}
      </slot>
    </legend>
    <ul
      :id="formid"
      class="nobullet-list">
      <slot />
    </ul>
  </fieldset>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue';
import { formId } from 'dkfds-vue3-utils';

const {
  modelValue = null,
  id = null,
  label,
} = defineProps<{
  modelValue?: string | null;
  id?: string | null;
  label: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  dirty: [isDirty: boolean];
}>();

const { formid } = formId(id);

const value = computed(() => modelValue);

const exposeEmit = (newValue: string) => {
  emit('update:modelValue', newValue);
};

provide('provideGroupEmit', exposeEmit);
provide('provideGroupValue', value);
</script>

<style scoped lang="scss"></style>
