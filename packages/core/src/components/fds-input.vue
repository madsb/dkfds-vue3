<template>
  <div :class="`${cssClass}`">
    <div
      v-if="prefix"
      class="form-input-prefix"
      aria-hidden="true">
      {{ prefix }}
    </div>
    <input
      v-bind="attrs"
      :id="formid"
      v-model="inputValue"
      type="text"
      class="form-input d-flex"
      :name="formid"
      @blur="$emit('dirty', true)"
    />
    <div
      v-if="suffix"
      class="form-input-suffix"
      aria-hidden="true">
      {{ suffix }}
    </div>
    <slot name="button" />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue';
import { formId } from 'dkfds-vue3-utils';

const attrs = useAttrs();

const {
  id = null,
  modelValue = '',
  suffix = null,
  prefix = null,
} = defineProps<{
  id?: string | null;
  modelValue?: string;
  suffix?: string | null;
  prefix?: string | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  dirty: [isDirty: boolean];
  input: [event: Event];
}>();
const slots = useSlots();

const { formid } = formId(id, true);

const cssClass = computed((): string => {
  if (suffix) {
    return 'form-input-wrapper form-input-wrapper--suffix';
  }
  if (prefix) {
    return 'form-input-wrapper form-input-wrapper--prefix';
  }
  if (slots.button) {
    return 'search';
  }
  return 'flex-items-center';
});

const inputValue = computed({
  get() {
    return modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>

<style scoped lang="scss"></style>
