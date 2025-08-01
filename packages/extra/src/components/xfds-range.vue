<template>
  <input
    :id="formid"
    v-model="value"
    class="form-range d-flex"
    :max="max"
    :min="min"
    :step="step"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="value"
    :name="formid"
    type="range"
    :style="{ backgroundSize: percent }"
    @input="handleInput"
    @blur="$emit('dirty', true)"
  />
</template>

<script setup lang="ts">
/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
 *
 * */
import { ref, watch, computed } from 'vue';
import { formId } from 'dkfds-vue3-utils';
const {
  id = null,
  modelValue = 0,
  min = 0,
  max = 100,
  step = 1,
} = defineProps<{
  id?: string | null;
  modelValue?: number | string;
  min?: number;
  max?: number;
  step?: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: number];
  dirty: [isDirty: boolean];
  input: [event: Event];
}>();
const { formid } = formId(id, true);
const value = ref(Number.isNaN(modelValue) ? 0 : Number(modelValue));
const percent = computed(
  () => `${((value.value - min) * 100) / (max - min)}% 100%`,
);
const handleInput = () => emit('update:modelValue', value.value);
watch(
  () => [modelValue],
  () => {
    value.value = Number.isNaN(modelValue) ? 0 : Number(modelValue);
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lang="scss"></style>
