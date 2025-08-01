<template>
  <xfds-form-group
    v-bind="{
      label,
      hint,
      tooltip,
      isValid,
      errorMessage,
    }"
  >
    <xfds-dropdown
      v-bind="attrs"
      v-model="value"
      :options="options"
      @update:model-value="handleInput"
      @dirty="touchedEvent"
    />
  </xfds-form-group>
</template>

<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue';
import { FdsOptionItem } from 'dkfds-vue3-utils';

const attrs = useAttrs();

const {
  id = null, // eslint-disable-line no-unused-vars
  label = '',
  hint = '',
  tooltip = null,
  isValid = true,
  errorMessage = null,
  modelValue = '',
  options = [],
} = defineProps<{
  id?: string | null;
  label?: string;
  hint?: string;
  tooltip?: string | null;
  isValid?: boolean;
  errorMessage?: string | null;
  modelValue?: string;
  options?: FdsOptionItem[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  dirty: [value: boolean];
  valid: [value: boolean];
  input: [value: string];
}>();

const value = ref(modelValue);
const dirty = ref(false);

const touchedEvent = () => {
  dirty.value = true;
  emit('dirty', true);
};

const handleInput = () => emit('update:modelValue', value.value);

watch(
  () => [modelValue],
  () => {
    value.value = modelValue;
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lang="scss"></style>
