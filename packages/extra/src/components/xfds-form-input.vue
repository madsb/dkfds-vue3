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
    <fds-input
      v-model="value"
      type="text"
      v-bind="{
        attrs,
        suffix,
        prefix,
        readonly,
      }"
      @update:model-value="handleInput"
      @dirty="touchedEvent"
    >
      <template
        v-if="$slots.button"
        #button>
        <slot name="button" />
      </template>
    </fds-input>
  </xfds-form-group>
</template>

<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue';
import { FdsInput } from 'dkfds-vue3-core';
const attrs = useAttrs();

const {
  id = null,
  label = '',
  hint = '',
  tooltip = null,
  isValid = true,
  readonly = false,
  errorMessage = null,
  modelValue = '',
  suffix = null,
  prefix = null,
} = defineProps<{
  id?: string | null;
  label?: string;
  hint?: string;
  tooltip?: string | null;
  isValid?: boolean;
  readonly?: boolean;
  errorMessage?: string | null;
  modelValue?: string;
  suffix?: string | null;
  prefix?: string | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  dirty: [isDirty: boolean];
  valid: [isValid: boolean];
  input: [event: Event];
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
